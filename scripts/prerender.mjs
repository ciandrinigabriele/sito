import fs from 'node:fs'
import path from 'node:path'
import {
  DEFAULT_SOCIAL_IMAGE,
  imageForItem,
  optimizedHtmlFor,
  seoDescriptionFor,
  seoTitleFor,
} from '../src/data/seo-meta.js'

const root = process.cwd()
const dist = path.join(root, 'dist')
const content = JSON.parse(fs.readFileSync(path.join(root, 'src', 'data', 'wordpress-content.json'), 'utf8'))
const inventory = JSON.parse(fs.readFileSync(path.join(root, 'src', 'data', 'wordpress-inventory.json'), 'utf8'))
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const origin = 'https://gabrieleciandrini.com'
const isProduction = process.env.VERCEL_ENV === 'production'
const defaultImage = `${origin}${DEFAULT_SOCIAL_IMAGE}`

const escapeHtml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')

const normalizeRoute = (value) => {
  const route = value.startsWith('/') ? value : `/${value}`
  return route === '/' ? route : `${route.replace(/\/+$/, '')}/`
}

const nav = `
  <header>
    <a href="${origin}/">Gabriele Ciandrini</a>
    <nav aria-label="Navigazione principale">
      <a href="${origin}/metodo-respira-immagina-agisci/">Metodo</a>
      <a href="${origin}/libro-respira-immagina-agisci/">Il libro</a>
      <a href="${origin}/about-2/">Chi sono</a>
      <a href="${origin}/articoli/">Articoli</a>
      <a href="${origin}/ruota-della-vita/">Ruota della Vita</a>
      <a href="https://wa.me/393497759350">Incontro conoscitivo gratuito</a>
    </nav>
  </header>`

const footer = `
  <footer>
    <p>Gabriele Ciandrini, coach per il cambiamento professionale ad Ancona e online in tutta Italia.</p>
    <a href="${origin}/contatti/">Contatti</a>
    <a href="${origin}/ruota-della-vita/">Ruota della Vita</a>
    <a href="${origin}/privacy-policy/">Privacy Policy</a>
    <a href="${origin}/cookie-policy/">Cookie Policy</a>
    <a href="https://www.facebook.com/coachgabrieleciandrini">Facebook</a>
  </footer>`

const homeBody = `
  ${nav}
  <main>
    <p>Coaching per il cambiamento professionale</p>
    <h1>Il lavoro giusto non si trova a caso. Si costruisce con metodo.</h1>
    <p>Ti aiuto a capire quale direzione professionale ha davvero senso per te e a trasformarla in un piano concreto, sostenibile e coerente con i tuoi valori.</p>
    <section>
      <h2>Il blocco non è una colpa: è qualcosa da comprendere</h2>
      <p>Se continui a rimandare, forse non ti manca il coraggio. Potrebbero mancare informazioni, energia, una competenza, una soglia di sicurezza o un primo passo abbastanza piccolo da verificare.</p>
      <a href="${origin}/2026/07/29/il-blocco-non-e-una-colpa-cambiare-lavoro/">Scopri le sette domande che sbloccano la scelta</a>
    </section>
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
      <p>Non è uno slogan e non è un invito a mollare tutto. È un ciclo: crei spazio, dai forma alla direzione e scegli il prossimo passo che puoi verificare.</p>
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
    <section>
      <h2>Uno strumento per osservare la situazione completa</h2>
      <p>La Ruota della Vita aiuta a leggere lavoro, salute, relazioni, tempo e crescita prima di scegliere da dove ripartire.</p>
      <a href="${origin}/ruota-della-vita/">Scopri la Ruota della Vita</a>
      <a href="${origin}/cambia-direzione/">Apri il workbook gratuito sulla direzione professionale</a>
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
    <h2>Il lavoro sulla persona</h2>
    <p>Il mio percorso comprende anche anni di lavoro individuale su movimento, postura e consapevolezza corporea.</p>
    <a href="${origin}/about-2/fitness-coach/">Scopri il percorso Fitness e Postura</a>
    <a href="https://wa.me/393497759350">Raccontami dove sei nella tua storia</a>
  </main>
  ${footer}`

const privacyBody = `
  ${nav}
  <main>
    <article>
      <p>Trasparenza e protezione dei dati</p>
      <h1>Privacy Policy</h1>
      <p>Ultimo aggiornamento: 3 settembre 2026.</p>
      <p>Questa informativa spiega quali dati personali vengono trattati quando visiti gabrieleciandrini.com, invii una richiesta o chiedi di ricevere una risorsa gratuita.</p>
      <h2>Titolare del trattamento</h2>
      <p>Gabriele Ciandrini, P. IVA 02815060423, Corso Amendola 28, 60123 Ancona, Italia. E-mail: ciandrini.gabriele@gmail.com.</p>
      <h2>Dati trattati e finalità</h2>
      <p>Il modulo di contatto raccoglie nome, e-mail e messaggio. Il modulo per le risorse gratuite raccoglie nome, e-mail, risorsa richiesta e dati di provenienza della visita per consegnare il materiale e rispondere alla richiesta. La richiesta non comporta l'iscrizione automatica a una newsletter.</p>
      <h2>Conservazione e fornitori</h2>
      <p>I dati vengono conservati per il tempo necessario a gestire il contatto e, di regola, non oltre 12 mesi. Vercel fornisce l’hosting e Supabase la banca dati dei moduli.</p>
      <h2>Diritti</h2>
      <p>Puoi chiedere accesso, rettifica, cancellazione, limitazione, portabilità o opposizione scrivendo a ciandrini.gabriele@gmail.com. Puoi inoltre proporre reclamo al Garante per la protezione dei dati personali.</p>
    </article>
  </main>
  ${footer}`

const cookieBody = `
  ${nav}
  <main>
    <article>
      <p>Trasparenza e protezione dei dati</p>
      <h1>Cookie Policy</h1>
      <p>Ultimo aggiornamento: 7 settembre 2026.</p>
      <p>Il sito non utilizza cookie pubblicitari, Meta Pixel, Google Analytics o altri strumenti di profilazione.</p>
      <h2>Strumenti tecnici utilizzati</h2>
      <p>Il valore di sessionStorage ria-intro-seen ricorda che l’animazione iniziale è già stata mostrata nella scheda corrente. Il valore di localStorage ria-workbook-state-v1 salva nel dispositivo la bozza del workbook avviata volontariamente, fino all’invio, alla scelta “Ricomincia” o alla cancellazione dei dati del sito. La bozza non viene trasmessa finché l’utente non seleziona il pulsante finale di invio.</p>
      <h2>Perché non compare il banner</h2>
      <p>Poiché il sito utilizza soltanto strumenti tecnici o richiesti direttamente dall’utente, non è richiesto un banner di consenso preventivo. Se verranno introdotti strumenti non necessari, saranno bloccati fino alla scelta dell’utente e verrà aggiunto un pannello per accettare, rifiutare o modificare le preferenze.</p>
      <p>Per maggiori informazioni consulta la <a href="${origin}/privacy-policy/">Privacy Policy</a>.</p>
    </article>
  </main>
  ${footer}`

const landingBody = `
  <header><a href="${origin}/">Gabriele Ciandrini</a><a href="https://wa.me/393497759350">Hai una domanda?</a></header>
  <main>
    <p>Per chi sente che il lavoro non è più quello giusto</p>
    <h1>Non devi mollare tutto. Devi capire dove andare.</h1>
    <p>Scopri come trasformare dubbi, paura e insoddisfazione in una direzione professionale concreta, sostenibile e adatta alla tua vita reale.</p>
    <a href="#video">Guarda il video gratuito</a>
    <section id="video">
      <h2>Non ti serve più coraggio. Ti serve più chiarezza.</h2>
      <p>Il cambiamento professionale non deve essere un salto nel vuoto: può diventare un passaggio costruito con metodo.</p>
      <video controls playsinline preload="metadata" poster="/media/method-gabriele-cinematic.webp"><source src="/media/video-metodo-ria-prova.mp4" type="video/mp4"><track kind="captions" src="/media/video-metodo-ria-prova.it.vtt" srclang="it" label="Italiano" default></video>
    </section>
    <section>
      <h2>Dove sei adesso? La mappa del tuo punto di partenza</h2>
      <p>Compila il workbook online per fotografare lo stato professionale attuale, riconoscere blocchi e convinzioni limitanti e definire la prima verifica concreta.</p>
      <a href="${origin}/workbook-stato-attuale/">Inizia il workbook online</a>
    </section>
    <section>
      <h2>Respira. Immagina. Agisci.</h2>
      <ol><li>Respira: fai chiarezza.</li><li>Immagina: costruisci possibilità coerenti.</li><li>Agisci: verifica il prossimo passo.</li></ol>
    </section>
    <section><h2>Ho cambiato lavoro più volte. Mai con un salto nel vuoto.</h2><p>Gabriele Ciandrini accompagna il cambiamento professionale ad Ancona e online in tutta Italia.</p><a href="${origin}/about-2/">Conosci la mia storia</a></section>
  </main>
  ${footer}`

const thankYouBody = `
  <header><a href="${origin}/">Gabriele Ciandrini</a></header>
  <main>
    <p>La prima azione è compiuta</p>
    <h1>La tua fotografia è pronta.</h1>
    <p>La copia personale delle risposte viene inviata via e-mail dopo la compilazione del workbook online.</p>
    <a href="${origin}/workbook-stato-attuale/">Apri il workbook online</a>
    <section><h2>Vuoi confrontare le tue risposte?</h2><p>Richiedi un primo incontro conoscitivo per partire dalla tua situazione reale.</p><a href="https://wa.me/393497759350">Richiedi il primo incontro</a></section>
  </main>
  ${footer}`

const workbookBody = `
  <header><a href="${origin}/">Gabriele Ciandrini</a><a href="${origin}/cambia-direzione/">Esci dal workbook</a></header>
  <main>
    <p>Workbook online sul cambiamento professionale</p>
    <h1>Dove sei adesso?</h1>
    <p>Venti domande guidate per fotografare la situazione professionale attuale, senza etichette e senza risposte generate da un algoritmo.</p>
    <section><h2>La fotografia del presente</h2><p>Descrivi la situazione, ciò che funziona e ciò che oggi ti pesa.</p></section>
    <section><h2>Energia, contesto e identità</h2><p>Osserva i segnali, il ritmo, lo spazio decisionale, i valori e le capacità che riesci a esprimere.</p></section>
    <section><h2>Vincoli e direzione</h2><p>Distingui i limiti oggettivi dalle paure e rendi visibile il costo del restare fermo.</p></section>
    <p>Le risposte vengono salvate temporaneamente nel dispositivo fino all’invio. Il riepilogo personale viene inviato via e-mail al partecipante e a Gabriele Ciandrini.</p>
  </main>
  ${footer}`

const articlesBody = `
  ${nav}
  <main>
    <h1>Articoli sul cambiamento professionale</h1>
    <p>Idee e strumenti concreti per cambiare lavoro, superare i blocchi e costruire una direzione professionale più coerente.</p>
    <h2>Guide e approfondimenti recenti</h2>
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
      ${optimizedHtmlFor(item)}
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
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }
  if (type === 'article' && date) base.datePublished = date
  return base
}

const breadcrumbSchemaFor = ({ route, title, type }) => {
  const items = [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` }]
  if (type === 'article') {
    items.push({ '@type': 'ListItem', position: 2, name: 'Articoli', item: `${origin}/articoli/` })
  }
  if (route !== '/') {
    items.push({ '@type': 'ListItem', position: items.length + 1, name: title, item: `${origin}${route}` })
  }
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items }
}

const replaceOrInsertMeta = (html, selector, tag) => {
  if (selector.test(html)) return html.replace(selector, tag)
  return html.replace('</head>', `    ${tag}\n  </head>`)
}

const render = ({ route, title, description, body, type = 'website', date = null, image = defaultImage, extraSchema = null, robots = null }) => {
  const normalizedRoute = normalizeRoute(route)
  const canonical = `${origin}${normalizedRoute}`
  const schemas = [
    schemaFor({ route: normalizedRoute, title, description, type, date, image }),
    breadcrumbSchemaFor({ route: normalizedRoute, title, type }),
  ]
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
  html = replaceOrInsertMeta(html, /<meta property="og:image" content="[^"]*"\s*\/?>/i, `<meta property="og:image" content="${image}" />`)
  html = replaceOrInsertMeta(html, /<meta name="twitter:title" content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${escapeHtml(title)}" />`)
  html = replaceOrInsertMeta(html, /<meta name="twitter:description" content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${escapeHtml(description)}" />`)
  html = replaceOrInsertMeta(html, /<meta name="twitter:image" content="[^"]*"\s*\/?>/i, `<meta name="twitter:image" content="${image}" />`)
  html = replaceOrInsertMeta(html, /<link rel="canonical" href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonical}" />`)
  html = replaceOrInsertMeta(
    html,
    /<meta name="robots" content="[^"]*"\s*\/?>/i,
    robots
      ? `<meta name="robots" content="${robots}" />`
      : isProduction
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
  title: 'Chi sono | Coach per il cambiamento professionale',
  description: 'Dall’impresa di famiglia alla fabbrica, dagli autobus al personal training e al coaching: la storia con cui Gabriele Ciandrini aiuta a cambiare lavoro.',
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

render({
  route: '/privacy-policy/',
  title: 'Privacy Policy | Gabriele Ciandrini',
  description: 'Informativa sul trattamento dei dati personali del sito di Gabriele Ciandrini, titolare del trattamento, finalità, conservazione e diritti.',
  body: privacyBody,
  type: 'website',
})

render({
  route: '/cookie-policy/',
  title: 'Cookie Policy | Gabriele Ciandrini',
  description: 'Informativa sui cookie, sugli strumenti tecnici di sessione e sui servizi esterni utilizzati dal sito di Gabriele Ciandrini, senza finalità di profilazione.',
  body: cookieBody,
  type: 'website',
})

render({
  route: '/cambia-direzione/',
  title: 'Dove sei adesso? Fai chiarezza | Gabriele Ciandrini',
  description: 'Guarda il video e compila il workbook online per fotografare la tua situazione, riconoscere blocchi e convinzioni limitanti e scegliere il primo passo.',
  body: landingBody,
  type: 'website',
})

render({
  route: '/workbook-stato-attuale/',
  title: 'Workbook online: dove sei adesso? | Gabriele Ciandrini',
  description: 'Compila il workbook guidato per fotografare la tua situazione professionale attuale e ricevere il riepilogo personale delle tue risposte.',
  body: workbookBody,
  type: 'website',
  robots: 'noindex, follow',
})

render({
  route: '/grazie-per-il-workbook/',
  title: 'La tua fotografia è pronta | Gabriele Ciandrini',
  description: 'Ricevi il riepilogo personale del workbook e scegli il prossimo passo verso una direzione professionale più chiara e sostenibile.',
  body: thankYouBody,
  type: 'website',
  robots: 'noindex, follow',
})

for (const item of content) {
  if (['/', '/articoli/', '/libro-respira-immagina-agisci/', '/about-2/'].includes(item.path)) continue
  render({
    route: item.path,
    title: seoTitleFor(item),
    description: seoDescriptionFor(item),
    body: contentBody(item),
    type: item.type === 'post' ? 'article' : 'website',
    date: item.date,
    image: imageForItem(item).startsWith('http') ? imageForItem(item) : `${origin}${imageForItem(item)}`,
  })
}

const routes = ['/', '/articoli/', '/libro-respira-immagina-agisci/', '/about-2/', '/privacy-policy/', '/cookie-policy/', '/cambia-direzione/', ...content.map((item) => item.path)]
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
