import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const dist = path.join(root, 'dist')
const inventory = JSON.parse(fs.readFileSync(path.join(root, 'src', 'data', 'wordpress-inventory.json'), 'utf8'))
const content = JSON.parse(fs.readFileSync(path.join(root, 'src', 'data', 'wordpress-content.json'), 'utf8'))
const vercelConfig = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'))
const expectedRoutes = new Set(['/', '/articoli/', '/libro-respira-immagina-agisci/', '/about-2/', ...inventory.routes.map((item) => item.route)])
const failures = []
const isProduction = process.env.VERCEL_ENV === 'production'

const normalizeRoute = (value) => value === '/' ? '/' : `${value.replace(/\/+$/, '')}/`
const fileFor = (route) => route === '/'
  ? path.join(dist, 'index.html')
  : path.join(dist, ...route.split('/').filter(Boolean), 'index.html')

for (const rawRoute of expectedRoutes) {
  const route = normalizeRoute(rawRoute)
  const file = fileFor(route)
  if (!fs.existsSync(file)) {
    failures.push(`${route}: file HTML mancante`)
    continue
  }
  const html = fs.readFileSync(file, 'utf8')
  const checks = [
    [/<title>[^<]{10,}<\/title>/i, 'title'],
    [/<meta name="description" content="[^"]{40,}"/i, 'description'],
    [new RegExp(`<link rel="canonical" href="https://gabrieleciandrini\\.com${route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`), 'canonical'],
    [/<meta property="og:title" content="[^"]+"/i, 'Open Graph title'],
    [/<meta property="og:description" content="[^"]+"/i, 'Open Graph description'],
    [/<script type="application\/ld\+json">[^<]+<\/script>/i, 'JSON-LD'],
    [/<div id="root">\s*[\s\S]*?<h1>[\s\S]*?<\/h1>[\s\S]*?<\/div>/i, 'corpo HTML statico'],
    [/<h1>[\s\S]*?<\/h1>/i, 'H1 statico'],
    [isProduction ? /<meta name="robots" content="index, follow,/i : /<meta name="robots" content="noindex, nofollow"/i, 'direttiva robots coerente con l’ambiente'],
  ]
  for (const [pattern, label] of checks) {
    if (!pattern.test(html)) failures.push(`${route}: ${label} mancante o non valido`)
  }
}

const sitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8')
for (const rawRoute of expectedRoutes) {
  const route = normalizeRoute(rawRoute)
  if (!sitemap.includes(`<loc>https://gabrieleciandrini.com${route}</loc>`)) {
    failures.push(`${route}: assente dalla sitemap`)
  }
}

if (!fs.existsSync(path.join(dist, 'robots.txt'))) failures.push('robots.txt mancante')
if (!fs.existsSync(path.join(dist, '404.html'))) failures.push('404.html mancante')

const normalizeRedirectPath = (value) => {
  try {
    return decodeURIComponent(value).toLowerCase()
  } catch {
    return value.toLowerCase()
  }
}
const redirectSources = new Set(vercelConfig.redirects.map((item) => normalizeRedirectPath(item.source)))
for (const item of content) {
  for (const match of item.html.matchAll(/data-permalink="([^"]+)"/g)) {
    const legacyPath = normalizeRedirectPath(match[1])
    if (legacyPath !== normalizeRedirectPath(item.path) && !redirectSources.has(legacyPath)) {
      failures.push(`${match[1]}: redirect allegato WordPress mancante`)
    }
  }
}
for (const requiredPattern of ['/tag/:path*/', '/category/:path*/', '/author/:path*/', '/feed/']) {
  if (!redirectSources.has(normalizeRedirectPath(requiredPattern))) {
    failures.push(`${requiredPattern}: redirect archivio WordPress mancante`)
  }
}

if (failures.length) {
  console.error(`SEO verification failed (${failures.length}):\n- ${failures.join('\n- ')}`)
  process.exit(1)
}

console.log(`SEO verification passed for ${expectedRoutes.size} routes.`)
