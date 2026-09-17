import { buildWorkbookPdf } from './lib/workbook-pdf.js'
import { professionalWheel, sessionQuestions, sessionSections } from '../src/sessionWorkbookData.js'

const OWNER_EMAIL = 'ciandrini.gabriele@gmail.com'
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ALLOWED_ORIGIN = /^https:\/\/(?:www\.)?gabrieleciandrini\.com$|^https:\/\/[a-z0-9-]+\.vercel\.app$|^http:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?$/i
const clean = (value, max) => String(value || '').trim().slice(0, max)
const escapeHtml = (value) => clean(value, 10_000).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')
const hexRgb = (hex) => [1, 3, 5].map((offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255)

const parseBody = (req) => typeof req.body === 'object' && req.body ? req.body : JSON.parse(req.body || '{}')
const normalizeAnswers = (raw) => Object.fromEntries(sessionQuestions.map(({ id }) => [id, clean(raw?.[id], 2500)]))
const normalizeWheel = (raw) => Object.fromEntries(professionalWheel.map(({ id }) => { const value = clean(raw?.[id], 2); return [id, /^(?:10|[0-9])$/.test(value) ? value : ''] }))
const responseSections = (answers) => sessionSections.map((section) => ({ ...section, answers: section.answers.map((item) => ({ question: item.text, answer: answers[item.id] })), color: hexRgb(section.color) }))
const wheelForPdf = (wheel) => professionalWheel.map((item) => ({ ...item, value: wheel[item.id], color: hexRgb(item.color) }))
const answerHtml = (answers, wheel) => `${sessionQuestions.map((item, index) => `<div style="margin:0 0 10px;padding:15px;border-left:4px solid ${item.color};background:#f5f3ec"><p style="margin:0 0 7px;font:700 14px/1.4 Arial">${index + 1}. ${escapeHtml(item.text)}</p><p style="margin:0;color:#535d59;font:400 14px/1.6 Arial;white-space:pre-wrap">${escapeHtml(answers[item.id] || 'Non compilata')}</p></div>`).join('')}<h2 style="margin:28px 0 12px;font:700 23px Arial">Ruota professionale</h2>${professionalWheel.map((item) => `<p style="margin:5px 0;font:400 14px Arial">${escapeHtml(item.label)}: <strong>${wheel[item.id] === '' ? 'Non compilata' : `${wheel[item.id]} / 10`}</strong></p>`).join('')}`
const shell = ({ eyebrow, title, intro, content = '', ctas = '' }) => `<!doctype html><html><body style="margin:0;background:#eef0ea;padding:24px 10px"><main style="max-width:680px;margin:auto;overflow:hidden;border-radius:20px;background:#fff"><header style="padding:34px;background:#101716;color:#fff"><p style="margin:0 0 18px;color:#cbff45;font:700 10px Arial;letter-spacing:1.5px">${eyebrow}</p><h1 style="margin:0;font:700 32px/1.1 Arial">${title}</h1></header><div style="padding:30px"><p style="margin:0 0 24px;color:#4d5753;font:400 16px/1.65 Arial">${intro}</p>${content}${ctas}</div><footer style="padding:20px 30px;border-top:1px solid #ecece8;color:#7a837f;font:400 11px/1.5 Arial">Gabriele Ciandrini · Respira. Immagina. Agisci.<br>Questa e-mail serve soltanto a consegnare il riepilogo richiesto.</footer></main></body></html>`
const resend = async ({ apiKey, from, to, subject, html, attachment, key }) => { const response = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', 'Idempotency-Key': key }, body: JSON.stringify({ from, to: [to], subject, html, attachments: [{ filename: 'paure-limiti-vincoli.pdf', content: attachment }] }) }); if (!response.ok) throw new Error(`RESEND_${response.status}`) }
const supabase = async ({ url, key, path, method = 'POST', body, prefer }) => { const response = await fetch(`${url.replace(/\/$/, '')}/rest/v1/${path}`, { method, headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', ...(prefer ? { Prefer: prefer } : {}) }, body: JSON.stringify(body) }); if (!response.ok) throw new Error(`SUPABASE_${response.status}`) }

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'POST') return res.status(405).json({ ok: false })
  if (req.headers.origin && !ALLOWED_ORIGIN.test(req.headers.origin)) return res.status(403).json({ ok: false })
  try {
    const body = parseBody(req)
    if (clean(body.company, 100)) return res.status(200).json({ ok: true })
    const submissionId = clean(body.submissionId, 50); const name = clean(body.name, 100); const email = clean(body.email, 200).toLowerCase()
    if (!UUID_PATTERN.test(submissionId) || name.length < 2 || !EMAIL_PATTERN.test(email) || !body.privacyAccepted) return res.status(400).json({ ok: false })
    const answers = normalizeAnswers(body.answers); const wheel = normalizeWheel(body.wheel)
    const url = process.env.SUPABASE_URL; const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY; const resendKey = process.env.RESEND_API_KEY; const from = process.env.WORKBOOK_FROM_EMAIL
    if (!url || !key || !resendKey || !from) return res.status(503).json({ ok: false })
    const submittedAt = new Intl.DateTimeFormat('it-IT', { dateStyle: 'long', timeZone: 'Europe/Rome' }).format(new Date())
    const pdf = buildWorkbookPdf({ name, email, submittedAt, sections: responseSections(answers), wheel: wheelForPdf(wheel), title: ['Prima di', 'cambiare'], subtitle: 'Paure, limiti mentali e vincoli reali', nextUrl: 'gabrieleciandrini.com/proposta-percorso/' }).toString('base64')
    await supabase({ url, key, path: 'workbook_responses?on_conflict=id', body: { id: submissionId, name, email, answers: { ...answers, professionalWheel: wheel, workbookType: 'paure-limiti-vincoli' }, privacy_accepted_at: new Date().toISOString(), landing_path: '/workbook-paure-limiti-vincoli/', user_agent: clean(req.headers['user-agent'], 500) }, prefer: 'resolution=ignore-duplicates,return=minimal' })
    const ctas = '<p style="margin:28px 0 10px"><a href="https://gabrieleciandrini.com/proposta-percorso/" style="display:inline-block;padding:14px 20px;border-radius:999px;background:#cbff45;color:#101716;text-decoration:none;font:700 14px Arial">Scopri il percorso →</a></p><p><a href="https://gabrieleciandrini.com/metodo-respira-immagina-agisci/" style="color:#5143b8;font:700 13px Arial">Conosci il metodo Respira. Immagina. Agisci.</a></p>'
    await Promise.all([
      resend({ apiKey: resendKey, from, to: email, subject: 'Il tuo riepilogo: paure, limiti e vincoli', html: shell({ eyebrow: 'IL TUO RIEPILOGO PERSONALE', title: `${escapeHtml(name.split(' ')[0])}, la tua fotografia è pronta.`, intro: 'In allegato trovi le risposte e la ruota professionale costruite durante il colloquio. Rileggile con calma: servono a distinguere ciò che temi da ciò che devi realmente proteggere.', ctas }), attachment: pdf, key: `session-workbook-${submissionId}-participant` }),
      resend({ apiKey: resendKey, from, to: process.env.WORKBOOK_OWNER_EMAIL || OWNER_EMAIL, subject: `Workbook colloquio - ${name}`, html: shell({ eyebrow: 'WORKBOOK DEL COLLOQUIO', title: `${escapeHtml(name)} ha inviato il riepilogo.`, intro: `E-mail: <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>`, content: answerHtml(answers, wheel) }), attachment: pdf, key: `session-workbook-${submissionId}-owner` }),
    ])
    await supabase({ url, key, path: `workbook_responses?id=eq.${submissionId}`, method: 'PATCH', body: { delivered_at: new Date().toISOString() }, prefer: 'return=minimal' })
    return res.status(200).json({ ok: true })
  } catch (error) { console.error('Session workbook failed:', error.message); return res.status(500).json({ ok: false }) }
}
