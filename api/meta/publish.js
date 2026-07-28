const json = (response, status, payload) => {
  response.status(status)
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.setHeader('Cache-Control', 'no-store')
  response.end(JSON.stringify(payload))
}

const requireEnv = (names) => {
  const missing = names.filter((name) => !process.env[name])
  if (missing.length) throw new Error(`Configurazione server incompleta: ${missing.join(', ')}`)
}

const graphRequest = async (path, fields = {}, method = 'POST') => {
  const version = process.env.META_GRAPH_API_VERSION
  const endpoint = new URL(`https://graph.facebook.com/${version}/${path}`)
  const parameters = new URLSearchParams(fields)
  if (method === 'GET') endpoint.search = parameters
  const response = await fetch(endpoint, {
    method,
    ...(method === 'POST'
      ? {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: parameters,
        }
      : {}),
  })
  const payload = await response.json()
  if (!response.ok || payload.error) {
    const message = payload?.error?.message || `Meta Graph API: HTTP ${response.status}`
    const error = new Error(message)
    error.code = payload?.error?.code
    error.type = payload?.error?.type
    throw error
  }
  return payload
}

const getConnectedAccounts = async () => {
  requireEnv(['META_GRAPH_API_VERSION', 'META_PAGE_ID', 'META_PAGE_ACCESS_TOKEN'])
  const page = await graphRequest(process.env.META_PAGE_ID, {
    fields: 'id,name,instagram_business_account{id,username}',
    access_token: process.env.META_PAGE_ACCESS_TOKEN,
  }, 'GET')
  const instagram = page.instagram_business_account || null
  return {
    facebook: { id: page.id, name: page.name },
    instagram: instagram ? { id: instagram.id, username: instagram.username || null } : null,
  }
}

const normalizePlatforms = (value) => {
  const requested = Array.isArray(value) && value.length ? value : ['facebook', 'instagram']
  const platforms = [...new Set(requested.map((item) => String(item).toLowerCase()))]
  const invalid = platforms.filter((item) => !['facebook', 'instagram'].includes(item))
  if (invalid.length) throw new Error(`Piattaforme non valide: ${invalid.join(', ')}`)
  return platforms
}

const validatePublicUrl = (value, field, { sameSite = false } = {}) => {
  const parsed = new URL(value)
  if (parsed.protocol !== 'https:') throw new Error(`${field} deve usare HTTPS`)
  if (sameSite && !['gabrieleciandrini.com', 'www.gabrieleciandrini.com'].includes(parsed.hostname)) {
    throw new Error(`${field} deve appartenere a gabrieleciandrini.com`)
  }
  return parsed.toString()
}

const decodeHtml = (value = '') => value
  .replace(/&amp;/gi, '&')
  .replace(/&quot;/gi, '"')
  .replace(/&#39;|&apos;/gi, "'")
  .replace(/&lt;/gi, '<')
  .replace(/&gt;/gi, '>')
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
  .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
  .replace(/\s+/g, ' ')
  .trim()

const getTagAttribute = (tag, name) => {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i'))
  return match ? decodeHtml(match[1] ?? match[2] ?? '') : ''
}

const getArticleMetadata = async (articleUrl) => {
  const response = await fetch(articleUrl, {
    method: 'GET',
    headers: { 'User-Agent': 'GabrieleCiandriniMetaPublisher/1.0' },
    redirect: 'follow',
  })
  if (!response.ok) throw new Error(`Articolo non raggiungibile: HTTP ${response.status}`)

  const finalUrl = validatePublicUrl(response.url || articleUrl, 'articleUrl finale', { sameSite: true })
  const html = await response.text()
  if (html.length > 2_000_000) throw new Error('La pagina dell’articolo è troppo grande')

  const meta = {}
  for (const tag of html.match(/<meta\b[^>]*>/gi) || []) {
    const key = (getTagAttribute(tag, 'property') || getTagAttribute(tag, 'name')).toLowerCase()
    const content = getTagAttribute(tag, 'content')
    if (key && content && !meta[key]) meta[key] = content
  }
  const titleTag = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)
  const title = meta['og:title'] || decodeHtml(titleTag?.[1] || '')
  const description = meta['og:description'] || meta.description || ''
  const imageValue = meta['og:image'] || meta['twitter:image'] || ''
  const imageUrl = imageValue
    ? validatePublicUrl(new URL(imageValue, finalUrl).toString(), 'imageUrl')
    : null
  if (!title) throw new Error('Titolo dell’articolo non trovato')

  const suggestedMessage = (description || title).slice(0, 1800).trim()
  return { articleUrl: finalUrl, title, description, imageUrl, suggestedMessage }
}

export default async function handler(request, response) {
  if (request.method === 'GET') {
    return json(response, 200, {
      service: 'meta-publisher',
      configured: Boolean(
        process.env.META_GRAPH_API_VERSION
        && process.env.META_PAGE_ID
        && process.env.META_PAGE_ACCESS_TOKEN
        && process.env.META_PUBLISH_SECRET
      ),
      facebookConfigured: Boolean(process.env.META_PAGE_ID && process.env.META_PAGE_ACCESS_TOKEN),
      instagramIdConfigured: Boolean(process.env.META_INSTAGRAM_BUSINESS_ACCOUNT_ID),
    })
  }

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'GET, POST')
    return json(response, 405, { error: 'Metodo non consentito' })
  }

  try {
    requireEnv(['META_PUBLISH_SECRET'])
    const authorization = request.headers.authorization || ''
    if (authorization !== `Bearer ${process.env.META_PUBLISH_SECRET}`) {
      return json(response, 401, { error: 'Autorizzazione non valida' })
    }

    const body = typeof request.body === 'string' ? JSON.parse(request.body) : (request.body || {})
    if (body.action === 'verify') {
      const accounts = await getConnectedAccounts()
      return json(response, 200, { verified: true, accounts })
    }
    if (body.action === 'prepare') {
      const articleUrl = validatePublicUrl(body.articleUrl, 'articleUrl', { sameSite: true })
      const article = await getArticleMetadata(articleUrl)
      const platforms = normalizePlatforms(body.platforms)
      if (platforms.includes('instagram') && !article.imageUrl) {
        throw new Error('L’articolo non contiene un’immagine social utilizzabile per Instagram')
      }
      return json(response, 200, {
        prepared: true,
        article,
        publicationPlan: {
          articleUrl: article.articleUrl,
          imageUrl: article.imageUrl,
          message: article.suggestedMessage,
          platforms,
        },
      })
    }

    const platforms = normalizePlatforms(body.platforms)
    const articleUrl = validatePublicUrl(body.articleUrl, 'articleUrl', { sameSite: true })
    const imageUrl = body.imageUrl ? validatePublicUrl(body.imageUrl, 'imageUrl') : null
    const message = String(body.message || '').trim()

    if (message.length < 20 || message.length > 2000) {
      throw new Error('Il testo deve contenere tra 20 e 2000 caratteri')
    }
    if (platforms.includes('instagram') && !imageUrl) {
      throw new Error('imageUrl è obbligatorio per Instagram')
    }

    const publicationPlan = {
      articleUrl,
      imageUrl,
      message,
      platforms,
    }
    if (body.dryRun === true) {
      return json(response, 200, { dryRun: true, publicationPlan })
    }

    requireEnv(['META_GRAPH_API_VERSION', 'META_PAGE_ACCESS_TOKEN'])
    if (platforms.includes('facebook')) requireEnv(['META_PAGE_ID'])
    let instagramAccountId = process.env.META_INSTAGRAM_BUSINESS_ACCOUNT_ID
    if (platforms.includes('instagram') && !instagramAccountId) {
      const accounts = await getConnectedAccounts()
      instagramAccountId = accounts.instagram?.id
      if (!instagramAccountId) {
        throw new Error('La Pagina Facebook non ha un account Instagram professionale collegato')
      }
    }

    const results = {}
    if (platforms.includes('facebook')) {
      results.facebook = await graphRequest(`${process.env.META_PAGE_ID}/feed`, {
        message,
        link: articleUrl,
        access_token: process.env.META_PAGE_ACCESS_TOKEN,
      })
    }

    if (platforms.includes('instagram')) {
      const container = await graphRequest(`${instagramAccountId}/media`, {
        image_url: imageUrl,
        caption: `${message}\n\n${articleUrl}`,
        access_token: process.env.META_PAGE_ACCESS_TOKEN,
      })
      results.instagram = await graphRequest(`${instagramAccountId}/media_publish`, {
        creation_id: container.id,
        access_token: process.env.META_PAGE_ACCESS_TOKEN,
      })
    }

    return json(response, 200, { published: true, results })
  } catch (error) {
    return json(response, 400, {
      error: error.message,
      metaCode: error.code || null,
      metaType: error.type || null,
    })
  }
}
