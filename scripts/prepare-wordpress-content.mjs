import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

const root = process.cwd()
const pages = JSON.parse(fs.readFileSync(path.join(root, '.audit-pages.json'), 'utf8'))
const posts = JSON.parse(fs.readFileSync(path.join(root, '.audit-posts.json'), 'utf8'))

const decode = (value = '') => value
  .replace(/&#8217;|&#x2019;/g, '’')
  .replace(/&#8220;|&#x201c;/g, '“')
  .replace(/&#8221;|&#x201d;/g, '”')
  .replace(/&#8211;|&#x2013;/g, '–')
  .replace(/&#038;|&#38;|&amp;/g, '&')
  .replace(/&#8230;|&#x2026;/g, '…')
  .replace(/&nbsp;/g, ' ')
  .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))

const stripTags = (value = '') => decode(value)
  .replace(/<[^>]*>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()

const media = new Map()

const localizeMedia = (html) => html.replace(
  /(\ssrc=["'])(https?:\/\/i0\.wp\.com\/gabrieleciandrini\.com\/wp-content\/uploads\/[^"']+)(["'])/gi,
  (_, prefix, rawUrl, suffix) => {
    const source = decode(rawUrl)
    const parsed = new URL(source)
    const originalName = path.basename(parsed.pathname)
    const extension = path.extname(originalName).toLowerCase() || '.jpg'
    const stem = path.basename(originalName, extension)
      .normalize('NFKD')
      .replace(/[^\w-]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 55) || 'immagine'
    const hash = crypto.createHash('sha1').update(source).digest('hex').slice(0, 10)
    const filename = `${stem}-${hash}${extension}`
    media.set(filename, source)
    return `${prefix}/media/${filename}${suffix}`
  },
)

const cleanHtml = (value = '') => localizeMedia(decode(value)
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/<figure[^>]*>[\s\S]*?(?:a65e5-rosaferragostocartellochiusoperferiepostinstagram|0c0eb-perdersiastoccolma)[\s\S]*?<\/figure>/gi, '')
  .replace(/\s(?:srcset|sizes)="[^"]*"/gi, '')
  .replace(/\s(?:srcset|sizes)='[^']*'/gi, '')
  .replace(/https?:\/\/gabrieleciandrini\.com(?=\/)/gi, '')
  .replace(/<h1(\s[^>]*)?>/gi, '<h2$1>')
  .replace(/<\/h1>/gi, '</h2>')
  .replace(/<h2[^>]*>\s*<\/h2>/gi, '')
)

const routeFor = (item) => new URL(item.link).pathname

const normalize = (item, type) => ({
  id: item.id,
  type,
  path: routeFor(item),
  slug: item.slug,
  date: item.date || null,
  title: stripTags(item.title.rendered),
  excerpt: stripTags(item.excerpt.rendered),
  html: cleanHtml(item.content.rendered),
})

const content = [
  ...pages.map((item) => normalize(item, 'page')),
  ...posts.map((item) => normalize(item, 'post')),
]

fs.mkdirSync(path.join(root, 'src', 'data'), { recursive: true })
fs.writeFileSync(
  path.join(root, 'src', 'data', 'wordpress-content.json'),
  JSON.stringify(content, null, 2) + '\n',
)

const summary = {
  generatedAt: new Date().toISOString(),
  pages: pages.length,
  posts: posts.length,
  routes: content.map(({ type, path: route, title }) => ({ type, route, title })),
}
fs.writeFileSync(
  path.join(root, 'src', 'data', 'wordpress-inventory.json'),
  JSON.stringify(summary, null, 2) + '\n',
)

fs.writeFileSync(
  path.join(root, 'src', 'data', 'media-manifest.json'),
  JSON.stringify([...media].map(([filename, url]) => ({ filename, url })), null, 2) + '\n',
)

console.log(`Prepared ${pages.length} pages, ${posts.length} posts and ${media.size} media files.`)
