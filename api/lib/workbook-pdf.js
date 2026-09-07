const PAGE_WIDTH = 595.28
const PAGE_HEIGHT = 841.89
const MARGIN = 54

const palette = {
  ink: [0.063, 0.09, 0.086],
  muted: [0.36, 0.41, 0.39],
  paper: [0.965, 0.953, 0.92],
  lime: [0.796, 1, 0.271],
  white: [1, 1, 1],
  line: [0.84, 0.82, 0.76],
}

const normalizeText = (value = '') => String(value)
  .normalize('NFC')
  .replace(/[“”]/g, '"')
  .replace(/[‘’]/g, "'")
  .replace(/[–—]/g, '-')
  .replace(/…/g, '...')
  .replace(/[•·]/g, '-')
  .replace(/[^\x20-\x7E\xA0-\xFF]/g, '?')

const pdfString = (value) => normalizeText(value)
  .replace(/\\/g, '\\\\')
  .replace(/\(/g, '\\(')
  .replace(/\)/g, '\\)')

const color = (rgb) => rgb.map((value) => Number(value.toFixed(3))).join(' ')

const wrapText = (text, maxChars) => {
  const paragraphs = normalizeText(text).split(/\r?\n/)
  const lines = []
  for (const paragraph of paragraphs) {
    const words = paragraph.trim().split(/\s+/).filter(Boolean)
    if (!words.length) {
      lines.push('')
      continue
    }
    let line = ''
    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word
      if (candidate.length <= maxChars) {
        line = candidate
      } else {
        if (line) lines.push(line)
        line = word
      }
    }
    if (line) lines.push(line)
  }
  return lines
}

const fillRect = (x, y, width, height, rgb) => `${color(rgb)} rg ${x} ${y} ${width} ${height} re f\n`
const strokeLine = (x1, y1, x2, y2, rgb, width = 1) => `${color(rgb)} RG ${width} w ${x1} ${y1} m ${x2} ${y2} l S\n`
const text = (value, x, y, size, font = 'F1', rgb = palette.ink) =>
  `BT /${font} ${size} Tf ${color(rgb)} rg 1 0 0 1 ${x} ${y} Tm (${pdfString(value)}) Tj ET\n`

const header = (commands, section = '') => {
  commands.push(text('GABRIELE CIANDRINI', MARGIN, PAGE_HEIGHT - 45, 8, 'F2', palette.muted))
  commands.push(text('RESPIRA. IMMAGINA. AGISCI.', PAGE_WIDTH - 195, PAGE_HEIGHT - 45, 8, 'F2', palette.muted))
  commands.push(strokeLine(MARGIN, PAGE_HEIGHT - 58, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 58, palette.line, 0.7))
  if (section) commands.push(text(section.toUpperCase(), MARGIN, PAGE_HEIGHT - 84, 8, 'F2', palette.muted))
}

const footer = (commands, pageNumber) => {
  commands.push(strokeLine(MARGIN, 42, PAGE_WIDTH - MARGIN, 42, palette.line, 0.7))
  commands.push(text('La fotografia del tuo punto di partenza', MARGIN, 26, 7, 'F1', palette.muted))
  commands.push(text(String(pageNumber).padStart(2, '0'), PAGE_WIDTH - MARGIN - 12, 26, 7, 'F2', palette.muted))
}

const createPdf = (pageStreams) => {
  const objects = []
  objects[1] = '<< /Type /Catalog /Pages 2 0 R >>'
  const pageIds = pageStreams.map((_, index) => 5 + index * 2)
  objects[2] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`
  objects[3] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>'
  objects[4] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>'

  pageStreams.forEach((stream, index) => {
    const pageId = pageIds[index]
    const contentId = pageId + 1
    const streamBytes = Buffer.from(stream, 'latin1')
    objects[pageId] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentId} 0 R >>`
    objects[contentId] = Buffer.concat([
      Buffer.from(`<< /Length ${streamBytes.length} >>\nstream\n`, 'latin1'),
      streamBytes,
      Buffer.from('\nendstream', 'latin1'),
    ])
  })

  const chunks = [Buffer.from('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n', 'latin1')]
  const offsets = [0]
  for (let id = 1; id < objects.length; id += 1) {
    offsets[id] = chunks.reduce((total, chunk) => total + chunk.length, 0)
    const body = Buffer.isBuffer(objects[id]) ? objects[id] : Buffer.from(objects[id], 'latin1')
    chunks.push(Buffer.from(`${id} 0 obj\n`, 'latin1'), body, Buffer.from('\nendobj\n', 'latin1'))
  }
  const xrefOffset = chunks.reduce((total, chunk) => total + chunk.length, 0)
  const xref = [`xref\n0 ${objects.length}\n`, '0000000000 65535 f \n']
  for (let id = 1; id < objects.length; id += 1) xref.push(`${String(offsets[id]).padStart(10, '0')} 00000 n \n`)
  chunks.push(Buffer.from(xref.join(''), 'latin1'))
  chunks.push(Buffer.from(`trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`, 'latin1'))
  return Buffer.concat(chunks)
}

export function buildWorkbookPdf({ name, email, submittedAt, sections }) {
  const pages = []
  const cover = []
  cover.push(fillRect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, palette.ink))
  cover.push(fillRect(MARGIN, PAGE_HEIGHT - 120, 82, 5, palette.lime))
  cover.push(text('WORKBOOK PERSONALE', MARGIN, PAGE_HEIGHT - 155, 9, 'F2', palette.lime))
  cover.push(text('Dove sei', MARGIN, PAGE_HEIGHT - 270, 48, 'F2', palette.white))
  cover.push(text('adesso?', MARGIN, PAGE_HEIGHT - 325, 48, 'F2', palette.white))
  cover.push(text('La fotografia del tuo punto di partenza', MARGIN, PAGE_HEIGHT - 365, 16, 'F1', [0.75, 0.8, 0.78]))
  cover.push(fillRect(MARGIN, 155, PAGE_WIDTH - MARGIN * 2, 120, [0.102, 0.135, 0.125]))
  cover.push(text('PREPARATO PER', MARGIN + 24, 242, 8, 'F2', palette.lime))
  cover.push(text(name, MARGIN + 24, 207, 23, 'F2', palette.white))
  cover.push(text(email, MARGIN + 24, 181, 10, 'F1', [0.7, 0.76, 0.73]))
  cover.push(text(`Compilato il ${submittedAt}`, MARGIN, 75, 9, 'F1', [0.55, 0.62, 0.59]))
  cover.push(text('R  /  I  /  A', PAGE_WIDTH - MARGIN - 75, 75, 9, 'F2', palette.lime))
  pages.push(cover.join(''))

  let pageNumber = 2
  for (const section of sections) {
    let commands = []
    header(commands, `${section.number} / ${section.label}`)
    commands.push(text(section.title, MARGIN, PAGE_HEIGHT - 125, 27, 'F2', palette.ink))
    let y = PAGE_HEIGHT - 165

    for (const item of section.answers) {
      const questionLines = wrapText(item.question, 76)
      const answerLines = wrapText(item.answer || 'Non compilata', 88)
      const blockHeight = 27 + questionLines.length * 13 + Math.max(2, answerLines.length) * 13 + 24

      if (y - blockHeight < 65) {
        footer(commands, pageNumber)
        pages.push(commands.join(''))
        pageNumber += 1
        commands = []
        header(commands, `${section.number} / ${section.label} - continua`)
        y = PAGE_HEIGHT - 105
      }

      commands.push(fillRect(MARGIN, y - blockHeight + 10, PAGE_WIDTH - MARGIN * 2, blockHeight, palette.paper))
      commands.push(fillRect(MARGIN, y - blockHeight + 10, 4, blockHeight, section.color || palette.lime))
      let cursor = y - 12
      questionLines.forEach((line) => {
        commands.push(text(line, MARGIN + 18, cursor, 9.5, 'F2', palette.ink))
        cursor -= 13
      })
      cursor -= 7
      answerLines.forEach((line) => {
        commands.push(text(line, MARGIN + 18, cursor, 9.5, 'F1', item.answer ? palette.muted : [0.55, 0.55, 0.55]))
        cursor -= 13
      })
      y -= blockHeight + 12
    }

    footer(commands, pageNumber)
    pages.push(commands.join(''))
    pageNumber += 1
  }

  const close = []
  close.push(fillRect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, palette.ink))
  close.push(fillRect(MARGIN, PAGE_HEIGHT - 118, 82, 5, palette.lime))
  close.push(text('NON SERVE DECIDERE TUTTO OGGI', MARGIN, PAGE_HEIGHT - 155, 9, 'F2', palette.lime))
  close.push(text('Ora puoi', MARGIN, PAGE_HEIGHT - 250, 42, 'F2', palette.white))
  close.push(text('vedere meglio.', MARGIN, PAGE_HEIGHT - 300, 42, 'F2', palette.white))
  close.push(text('Questa fotografia non e una diagnosi e non assegna etichette.', MARGIN, PAGE_HEIGHT - 350, 13, 'F1', [0.74, 0.79, 0.77]))
  close.push(text('E un punto di partenza da rileggere con calma.', MARGIN, PAGE_HEIGHT - 372, 13, 'F1', [0.74, 0.79, 0.77]))
  close.push(fillRect(MARGIN, 168, PAGE_WIDTH - MARGIN * 2, 118, [0.102, 0.135, 0.125]))
  close.push(text('IL PROSSIMO PASSO', MARGIN + 24, 252, 8, 'F2', palette.lime))
  close.push(text('Confronta le tue risposte con Gabriele.', MARGIN + 24, 220, 17, 'F2', palette.white))
  close.push(text('gabrieleciandrini.com/incontro-gratuito/', MARGIN + 24, 193, 10, 'F1', [0.7, 0.76, 0.73]))
  close.push(text('gabrieleciandrini.com', MARGIN, 75, 9, 'F1', [0.55, 0.62, 0.59]))
  close.push(text('R  /  I  /  A', PAGE_WIDTH - MARGIN - 75, 75, 9, 'F2', palette.lime))
  pages.push(close.join(''))

  return createPdf(pages)
}
