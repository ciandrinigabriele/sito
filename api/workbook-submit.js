import { buildWorkbookPdf } from './lib/workbook-pdf.js'
import { requiredQuestionIds, workbookQuestions, workbookSections } from '../src/workbookQuestions.js'

const OWNER_EMAIL = 'ciandrini.gabriele@gmail.com'
const MAX_BODY_BYTES = 80_000
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ALLOWED_ORIGIN = /^https:\/\/(?:www\.)?gabrieleciandrini\.com$|^https:\/\/[a-z0-9-]+\.vercel\.app$|^http:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?$/i
const sectionColors = {
  fotografia: [0.796, 1, 0.271],
  energia: [1, 0.541, 0.439],
  contesto: [0.714, 0.655, 1],
  identita: [0.471, 0.851, 1],
  direzione: [1, 0.847, 0.42],
}

const clean = (value, max) => String(value || '').trim().slice(0, max)
const escapeHtml = (value) => clean(value, 10_000)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;')

const parseBody = (req) => {
  if (typeof req.body === 'object' && req.body !== null) return req.body
  if (typeof req.body !== 'string') return {}
  if (Buffer.byteLength(req.body, 'utf8') > MAX_BODY_BYTES) throw new Error('BODY_TOO_LARGE')
  return JSON.parse(req.body)
}

const normalizeAnswers = (rawAnswers) => {
  const source = rawAnswers && typeof rawAnswers === 'object' ? rawAnswers : {}
  return Object.fromEntries(workbookQuestions.map(({ id }) => [id, clean(source[id], 2500)]))
}

const validate = (body) => {
  const submissionId = clean(body.submissionId, 50)
  const name = clean(body.name, 100)
  const email = clean(body.email, 200).toLowerCase()
  const answers = normalizeAnswers(body.answers)
  if (clean(body.company, 100)) return { silentlyIgnore: true }
  if (!UUID_PATTERN.test(submissionId)) throw new Error('INVALID_SUBMISSION')
  if (name.length < 2) throw new Error('INVALID_NAME')
  if (!EMAIL_PATTERN.test(email)) throw new Error('INVALID_EMAIL')
  if (!body.privacyAccepted) throw new Error('PRIVACY_REQUIRED')
  const missing = [...requiredQuestionIds].filter((id) => answers[id].length < 2)
  if (missing.length) throw new Error('REQUIRED_ANSWERS')
  return { submissionId, name, email, answers }
}

const trackingFrom = (body) => ({
  source: clean(body.tracking?.source, 120),
  medium: clean(body.tracking?.medium, 120),
  campaign: clean(body.tracking?.campaign, 180),
  content: clean(body.tracking?.content, 180),
  term: clean(body.tracking?.term, 180),
  referrer: clean(body.referrer, 500),
  landing_path: clean(body.landingPath, 300) || '/cambia-direzione/',
})

const responseSections = (answers) => workbookSections.map((section) => ({
  ...section,
  color: sectionColors[section.id],
  answers: section.questions.map((question, index) => ({
    question,
    answer: answers[`${section.id}-${index + 1}`],
  })),
}))

const answerHtml = (sections) => sections.map((section) => `
  <section style="margin:28px 0 0">
    <p style="margin:0 0 6px;color:#69736f;font:700 11px Arial,sans-serif;letter-spacing:1px">${section.number} / ${escapeHtml(section.label).toUpperCase()}</p>
    <h2 style="margin:0 0 16px;color:#101716;font:700 24px Arial,sans-serif">${escapeHtml(section.title)}</h2>
    ${section.answers.map((item) => `
      <div style="margin:0 0 12px;padding:18px;border-left:4px solid #cbff45;background:#f5f3ec">
        <p style="margin:0 0 8px;color:#101716;font:700 14px/1.45 Arial,sans-serif">${escapeHtml(item.question)}</p>
        <p style="margin:0;color:#535d59;font:400 14px/1.6 Arial,sans-serif;white-space:pre-wrap">${escapeHtml(item.answer || 'Non compilata')}</p>
      </div>`).join('')}
  </section>`).join('')

const emailShell = ({ eyebrow, title, intro, content = '', cta = '' }) => `<!doctype html><html><body style="margin:0;background:#eef0ea;padding:24px 10px"><main style="max-width:680px;margin:auto;overflow:hidden;border-radius:20px;background:#fff;box-shadow:0 14px 45px rgba(16,23,22,.1)"><header style="padding:34px;background:#101716;color:#fff"><p style="margin:0 0 20px;color:#cbff45;font:700 10px Arial,sans-serif;letter-spacing:1.5px">${eyebrow}</p><h1 style="margin:0;font:700 34px/1.04 Arial,sans-serif">${title}</h1></header><div style="padding:30px"><p style="margin:0;color:#4d5753;font:400 16px/1.65 Arial,sans-serif">${intro}</p>${content}${cta}</div><footer style="padding:20px 30px;border-top:1px solid #ecece8;color:#7a837f;font:400 11px/1.5 Arial,sans-serif">Gabriele Ciandrini · Respira. Immagina. Agisci.<br>Questa e-mail è stata inviata soltanto per consegnare il workbook richiesto.</footer></main></body></html>`

const resend = async ({ apiKey, from, to, subject, html, attachment, idempotencyKey }) => {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
      attachments: attachment ? [{ filename: 'workbook-dove-sei-adesso.pdf', content: attachment }] : undefined,
    }),
  })
  if (!response.ok) throw new Error(`RESEND_${response.status}`)
  return response.json()
}

const supabaseRequest = async ({ url, serviceKey, path, method = 'POST', body, prefer }) => {
  const response = await fetch(`${url.replace(/\/$/, '')}/rest/v1/${path}`, {
    method,
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
      ...(prefer ? { Prefer: prefer } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!response.ok) throw new Error(`SUPABASE_${response.status}`)
  return response
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'METHOD_NOT_ALLOWED' })
  }
  const requestOrigin = clean(req.headers.origin, 300)
  if (requestOrigin && !ALLOWED_ORIGIN.test(requestOrigin)) return res.status(403).json({ ok: false, error: 'ORIGIN_NOT_ALLOWED' })

  const supabaseUrl = process.env.SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const resendKey = process.env.RESEND_API_KEY
  const from = process.env.WORKBOOK_FROM_EMAIL
  const ownerEmail = process.env.WORKBOOK_OWNER_EMAIL || OWNER_EMAIL
  if (!supabaseUrl || !serviceKey || !resendKey || !from) {
    return res.status(503).json({ ok: false, error: 'SERVICE_NOT_CONFIGURED' })
  }

  try {
    const body = parseBody(req)
    const data = validate(body)
    if (data.silentlyIgnore) return res.status(200).json({ ok: true })
    const tracking = trackingFrom(body)
    const submittedAt = new Intl.DateTimeFormat('it-IT', { dateStyle: 'long', timeZone: 'Europe/Rome' }).format(new Date())
    const sections = responseSections(data.answers)
    const pdf = buildWorkbookPdf({ name: data.name, email: data.email, submittedAt, sections })
    const attachment = pdf.toString('base64')

    await supabaseRequest({
      url: supabaseUrl,
      serviceKey,
      path: 'workbook_responses?on_conflict=id',
      body: {
        id: data.submissionId,
        name: data.name,
        email: data.email,
        answers: data.answers,
        privacy_accepted_at: new Date().toISOString(),
        user_agent: clean(req.headers['user-agent'], 500),
        ...tracking,
      },
      prefer: 'resolution=ignore-duplicates,return=minimal',
    })

    const participantHtml = emailShell({
      eyebrow: 'IL TUO WORKBOOK PERSONALE',
      title: `${escapeHtml(data.name.split(' ')[0])}, la tua fotografia è pronta.`,
      intro: 'In allegato trovi la copia personale delle tue risposte. Rileggila senza giudicarti: serve a rendere visibile il punto da cui stai partendo, non ad assegnarti un’etichetta.',
      cta: '<p style="margin:26px 0 0"><a href="https://gabrieleciandrini.com/incontro-gratuito/" style="display:inline-block;padding:14px 20px;border-radius:999px;background:#cbff45;color:#101716;text-decoration:none;font:700 14px Arial,sans-serif">Confronta le risposte con Gabriele →</a></p>',
    })
    const ownerHtml = emailShell({
      eyebrow: 'NUOVO WORKBOOK COMPILATO',
      title: `${escapeHtml(data.name)} ha completato il workbook.`,
      intro: `E-mail: <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a>. In allegato trovi il riepilogo completo.`,
      content: answerHtml(sections),
    })

    await Promise.all([
      resend({ apiKey: resendKey, from, to: data.email, subject: 'Il tuo workbook personale: Dove sei adesso?', html: participantHtml, attachment, idempotencyKey: `workbook-${data.submissionId}-participant` }),
      resend({ apiKey: resendKey, from, to: ownerEmail, subject: `Nuovo workbook compilato - ${data.name}`, html: ownerHtml, attachment, idempotencyKey: `workbook-${data.submissionId}-owner` }),
    ])

    await supabaseRequest({
      url: supabaseUrl,
      serviceKey,
      path: `workbook_responses?id=eq.${data.submissionId}`,
      method: 'PATCH',
      body: { delivered_at: new Date().toISOString() },
      prefer: 'return=minimal',
    })

    return res.status(200).json({ ok: true })
  } catch (error) {
    const clientErrors = new Set(['BODY_TOO_LARGE', 'INVALID_SUBMISSION', 'INVALID_NAME', 'INVALID_EMAIL', 'PRIVACY_REQUIRED', 'REQUIRED_ANSWERS'])
    const status = clientErrors.has(error.message) || error instanceof SyntaxError ? 400 : 500
    console.error('Workbook submission failed:', error.message)
    return res.status(status).json({ ok: false, error: status === 400 ? 'INVALID_REQUEST' : 'DELIVERY_FAILED' })
  }
}
