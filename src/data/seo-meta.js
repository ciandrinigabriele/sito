import { videoForPath, videoHtmlFor } from './social-videos.js'
export const SITE_NAME = 'Gabriele Ciandrini'
export const SITE_ORIGIN = 'https://gabrieleciandrini.com'
export const DEFAULT_SOCIAL_IMAGE = '/media/career-bridge-og.png'

const titleOverrides = {
  '/cambiare-lavoro-ancona/': 'Cambiare lavoro ad Ancona | Coaching professionale',
  '/contatti/': 'Contatti e studio ad Ancona | Gabriele Ciandrini',
  '/2022/01/13/sogni-obiettivi/': 'Sogni e obiettivi: dal desiderio al piano professionale',
  '/2023/09/14/dai-un-pesce-ad-un-uomo-e-lo-nutrirai-per-un-giorno-insegnagli-a-pescare-e-lo-nutrirai-per-tutta-la-vita/': 'Come costruire la tua direzione professionale',
  '/2023/09/20/la-differenza-tra-psicologo-e-life-coach-due-figure-diverse-ma-complementari-nel-percorso-di-crescita-personale/': 'Psicologo o life coach? Differenze e come scegliere',
  '/2023/09/23/il-trio-vincente-pazienza-tempo-e-perseveranza/': 'Pazienza, tempo e perseveranza per cambiare lavoro',
  '/2023/09/25/la-resilienza-la-chiave-per-superare-le-avversita-e-realizzare-cio-che-desideri/': 'Resilienza nel cambiamento professionale',
  '/2023/10/09/cambia-il-tuo-dialogo-interno-per-trasformare-la-tua-vita/': 'Dialogo interno e cambiamento professionale',
}

const descriptionOverrides = {
  '/cambiare-lavoro-ancona/': 'Vuoi cambiare lavoro ad Ancona senza perdere sicurezza? Fai chiarezza su direzione, vincoli e passi concreti con un percorso professionale.',
  '/ruota-della-vita/': 'Scopri la Ruota della Vita: uno strumento di coaching per osservare lavoro, relazioni, salute e crescita e scegliere da quale area ripartire.',
  '/2026/07/20/quanto-ti-stanno-pagando-per-non-farti-realizzare-i-tuoi-sogni/': 'Quanto pesa davvero la sicurezza economica sulle tue scelte? Una riflessione concreta per distinguere protezione, rinuncia e direzione professionale.',
}

const headingOverrides = {
  '/cambiare-lavoro-ancona/': 'Cambiare lavoro ad Ancona senza buttarti nel vuoto',
}

const localCareerPageHtml = `
<section>
  <p class="has-large-font-size wp-block-paragraph">Non ti riconosci più nel tuo lavoro, ma non puoi rinunciare da un giorno all’altro al reddito attuale? <strong>Cambiare lavoro ad Ancona</strong> non significa mollare tutto: significa capire quale direzione professionale è sostenibile per te e preparare il passaggio con metodo.</p>
  <p class="wp-block-paragraph">Il punto di partenza è distinguere ciò che non funziona più da ciò che vuoi proteggere: reddito, famiglia, tempo, competenze e stabilità. Solo dopo puoi valutare se cercare un nuovo impiego, costruire un’attività indipendente o attraversare una transizione graduale.</p>
  <figure class="wp-block-image size-large"><img loading="eager" decoding="async" width="1024" height="576" src="/media/file_0000000009c87246a6cab8c92bd8d8ad123945162956070555-b99cbc5825.png" alt="Gabriele Ciandrini, coach per il cambiamento professionale ad Ancona" /></figure>
</section>

<section>
  <h2>Che cosa vuoi cambiare davvero?</h2>
  <p>Un <strong>cambio lavoro ad Ancona</strong> può nascondere bisogni diversi. Potresti voler cambiare azienda, ruolo, settore oppure il modo in cui lavori: ritmi, responsabilità, autonomia, ambiente e rapporto tra lavoro e vita personale. Chiarire questa differenza evita di spostare lo stesso problema in un posto nuovo.</p>
  <ul>
    <li><strong>Cambiare azienda:</strong> il ruolo ti interessa ancora, ma il contesto non ti permette più di esprimerti.</li>
    <li><strong>Cambiare ruolo o settore:</strong> vuoi usare capacità diverse e costruire una nuova identità professionale.</li>
    <li><strong>Cambiare modo di lavorare:</strong> cerchi più autonomia, flessibilità o un equilibrio diverso.</li>
  </ul>
</section>

<section>
  <h2>Tre direzioni possibili, non una risposta uguale per tutti</h2>
  <h3>Restare dipendente cambiando posizione</h3>
  <p>Puoi preparare un passaggio verso un’altra azienda, un ruolo diverso o un settore più coerente, valorizzando competenze ed esperienza senza rinunciare alla stabilità del lavoro dipendente.</p>
  <h3>Diventare indipendente</h3>
  <p>Puoi trasformare un’idea o una competenza in un progetto autonomo, verificando prima domanda, offerta, costi, tempi e sostenibilità economica.</p>
  <h3>Costruire una transizione graduale</h3>
  <p>Puoi mantenere il reddito attuale mentre testi una nuova direzione, sviluppi competenze e crei una base concreta. Il lavoro di oggi può diventare il ponte verso quello di domani.</p>
</section>

<section>
  <h2>Non abbandonare tutto senza una base economica</h2>
  <p>La sicurezza non è il contrario del cambiamento: può esserne la base. Prima di una scelta irreversibile servono margine economico, tempi realistici, ipotesi da verificare e un piano alternativo. L’obiettivo non è eliminare ogni rischio, ma evitare che la fretta decida al posto tuo.</p>
</section>

<section>
  <h2>Il metodo Respira. Immagina. Agisci.</h2>
  <p><strong>Respira</strong>: riduci il rumore, riconosci paure, vincoli e segnali reali. <strong>Immagina</strong>: chiarisci valori, competenze e direzione. <strong>Agisci</strong>: trasformi la direzione in verifiche, priorità e passi sostenibili.</p>
  <p>Questo è il cuore del mio lavoro come <strong>coach per il cambiamento professionale ad Ancona</strong>: aiutarti a passare dalla confusione a una scelta concreta, senza formule standard e senza promettere scorciatoie.</p>
  <p><a href="/metodo-respira-immagina-agisci/">Approfondisci il metodo Respira. Immagina. Agisci.</a></p>
</section>

<section>
  <h2>Esperienza reale nei cambiamenti professionali</h2>
  <p>Ho chiuso un’impresa di famiglia, lavorato in fabbrica, guidato autobus, studiato mentre lavoravo, iniziato da cinque euro l’ora e costruito gradualmente la mia attività. Non insegno il cambiamento soltanto dai libri: l’ho attraversato più volte, proteggendo ciò che era necessario mentre preparavo il passo successivo.</p>
  <p><a href="/about-2/">Leggi la storia delle mie svolte professionali.</a></p>
</section>

<section>
  <h2>Orientamento professionale ad Ancona e online</h2>
  <p>Il percorso è disponibile nel mio studio ad Ancona e online in tutta Italia. L’<strong>orientamento professionale ad Ancona</strong> parte dalla tua situazione reale: lavoro attuale, risorse, vincoli, possibilità locali e opportunità che puoi esplorare anche oltre il territorio.</p>
  <p>Se preferisci lavorare a distanza, puoi approfondire il <a href="/coach-cambiamento-professionale-online/">coaching per il cambiamento professionale online</a>.</p>
</section>

<section>
  <h2>Domande frequenti</h2>
  <h3>Devo licenziarmi prima di capire che cosa voglio?</h3>
  <p>No. Nella maggior parte dei casi è più utile chiarire direzione, vincoli e risorse mentre conservi una base economica.</p>
  <h3>Come scelgo tra lavoro dipendente e indipendente?</h3>
  <p>Confronta valori, bisogno di sicurezza, autonomia desiderata, competenze, mercato e sostenibilità. La scelta non deve essere ideologica: deve funzionare nella tua vita reale.</p>
  <h3>Il percorso è solo per chi vive ad Ancona?</h3>
  <p>No. Puoi lavorare con me ad Ancona oppure online in tutta Italia.</p>
  <h3>Quanto tempo serve per cambiare lavoro?</h3>
  <p>Dipende dal punto di partenza e dalla direzione. Il primo obiettivo è definire il prossimo passo verificabile, non forzare una scadenza uguale per tutti.</p>
</section>

<section>
  <h2>Da dove iniziare</h2>
  <p>Puoi partire dal <a href="/cambia-direzione/">workbook gratuito per fare chiarezza</a> oppure da un incontro conoscitivo gratuito per mettere a fuoco il problema e capire se il percorso è adatto alla tua situazione.</p>
  <div class="wp-block-buttons"><div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="/incontro-gratuito/">Richiedi l’incontro conoscitivo gratuito</a></div></div>
  <p>Per approfondire: <a href="/2026/07/08/cambiare-lavoro-senza-buttarsi-nel-vuoto/">come cambiare lavoro senza buttarti nel vuoto</a> e <a href="/2026/06/29/come-capire-se-e-il-momento-di-cambiare-lavoro/">come capire se è il momento di cambiare lavoro</a>.</p>
</section>`

export const cleanMetaText = (value = '') => String(value)
  .replace(/<[^>]+>/g, ' ')
  .replace(/&hellip;/g, '…')
  .replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&#0?39;/g, "'")
  .replace(/\s+/g, ' ')
  .trim()

const truncateAtWord = (value, max = 160) => {
  const clean = cleanMetaText(value)
  if (clean.length <= max) return clean
  const shortened = clean.slice(0, max - 1).replace(/\s+\S*$/, '')
  return `${shortened}…`
}

export const seoTitleFor = (item) => {
  const preferred = titleOverrides[item.path] || cleanMetaText(item.title)
  const branded = `${preferred} | ${SITE_NAME}`
  return branded.length <= 65 ? branded : preferred
}

export const pageHeadingFor = (item) => headingOverrides[item.path] || cleanMetaText(item.title)

export const seoDescriptionFor = (item) => truncateAtWord(
  descriptionOverrides[item.path]
    || item.excerpt
    || `${item.title}. Percorsi, strumenti e idee per il cambiamento professionale.`,
)

export const imageForItem = (item) => {
  const video = videoForPath(item.path)
  if (video) return `/media/video-social/${video.id}.jpg`
  if (item.featuredImage) return item.featuredImage
  const match = item.html?.match(/<img\b[^>]*\bsrc=["']([^"']+)["']/i)
  return match?.[1] || DEFAULT_SOCIAL_IMAGE
}

const contextualAlt = (item) => {
  if (item.path === '/contatti/') return 'Studio di coaching di Gabriele Ciandrini ad Ancona'
  if (item.path === '/ruota-della-vita/') return 'Esempio della Ruota della Vita'
  if (item.path === '/about-2/fitness-coach/') return 'Gabriele Ciandrini nel lavoro su fitness e postura'
  return `Immagine di approfondimento: ${cleanMetaText(item.title)}`
}

export const optimizedHtmlFor = (item) => {
  let html = videoHtmlFor(item.path) + (item.path === '/cambiare-lavoro-ancona/' ? localCareerPageHtml : (item.html || ''))
  if (item.path === '/incontro-gratuito/' && !html.includes('href="/cambiare-lavoro-ancona/"')) {
    html += '<p>Se il tuo obiettivo riguarda il lavoro, prima dell\u2019incontro puoi leggere il <a href="/cambiare-lavoro-ancona/">percorso per cambiare lavoro ad Ancona</a>.</p>'
  }
  if (item.path === '/coach-cambiamento-professionale-ancona/' && !html.includes('href="/cambiare-lavoro-ancona/"')) {
    html += '<p>Se stai valutando un nuovo ruolo, un\u2019attività indipendente o una transizione graduale, approfondisci <a href="/cambiare-lavoro-ancona/">come preparare un cambiamento lavorativo ad Ancona</a>.</p>'
  }
  html = html
    .replaceAll('/wp-content/uploads/2021/01/ruota-della-vita-per-facebook.pdf', '/downloads/ruota-della-vita-gabriele-ciandrini.pdf')
    .replace('>ruota-della-vita-per-facebook<', '>Ruota della Vita di Gabriele Ciandrini<')
    .replace('>Download<', '>Scarica la Ruota della Vita<')
  const hasImage = /<img\b/i.test(html)
  if (!hasImage && item.featuredImage) {
    html = `<figure class="wp-block-image size-large"><img loading="eager" decoding="async" src="${item.featuredImage}" alt="${item.featuredImageAlt || contextualAlt(item)}" /></figure>\n${html}`
  }
  return html.replace(/<img\b([^>]*?)>/gi, (tag, attributes) => {
    let optimized = attributes
    if (!/\balt=["'][^"']+["']/i.test(optimized)) {
      optimized = optimized.replace(/\s+alt=["'][^"']*["']/i, '')
      optimized += ` alt="${item.featuredImageAlt || contextualAlt(item)}"`
    }
    if (!/\bdecoding=/i.test(optimized)) optimized += ' decoding="async"'
    if (!/\bloading=/i.test(optimized)) optimized += ' loading="lazy"'
    return `<img${optimized}>`
  })
}
