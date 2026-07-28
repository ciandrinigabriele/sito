import handler from '../api/meta/publish.js'

process.env.META_PUBLISH_SECRET = 'local-verification-secret'

const invoke = async ({ method = 'POST', authorization, body }) => {
  const result = { statusCode: null, headers: {}, payload: null }
  const request = {
    method,
    headers: { authorization },
    body,
  }
  const response = {
    status(code) {
      result.statusCode = code
      return this
    },
    setHeader(name, value) {
      result.headers[name] = value
    },
    end(value) {
      result.payload = value ? JSON.parse(value) : null
    },
  }
  await handler(request, response)
  return result
}

const unauthorized = await invoke({
  authorization: 'Bearer wrong-secret',
  body: {},
})
if (unauthorized.statusCode !== 401) throw new Error('La protezione del publisher Meta non rifiuta credenziali errate')

const dryRun = await invoke({
  authorization: 'Bearer local-verification-secret',
  body: {
    articleUrl: 'https://gabrieleciandrini.com/articoli/',
    imageUrl: 'https://gabrieleciandrini.com/media/career-bridge-og.png',
    message: 'Controllo locale del flusso sicuro di pubblicazione Meta.',
    platforms: ['facebook', 'instagram'],
    dryRun: true,
  },
})
if (dryRun.statusCode !== 200 || dryRun.payload?.dryRun !== true) {
  throw new Error(`Dry run Meta non valido: ${JSON.stringify(dryRun.payload)}`)
}

const foreignUrl = await invoke({
  authorization: 'Bearer local-verification-secret',
  body: {
    articleUrl: 'https://example.com/articolo/',
    imageUrl: 'https://example.com/image.jpg',
    message: 'Questo URL esterno deve essere rifiutato dal publisher.',
    platforms: ['facebook'],
    dryRun: true,
  },
})
if (foreignUrl.statusCode !== 400) throw new Error('Il publisher accetta URL di articoli esterni al sito')

process.env.META_GRAPH_API_VERSION = 'v24.0'
process.env.META_PAGE_ID = '182800505570849'
process.env.META_PAGE_ACCESS_TOKEN = 'server-only-test-token'
const originalFetch = globalThis.fetch
globalThis.fetch = async (url, options) => {
  if (options?.method !== 'GET') throw new Error('La verifica account deve essere non distruttiva')
  const parsed = new URL(url)
  if (parsed.searchParams.get('access_token') !== 'server-only-test-token') {
    throw new Error('Token Meta assente dalla richiesta di verifica')
  }
  return {
    ok: true,
    status: 200,
    async json() {
      return {
        id: '182800505570849',
        name: 'Life coach Gabriele Ciandrini',
        instagram_business_account: {
          id: '17841400000000000',
          username: 'gabriele_ciandrini_coach',
        },
      }
    },
  }
}

const verifiedAccounts = await invoke({
  authorization: 'Bearer local-verification-secret',
  body: { action: 'verify' },
})
globalThis.fetch = originalFetch
if (
  verifiedAccounts.statusCode !== 200
  || verifiedAccounts.payload?.accounts?.facebook?.id !== '182800505570849'
  || verifiedAccounts.payload?.accounts?.instagram?.username !== 'gabriele_ciandrini_coach'
) {
  throw new Error(`Verifica account Meta non valida: ${JSON.stringify(verifiedAccounts.payload)}`)
}

console.log('Meta publisher verification passed: auth, dry run, domain validation and account discovery.')
