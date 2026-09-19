import { buildWorkbookPdf } from './lib/workbook-pdf.js'
import { desireQuestions, ecologyQuestions, goalQuestions, solidityQuestions, valueColors } from '../src/valuesGoalData.js'

const OWNER_EMAIL = 'ciandrini.gabriele@gmail.com'
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ALLOWED_ORIGIN = /^https:\/\/(?:www\.)?gabrieleciandrini\.com$|^https:\/\/[a-z0-9-]+\.vercel\.app$|^http:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?$/i
const clean = (value, max = 3000) => String(value ?? '').trim().slice(0, max)
const escapeHtml = (value) => clean(value, 20_000).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')
const parseBody = (req) => typeof req.body === 'object' && req.body ? req.body : JSON.parse(req.body || '{}')
const hexRgb = (hex) => [1, 3, 5].map((offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255)
const normalizeMap = (raw, fields, max = 3000) => Object.fromEntries(fields.map(([field]) => [field, clean(raw?.[field], max)]))
const clampScore = (value, fallback = '') => { const number = Number(value); return Number.isFinite(number) && number >= 0 && number <= 10 ? number : fallback }
const answer = (question, value) => ({ question, answer: clean(value) || 'Non compilata' })
const chain = (value) => [value.source, value.final].filter(Boolean).join(' → ')

const resend = async ({ apiKey, from, to, subject, html, attachment, key }) => {
  const response = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', 'Idempotency-Key': key }, body: JSON.stringify({ from, to: [to], subject, html, attachments: [{ filename: 'bussola-valori-obiettivo.pdf', content: attachment }] }) })
  if (!response.ok) throw new Error(`RESEND_${response.status}`)
}
const supabase = async ({ url, key, path, method = 'POST', body, prefer }) => {
  const response = await fetch(`${url.replace(/\/$/, '')}/rest/v1/${path}`, { method, headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', ...(prefer ? { Prefer: prefer } : {}) }, body: JSON.stringify(body) })
  if (!response.ok) throw new Error(`SUPABASE_${response.status}`)
}
const shell = ({ eyebrow, title, intro, content = '' }) => `<!doctype html><html><body style="margin:0;background:#07100e;padding:24px 10px"><main style="max-width:680px;margin:auto;overflow:hidden;border-radius:20px;background:#fff"><header style="padding:34px;background:#101716;color:#fff;border-bottom:5px solid #cbff45"><p style="margin:0 0 18px;color:#cbff45;font:700 10px Arial;letter-spacing:1.5px">${eyebrow}</p><h1 style="margin:0;font:700 32px/1.1 Arial">${title}</h1></header><div style="padding:30px"><p style="margin:0 0 24px;color:#4d5753;font:400 16px/1.65 Arial">${intro}</p>${content}</div><footer style="padding:20px 30px;border-top:1px solid #ecece8;color:#7a837f;font:400 11px/1.5 Arial">Gabriele Ciandrini · Respira. Immagina. Agisci.<br>Questa e-mail serve soltanto a consegnare il riepilogo richiesto.</footer></main></body></html>`

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'POST') return res.status(405).json({ ok: false })
  if (req.headers.origin && !ALLOWED_ORIGIN.test(req.headers.origin)) return res.status(403).json({ ok: false })
  try {
    const body = parseBody(req)
    if (clean(body.company, 100)) return res.status(200).json({ ok: true })
    const submissionId = clean(body.submissionId, 50); const name = clean(body.name, 100); const email = clean(body.email, 200).toLowerCase()
    if (!UUID_PATTERN.test(submissionId) || name.length < 2 || !EMAIL_PATTERN.test(email) || !body.privacyAccepted) return res.status(400).json({ ok: false })
    const values = Array.from({ length: 7 }, (_, index) => { const raw = body.values?.[index] || {}; return { source: clean(raw.source, 300), meaning: '', allows: '', deeper: '', final: clean(raw.final, 300), importance: clampScore(raw.importance), presence: '', workPresence: '', color: valueColors[index] } })
    const filledIndices = values.map((value, index) => value.source ? index : -1).filter((index) => index >= 0)
    const requestedOrder = Array.isArray(body.order) ? body.order.map(Number).filter((index) => filledIndices.includes(index)) : []
    const order = [...new Set([...requestedOrder, ...filledIndices])]
    const desire = normalizeMap(body.desire, desireQuestions); const ecology = normalizeMap(body.ecology, ecologyQuestions); const goal = normalizeMap(body.goal, goalQuestions)
    const conditions = { must: clean(body.conditions?.must), negotiable: clean(body.conditions?.negotiable), refuse: clean(body.conditions?.refuse), verify: clean(body.conditions?.verify) }
    const compatibility = Object.fromEntries(values.map((_, index) => [index, { status: clean(body.compatibility?.[index]?.status, 100), note: clean(body.compatibility?.[index]?.note) }]))
    const solidity = Object.fromEntries(solidityQuestions.map(([field]) => [field, clampScore(body.solidity?.[field])]))
    const improve = Object.fromEntries(solidityQuestions.map(([field]) => [field, clean(body.improve?.[field])]))
    const orderedValues = order.map((index) => values[index]).filter((value) => value?.source)
    const sections = [
      { number: '01', label: 'Radici', title: 'Dai punti di partenza ai valori-fine', color: hexRgb('#cbff45'), answers: orderedValues.map((value, index) => answer(`${index + 1}. Valore iniziale → valore-fine`, chain(value))) },
      { number: '02', label: 'Gerarchia', title: 'Ciò che vuoi proteggere', color: hexRgb('#ffb24a'), answers: orderedValues.map((value, index) => answer(`${index + 1}. ${value.final || value.source || 'Valore aperto'}`, `Importanza ${value.importance}/10`)) },
      { number: '03', label: 'Desiderio', title: 'La vita professionale desiderata', color: hexRgb('#ff735c'), answers: desireQuestions.map(([field, question]) => answer(question, desire[field])) },
      { number: '04', label: 'Bussola', title: 'Confronto tra progetto e valori', color: hexRgb('#55d9d1'), answers: orderedValues.map((value) => { const originalIndex = values.indexOf(value); const result = compatibility[originalIndex]; return answer(value.final || value.source || 'Valore', `${result.status || 'Da verificare'}${result.note ? ` · ${result.note}` : ''}`) }) },
      { number: '05', label: 'Condizioni', title: 'La bussola professionale', color: hexRgb('#b6a7ff'), answers: [answer('Deve esserci', conditions.must), answer('Può essere negoziato', conditions.negotiable), answer('Non sono disposto ad accettarlo', conditions.refuse), answer('Devo ancora verificarlo', conditions.verify)] },
      { number: '06', label: 'Ecologia', title: 'Conseguenze e sostenibilità', color: hexRgb('#cbff45'), answers: ecologyQuestions.map(([field, question]) => answer(question, ecology[field])) },
      { number: '07', label: 'Obiettivo', title: 'L’obiettivo ben formato', color: hexRgb('#ff735c'), answers: goalQuestions.map(([field, question]) => answer(question, goal[field])) },
      { number: '08', label: 'Solidità', title: 'Quanto regge l’obiettivo', color: hexRgb('#ffb24a'), answers: solidityQuestions.flatMap(([field, question]) => [answer(question, solidity[field] === '' ? '' : `${solidity[field]}/10`), ...(Number(solidity[field]) < 8 && improve[field] ? [answer('Che cosa serve per arrivare almeno a 8?', improve[field])] : [])]) },
    ]
    const wheel = orderedValues.map((value) => ({ label: value.final || value.source || 'Valore', value: value.importance, color: hexRgb(value.color) }))
    const url = process.env.SUPABASE_URL; const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY; const resendKey = process.env.RESEND_API_KEY; const from = process.env.WORKBOOK_FROM_EMAIL
    if (!url || !key || !resendKey || !from) return res.status(503).json({ ok: false })
    const submittedAt = new Intl.DateTimeFormat('it-IT', { dateStyle: 'long', timeZone: 'Europe/Rome' }).format(new Date())
    const pdf = buildWorkbookPdf({ name, email, submittedAt, sections, wheel, title: ['La tua bussola', 'professionale'], subtitle: 'Valori, condizioni e obiettivo ben formato', nextUrl: 'gabrieleciandrini.com/proposta-percorso/' }).toString('base64')
    const stored = { values, order, desire, compatibility, conditions, ecology, goal, solidity, improve, workbookType: 'bussola-valori-obiettivo' }
    await supabase({ url, key, path: 'workbook_responses?on_conflict=id', body: { id: submissionId, name, email, answers: stored, privacy_accepted_at: new Date().toISOString(), landing_path: '/bussola-valori-obiettivo/', user_agent: clean(req.headers['user-agent'], 500) }, prefer: 'resolution=ignore-duplicates,return=minimal' })
    const valuesHtml = orderedValues.map((value, index) => `<p style="margin:6px 0;font:400 14px Arial"><strong>${index + 1}. ${escapeHtml(value.final || value.source || 'Valore aperto')}</strong> — importanza ${value.importance}/10</p>`).join('')
    await Promise.all([
      resend({ apiKey: resendKey, from, to: email, subject: 'La tua bussola dei valori e il tuo obiettivo', html: shell({ eyebrow: 'LA TUA BUSSOLA PROFESSIONALE', title: `${escapeHtml(name.split(' ')[0])}, il tuo riepilogo è pronto.`, intro: 'In allegato trovi le radici dei tuoi valori, la gerarchia, il confronto con il lavoro desiderato, le condizioni e il primo passo. Non è una diagnosi: è una mappa da rileggere con Gabriele.' }), attachment: pdf, key: `values-goal-${submissionId}-participant` }),
      resend({ apiKey: resendKey, from, to: process.env.WORKBOOK_OWNER_EMAIL || OWNER_EMAIL, subject: `Bussola valori e obiettivo - ${name}`, html: shell({ eyebrow: 'FASE IMMAGINA', title: `${escapeHtml(name)} ha inviato la bussola.`, intro: `E-mail: <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>`, content: `<h2 style="font:700 22px Arial">Gerarchia</h2>${valuesHtml}<h2 style="font:700 22px Arial">Obiettivo</h2><p style="font:400 14px/1.6 Arial">${escapeHtml(goal.positiveGoal || desire.desire || 'Non compilato')}</p><h2 style="font:700 22px Arial">Primo passo</h2><p style="font:400 14px/1.6 Arial">${escapeHtml(goal.firstStep || 'Non compilato')} · ${escapeHtml(goal.firstStepDate || 'data aperta')}</p>` }), attachment: pdf, key: `values-goal-${submissionId}-owner` }),
    ])
    await supabase({ url, key, path: `workbook_responses?id=eq.${submissionId}`, method: 'PATCH', body: { delivered_at: new Date().toISOString() }, prefer: 'return=minimal' })
    return res.status(200).json({ ok: true })
  } catch (error) { console.error('Values goal workbook failed:', error.message); return res.status(500).json({ ok: false }) }
}
