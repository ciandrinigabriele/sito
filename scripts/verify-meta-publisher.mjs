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

console.log('Meta publisher verification passed: auth, dry run and domain validation.')
