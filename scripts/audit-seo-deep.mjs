import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const dist = path.join(root, 'dist')
const origin = 'https://gabrieleciandrini.com'

const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const absolute = path.join(directory, entry.name)
  return entry.isDirectory() ? walk(absolute) : [absolute]
})

const decode = (value = '') => value
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&#039;|&#39;/g, "'")
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&hellip;/g, '…')
  .replace(/<[^>]+>/g, '')
  .replace(/\s+/g, ' ')
  .trim()

const attribute = (tag, name) => {
  const match = tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, 'i'))
  return match ? decode(match[1]) : ''
}

const normalizeRoute = (value) => {
  const pathname = value.replace(origin, '').split(/[?#]/)[0] || '/'
  return pathname === '/' ? '/' : `${pathname.replace(/\/+$/, '')}/`
}

const routeForFile = (file) => {
  const relative = path.relative(dist, file).replaceAll('\\', '/')
  if (relative === 'index.html') return '/'
  return `/${relative.replace(/\/index\.html$/, '')}/`
}

const files = walk(dist).filter((file) => file.endsWith('index.html'))
const pages = files.map((file) => {
  const html = fs.readFileSync(file, 'utf8')
  const route = routeForFile(file)
  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '')
  const description = decode(html.match(/<meta name="description" content="([^"]*)"/i)?.[1] || '')
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/i)?.[1] || ''
  const robots = html.match(/<meta name="robots" content="([^"]*)"/i)?.[1] || ''
  const ogImage = html.match(/<meta property="og:image" content="([^"]*)"/i)?.[1] || ''
  const h1 = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => decode(match[1]))
  const h2 = [...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)].map((match) => decode(match[1]))
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => ({
    src: attribute(match[0], 'src'),
    alt: attribute(match[0], 'alt'),
  }))
  const internalHrefs = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)]
    .map((match) => match[1])
    .filter((href) => href.startsWith('/') || href.startsWith(origin))
  const assetLinks = internalHrefs.filter((href) => /\.[a-z0-9]{2,5}(?:[?#]|$)/i.test(href))
  const links = internalHrefs
    .filter((href) => !/\.[a-z0-9]{2,5}(?:[?#]|$)/i.test(href))
    .map(normalizeRoute)
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)]
    .map((match) => match[1])

  return { route, title, description, canonical, robots, ogImage, h1, h2, images, links, assetLinks, schemas }
})

const routeSet = new Set(pages.map((page) => page.route))
const titleOwners = new Map()
const descriptionOwners = new Map()
const inbound = new Map(pages.map((page) => [page.route, 0]))
const issues = []

for (const page of pages) {
  if (page.title.length < 30 || page.title.length > 65) {
    issues.push({ severity: 'warning', route: page.route, issue: `title di ${page.title.length} caratteri` })
  }
  if (page.description.length < 100 || page.description.length > 165) {
    issues.push({ severity: 'warning', route: page.route, issue: `description di ${page.description.length} caratteri` })
  }
  if (page.h1.length !== 1) {
    issues.push({ severity: 'error', route: page.route, issue: `${page.h1.length} H1` })
  }
  if (page.h2.length === 0 && !['/'].includes(page.route)) {
    issues.push({ severity: 'warning', route: page.route, issue: 'nessun H2' })
  }
  if (page.canonical !== `${origin}${page.route}`) {
    issues.push({ severity: 'error', route: page.route, issue: `canonical errato: ${page.canonical}` })
  }
  if (!page.robots.includes('index, follow')) {
    issues.push({ severity: 'error', route: page.route, issue: `robots non indicizzabile: ${page.robots}` })
  }
  if (!page.ogImage.startsWith(`${origin}/media/`)) {
    issues.push({ severity: 'warning', route: page.route, issue: 'immagine Open Graph assente o esterna' })
  }
  for (const image of page.images) {
    if (!image.alt) issues.push({ severity: 'warning', route: page.route, issue: `alt mancante: ${image.src}` })
  }
  for (const schema of page.schemas) {
    try {
      JSON.parse(schema)
    } catch {
      issues.push({ severity: 'error', route: page.route, issue: 'JSON-LD non valido' })
    }
  }
  for (const link of new Set(page.links)) {
    if (routeSet.has(link) && link !== page.route) inbound.set(link, (inbound.get(link) || 0) + 1)
    if (!routeSet.has(link) && !link.startsWith('/media/')) {
      issues.push({ severity: 'error', route: page.route, issue: `link interno senza pagina: ${link}` })
    }
  }
  for (const href of new Set(page.assetLinks)) {
    const pathname = href.replace(origin, '').split(/[?#]/)[0]
    if (!fs.existsSync(path.join(dist, ...pathname.split('/').filter(Boolean)))) {
      issues.push({ severity: 'error', route: page.route, issue: `risorsa interna mancante: ${pathname}` })
    }
  }
  titleOwners.set(page.title, [...(titleOwners.get(page.title) || []), page.route])
  descriptionOwners.set(page.description, [...(descriptionOwners.get(page.description) || []), page.route])
}

for (const [title, owners] of titleOwners) {
  if (title && owners.length > 1) issues.push({ severity: 'error', route: owners.join(', '), issue: `title duplicato: ${title}` })
}
for (const [description, owners] of descriptionOwners) {
  if (description && owners.length > 1) issues.push({ severity: 'error', route: owners.join(', '), issue: 'meta description duplicata' })
}
for (const [route, count] of inbound) {
  if (route !== '/' && count === 0) issues.push({ severity: 'warning', route, issue: 'pagina orfana nel corpo HTML statico' })
}

const summary = {
  pages: pages.length,
  errors: issues.filter((item) => item.severity === 'error').length,
  warnings: issues.filter((item) => item.severity === 'warning').length,
  pagesWithImages: pages.filter((page) => page.images.length).length,
  pagesWithUniqueH1: pages.filter((page) => page.h1.length === 1).length,
}

const report = { summary, issues, pages: pages.map((page) => ({
  route: page.route,
  titleLength: page.title.length,
  descriptionLength: page.description.length,
  h1: page.h1,
  h2Count: page.h2.length,
  images: page.images.length,
  inbound: inbound.get(page.route) || 0,
})) }

if (process.argv.includes('--strict')) {
  if (summary.errors) {
    console.error(JSON.stringify({ summary, issues: issues.filter((item) => item.severity === 'error') }, null, 2))
    process.exit(1)
  }
  console.log(`Deep SEO audit passed: ${summary.pages} pages, ${summary.errors} errors, ${summary.warnings} warnings.`)
} else {
  console.log(JSON.stringify(report, null, 2))
}
