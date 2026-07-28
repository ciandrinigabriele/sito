import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const dist = path.join(root, 'dist')
const content = JSON.parse(fs.readFileSync(path.join(root, 'src', 'data', 'wordpress-content.json'), 'utf8'))
const inventory = JSON.parse(fs.readFileSync(path.join(root, 'src', 'data', 'wordpress-inventory.json'), 'utf8'))
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const origin = 'https://gabrieleciandrini.com'
const isProduction = process.env.VERCEL_ENV === 'production'
const defaultImage = `${origin}/media/career-bridge-og.png`

const escapeHtml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')

const normalizeRoute = (value) => {
  const route = value.startsWith('/') ? value : `/${value}`
  return route === '/' ? route : `${route.replace(/\/+$/, '')}/`
}

const descriptionFor = (item) => item.excerpt
  || `${item.title}. Percorsi, strumenti e idee di Gabriele Ciandrini per il cambiamento professionale.`

const nav = `
  <header>
    <a href="${origin}/">Gabriele Ciandrini</a>
    <nav aria-label="Navigazione principale">
      <a href="${origin}/metodo-respira-immagina-agisci/">Metodo</a>
      <a href="${origin}/libro-respira-immagina-agisci/">Il libro</a>
      <a href="${origin}/about-2/">Chi sono</a>
      <a href="${origin}/articoli/">Articoli</a>
      <a href="https://wa.me/393497759350">Incontro conoscitivo gratuito</a>
    </nav>
  </header>`

const footer = `
  <footer>
    <p>Gabriele Ciandrini, coach per il cambiamento professionale ad Ancona e online in tutta Italia.</p>
    <a href="${origin}/contatti/">Contatti</a>
    <a href="https://www.facebook.com/coachgabrieleciandrini">Facebook</a>
  </footer>`

const homeBody = `
  ${nav}
  <main>
    <p>Coaching per il cambiamento professionale</p>
    <h1>Il lavoro giusto non si trova a caso. Si costruisce con metodo.</h1>
    <p>Ti aiuto a capire quale direzione professionale ha davvero senso per te e a trasformarla in un piano concreto, sostenibile e coerente con i tuoi valori.</p>
    <section>
      <h2>Un percorso unico: dalla confusione a una direzione che puoi costruire</h2>
      <p>Un percorso individuale per cambiare lavoro, crescere come dipendente o preparare un progetto indipendente. Ad Ancona e online in tutta Italia.</p>
      <ol>
        <li><strong>Fermati e fai chiarezza.</strong> Mettiamo a fuoco cosa ti pesa e cosa vuoi proteggere.</li>
        <li><strong>Costruisci la direzione.</strong> Trasformiamo valori e capacità in possibilità concrete.</li>
        <li><strong>Prepara il passaggio.</strong> Definiamo priorità, risorse, tempi e azioni.</li>
      </ol>
    </section>
    <section>
      <h2>Respira. Immagina. Agisci.</h2>
      <p>Prima ritrovi lucidità. Poi costruisci una visione. Infine la trasformi in azione concreta.</p>
      <a href="${origin}/metodo-respira-immagina-agisci/">Scopri il metodo completo</a>
    </section>
    <section>
      <h2>Non insegno il cambiamento. L’ho attraversato.</h2>
      <p>Impresa di famiglia, fabbrica, autobus, personal training, studio privato, coaching: ho cambiato lavoro più volte senza affidare il futuro al caso.</p>
      <a href="${origin}/about-2/">Leggi la storia delle mie svolte</a>
    </section>
    <section>
      <h2>Partiamo da una domanda concreta</h2>
      <p>Qual è la strada professionale più giusta per te?</p>
      <a href="https://wa.me/393497759350">Prenota un incontro conoscitivo gratuito</a>
    </section>
  </main>
  ${footer}`

const bookBody = `
  ${nav}
  <main>
    <p>Il libro di Gabriele Ciandrini</p>
    <h1>Respira. Immagina. Agisci.</h1>
    <p>Una storia vera di difficoltà, rinascita e trasformazione. La radice concreta del metodo che oggi applico al cambiamento professionale.</p>
    <img src="/media/book-cover.jpg" width="640" height="1024" alt="Copertina del libro Respira Immagina Agisci di Gabriele Ciandrini">
    <h2>Non un libro motivazionale. Una storia trasformata in metodo.</h2>
    <p>Il libro racconta le tre azioni che hanno permesso a Gabriele di trasformare difficoltà e cambiamenti in opportunità concrete.</p>
    <h2>Le tre azioni</h2>
    <ol><li>Respira: torna lucido.</li><li>Immagina: definisci una direzione.</li><li>Agisci: costruisci un piano sostenibile.</li></ol>
    <a href="https://amzn.eu/d/0ec3bLMb">Acquista Respira. Immagina. Agisci. su Amazon</a>
  </main>
  ${footer}`

const aboutBody = `
  ${nav}
  <main>
    <p>La storia professionale di Gabriele Ciandrini</p>
    <h1>Ho cambiato lavoro più volte. Mai con un salto nel vuoto.</h1>
    <p>Dall’impresa di famiglia alla fabbrica, dagli autobus al personal training e al coaching: ogni passaggio ha protetto qualcosa di importante e preparato quello successivo.</p>
    <h2>Le svolte</h2>
    <ol>
      <li>2000: chiudo l’impresa di famiglia e torno a scegliere.</li>
      <li>2001: entro in fabbrica e uso la stabilità per preparare il futuro.</li>
      <li>2003: lascio la fabbrica e inizio dal basso in palestra.</li>
      <li>2004–2008: lavoro come autista, studio e seguo clienti fino a diventare autonomo.</li>
      <li>2011: apro Personal Training Lab ad Ancona.</li>
      <li>2015: integro coaching e PNL nel mio metodo.</li>
    </ol>
    <h2>Non devi lasciare tutto domani</h2>
    <p>Devi smettere di lasciare al caso il tuo domani. Un lavoro ponte, una competenza nuova e un piano possono creare lo spazio per scegliere.</p>
    <a href="https://wa.me/393497759350">Raccontami dove sei nella tua storia</a>
  </main>
  ${footer}`

const articlesBody = `
  ${nav}
  <main>
    <h1>Articoli sul cambiamento professionale</h1>
    <p>Idee e strumenti concreti per cambiare lavoro, superare i blocchi e costruire una direzione professionale più coerente.</p>
    <ol>
      ${content
        .filter((item) => item.type === 'post')
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((item) => `<li><a href="${origin}${item.path}">${escapeHtml(item.title)}</a>${item.excerpt ? ` — ${escapeHtml(item.excerpt)}` : ''}</li>`)
        .join('\n')}
    </ol>
  </main>
  ${footer}`

const contentBody = (item) => `
  ${nav}
  <main>
    <article>
      <header>
        <p>${item.type === 'post' ? 'Idee per il cambiamento professionale' : 'Percorsi e strumenti'}</p>
        <h1>${escapeHtml(item.title)}</h1>
        ${item.date ? `<time datetime="${escapeHtml(item.date)}">${escapeHtml(item.date)}</time>` : ''}
      </header>
      ${item.html}
    </article>
    <aside>
      <h2>Facciamo chiarezza insieme</h2>
      <a href="https://wa.me/393497759350">Prenota un incontro conoscitivo gratuito</a>
    </aside>
  </main>
  ${footer}`

const schemaFor = ({ route, title, description, type, date, image = defaultImage }) => {
  const url = `${origin}${route}`
  const base = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'WebPage',
    name: title,
    headline: title,
    description,
    url,
    inLanguage: 'it-IT',
    image,
    isPartOf: { '@type': 'WebSite', name: 'Gabriele Ciandrini', url: origin },
    author: { '@type': 'Person', name: 'Gabriele Ciandrini', url: `${origin}/about-2/` },
    publisher: { '@type': 'Person', name: 'Gabriele Ciandrini', url: origin },
  }
  if (type === 'article' && date) base.datePublished = date
  return base
}

const replaceOrInsertMeta = (html, selector, tag) => {
  if (selector.test(html)) return html.replace(selector, tag)
  return html.replace('</head>', `    ${tag}\n  </head>`)
}

const render = ({ route, title, description, body, type = 'website', date = null, extraSchema = null }) => {
  const normalizedRoute = normalizeRoute(route)
  const canonical = `${origin}${normalizedRoute}`
  const schemas = [schemaFor({ route: normalizedRoute, title, description, type, date })]
  if (extraSchema) schemas.push(extraSchema)

  let html = template
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/i, `<meta name="description" content="${escapeHtml(description)}" />`)
    .replace(/<meta property="og:type" content="[^"]*"\s*\/?>/i, `<meta property="og:type" content="${type}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${escapeHtml(description)}" />`)
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/i, '')
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)

  html = replaceOrInsertMeta(html, /<meta property="og:url" content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${canonical}" />`)
  html = replaceOrInsertMeta(html, /<meta name="twitter:title" content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${escapeHtml(title)}" />`)
  html = replaceOrInsertMeta(html, /<meta name="twitter:description" content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${escapeHtml(description)}" />`)
  html = replaceOrInsertMeta(html, /<link rel="canonical" href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonical}" />`)
  html = replaceOrInsertMeta(
    html,
    /<meta name="robots" content="[^"]*"\s*\/?>/i,
    isProduction
      ? '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />'
      : '<meta name="robots" content="noindex, nofollow" />',
  )
  if (date) {
    html = replaceOrInsertMeta(html, /<meta property="article:published_time" content="[^"]*"\s*\/?>/i, `<meta property="article:published_time" content="${escapeHtml(date)}" />`)
  }
  html = html.replace('</head>', `${schemas.map((schema) => `    <script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`).join('\n')}\n  </head>`)

  const target = normalizedRoute === '/' ? dist : path.join(dist, ...normalizedRoute.split('/').filter(Boolean))
  fs.mkdirSync(target, { recursive: true })
  fs.writeFileSync(path.join(target, 'index.html'), html)
}

render({
  route: '/',
  title: 'Gabriele Ciandrini | Coach per il cambiamento professionale',
  description: 'Gabriele Ciandrini, coach per il cambiamento professionale ad Ancona e online. Fai chiarezza, scegli la tua direzione e costruisci un piano concreto.',
  body: homeBody,
  extraSchema: {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Gabriele Ciandrini',
    description: 'Coach per il cambiamento professionale ad Ancona e online',
    url: `${origin}/`,
    telephone: '+393497759350',
    areaServed: ['Ancona', 'Italia'],
    sameAs: ['https://www.facebook.com/coachgabrieleciandrini'],
  },
})

render({
  route: '/articoli/',
  title: 'Articoli sul cambiamento professionale | Gabriele Ciandrini',
  description: 'Idee e strumenti concreti per cambiare lavoro, superare i blocchi e costruire una direzione professionale più coerente.',
  body: articlesBody,
})

render({
  route: '/libro-respira-immagina-agisci/',
  title: 'Respira. Immagina. Agisci. | Il libro di Gabriele Ciandrini',
  description: 'Scopri Respira. Immagina. Agisci., il libro di Gabriele Ciandrini: una storia vera di difficoltà, rinascita e trasformazione diventata un metodo concreto.',
  body: bookBody,
  type: 'book',
  extraSchema: {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: 'Respira. Immagina. Agisci.',
    author: { '@type': 'Person', name: 'Gabriele Ciandrini' },
    inLanguage: 'it',
    url: `${origin}/libro-respira-immagina-agisci/`,
    image: `${origin}/media/book-cover.jpg`,
    offers: { '@type': 'Offer', url: 'https://amzn.eu/d/0ec3bLMb', availability: 'https://schema.org/InStock' },
  },
})

render({
  route: '/about-2/',
  title: 'Chi sono | Gabriele Ciandrini, coach per il cambiamento professionale',
  description: 'Dall’impresa di famiglia alla fabbrica, dagli autobus al personal training e al coaching: la storia vera con cui Gabriele Ciandrini aiuta a cambiare lavoro con metodo.',
  body: aboutBody,
  type: 'profile',
  extraSchema: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Gabriele Ciandrini',
    url: `${origin}/about-2/`,
    jobTitle: 'Coach per il cambiamento professionale',
    sameAs: ['https://www.facebook.com/coachgabrieleciandrini'],
  },
})

for (const item of content) {
  if (['/', '/articoli/', '/libro-respira-immagina-agisci/', '/about-2/'].includes(item.path)) continue
  render({
    route: item.path,
    title: `${item.title} | Gabriele Ciandrini`,
    description: descriptionFor(item),
    body: contentBody(item),
    type: item.type === 'post' ? 'article' : 'website',
    date: item.date,
  })
}

const routes = ['/', '/articoli/', '/libro-respira-immagina-agisci/', '/about-2/', ...content.map((item) => item.path)]
const uniqueRoutes = [...new Set(routes.map(normalizeRoute))]
const itemByPath = new Map(content.map((item) => [normalizeRoute(item.path), item]))
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${uniqueRoutes.map((route) => {
  const item = itemByPath.get(route)
  const lastmod = item?.date ? `<lastmod>${item.date.slice(0, 10)}</lastmod>` : ''
  return `  <url><loc>${origin}${route}</loc>${lastmod}</url>`
}).join('\n')}\n</urlset>\n`
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap)
fs.writeFileSync(
  path.join(dist, 'robots.txt'),
  isProduction
    ? `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n',
)
let notFoundHtml = template
  .replace(/<title>[\s\S]*?<\/title>/i, '<title>Pagina non trovata | Gabriele Ciandrini</title>')
  .replace('<div id="root"></div>', '<div id="root"><main><h1>Pagina non trovata</h1><p>La pagina richiesta non è disponibile.</p><a href="/">Torna alla home</a></main></div>')
notFoundHtml = replaceOrInsertMeta(
  notFoundHtml,
  /<meta name="robots" content="[^"]*"\s*\/?>/i,
  '<meta name="robots" content="noindex, follow" />',
)
fs.writeFileSync(path.join(dist, '404.html'), notFoundHtml)

const inventoryRoutes = new Set(inventory.routes.map((item) => normalizeRoute(item.route)))
const missingRoutes = [...inventoryRoutes].filter((route) => !uniqueRoutes.includes(route))
if (missingRoutes.length) {
  throw new Error(`URL WordPress mancanti dal build: ${missingRoutes.join(', ')}`)
}

console.log(`Prerendered ${uniqueRoutes.length} public routes with static body content (${isProduction ? 'indexable production' : 'noindex preview'}).`)
