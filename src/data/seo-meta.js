export const SITE_NAME = 'Gabriele Ciandrini'
export const SITE_ORIGIN = 'https://gabrieleciandrini.com'
export const DEFAULT_SOCIAL_IMAGE = '/media/career-bridge-og.png'

const titleOverrides = {
  '/contatti/': 'Contatti e studio ad Ancona | Gabriele Ciandrini',
  '/2022/01/13/sogni-obiettivi/': 'Sogni e obiettivi: dal desiderio al piano professionale',
  '/2023/09/14/dai-un-pesce-ad-un-uomo-e-lo-nutrirai-per-un-giorno-insegnagli-a-pescare-e-lo-nutrirai-per-tutta-la-vita/': 'Come costruire la tua direzione professionale',
  '/2023/09/20/la-differenza-tra-psicologo-e-life-coach-due-figure-diverse-ma-complementari-nel-percorso-di-crescita-personale/': 'Psicologo o life coach? Differenze e come scegliere',
  '/2023/09/23/il-trio-vincente-pazienza-tempo-e-perseveranza/': 'Pazienza, tempo e perseveranza per cambiare lavoro',
  '/2023/09/25/la-resilienza-la-chiave-per-superare-le-avversita-e-realizzare-cio-che-desideri/': 'Resilienza nel cambiamento professionale',
  '/2023/10/09/cambia-il-tuo-dialogo-interno-per-trasformare-la-tua-vita/': 'Dialogo interno e cambiamento professionale',
}

const descriptionOverrides = {
  '/ruota-della-vita/': 'Scopri la Ruota della Vita: uno strumento di coaching per osservare lavoro, relazioni, salute e crescita e scegliere da quale area ripartire.',
  '/2026/07/20/quanto-ti-stanno-pagando-per-non-farti-realizzare-i-tuoi-sogni/': 'Quanto pesa davvero la sicurezza economica sulle tue scelte? Una riflessione concreta per distinguere protezione, rinuncia e direzione professionale.',
}

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

export const seoDescriptionFor = (item) => truncateAtWord(
  descriptionOverrides[item.path]
    || item.excerpt
    || `${item.title}. Percorsi, strumenti e idee per il cambiamento professionale.`,
)

export const imageForItem = (item) => {
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
  let html = item.html || ''
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
