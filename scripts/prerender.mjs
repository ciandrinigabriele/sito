import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const dist = path.join(root, 'dist')
const content = JSON.parse(fs.readFileSync(path.join(root, 'src', 'data', 'wordpress-content.json'), 'utf8'))
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const origin = 'https://gabrieleciandrini.com'

const escapeHtml = (value = '') => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')

const descriptionFor = (item) => item.excerpt
  || `${item.title}. Percorsi, strumenti e idee di Gabriele Ciandrini per il cambiamento professionale.`

const render = ({ route, title, description, type = 'website', date = null }) => {
  const canonical = `${origin}${route}`
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/i, `<meta name="description" content="${escapeHtml(description)}" />`)
    .replace(/<meta property="og:type" content="[^"]*"\s*\/?>/i, `<meta property="og:type" content="${type}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${escapeHtml(description)}" />`)
    .replace('</head>', `    <meta property="og:url" content="${canonical}" />\n    <link rel="canonical" href="${canonical}" />\n${date ? `    <meta property="article:published_time" content="${date}" />\n` : ''}  </head>`)
  const target = route === '/' ? dist : path.join(dist, ...route.split('/').filter(Boolean))
  fs.mkdirSync(target, { recursive: true })
  fs.writeFileSync(path.join(target, 'index.html'), html)
}

render({
  route: '/',
  title: 'Gabriele Ciandrini | Coach per il cambiamento professionale',
  description: 'Gabriele Ciandrini, coach per il cambiamento professionale ad Ancona e online. Fai chiarezza, scegli la tua direzione e costruisci un piano concreto.',
})

render({
  route: '/articoli/',
  title: 'Articoli sul cambiamento professionale | Gabriele Ciandrini',
  description: 'Idee e strumenti concreti per cambiare lavoro, superare i blocchi e costruire una direzione professionale più coerente.',
})

render({
  route: '/libro-respira-immagina-agisci/',
  title: 'Respira. Immagina. Agisci. | Il libro di Gabriele Ciandrini',
  description: 'Scopri Respira. Immagina. Agisci., il libro di Gabriele Ciandrini: una storia vera di difficoltà, rinascita e trasformazione diventata un metodo concreto.',
  type: 'book',
})

render({
  route: '/about-2/',
  title: 'Chi sono | Gabriele Ciandrini, coach per il cambiamento professionale',
  description: 'Dall’impresa di famiglia alla fabbrica, dagli autobus al personal training e al coaching: la storia vera con cui Gabriele Ciandrini aiuta a cambiare lavoro con metodo.',
  type: 'profile',
})

for (const item of content) {
  if (item.path === '/' || item.path === '/articoli/' || item.path === '/libro-respira-immagina-agisci/' || item.path === '/about-2/') continue
  render({
    route: item.path,
    title: `${item.title} | Gabriele Ciandrini`,
    description: descriptionFor(item),
    type: item.type === 'post' ? 'article' : 'website',
    date: item.date,
  })
}

const routes = ['/', '/articoli/', '/libro-respira-immagina-agisci/', ...content.map((item) => item.path)]
const uniqueRoutes = [...new Set(routes)]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${uniqueRoutes.map((route) => `  <url><loc>${origin}${route}</loc></url>`).join('\n')}\n</urlset>\n`
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap)
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`)
fs.writeFileSync(path.join(dist, '404.html'), template.replace(/<title>[\s\S]*?<\/title>/i, '<title>Pagina non trovata | Gabriele Ciandrini</title>'))

console.log(`Prerendered ${uniqueRoutes.length} public routes.`)
