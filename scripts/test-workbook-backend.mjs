import fs from 'node:fs'
import path from 'node:path'
import handler from '../api/workbook-submit.js'
import { workbookQuestions } from '../src/workbookQuestions.js'

process.env.SUPABASE_URL = 'https://example.supabase.co'
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-key'
process.env.RESEND_API_KEY = 're_test'
process.env.WORKBOOK_FROM_EMAIL = 'Gabriele Ciandrini <workbook@example.com>'
process.env.WORKBOOK_OWNER_EMAIL = 'ciandrini.gabriele@gmail.com'

const calls = []
const originalFetch = global.fetch
global.fetch = async (url, options = {}) => {
  calls.push({ url: String(url), options })
  return { ok: true, status: 200, json: async () => ({ id: `test-${calls.length}` }) }
}

const request = {
  method: 'POST',
  headers: { 'user-agent': 'Codex workbook test' },
  body: {
    submissionId: 'de305d54-75b4-431b-adb2-eb6b9e546014',
    name: 'Gabriele Prova',
    email: 'test@example.com',
    privacyAccepted: true,
    company: '',
    answers: Object.fromEntries(workbookQuestions.map(({ id, question }, index) => [id, `Risposta dimostrativa ${index + 1}: ${question}`])),
    tracking: { source: 'test', medium: 'local', campaign: 'workbook' },
    referrer: 'http://127.0.0.1:4173/cambia-direzione/',
    landingPath: '/cambia-direzione/',
  },
}

let statusCode = 200
let responseBody
const response = {
  setHeader() {},
  status(code) { statusCode = code; return this },
  json(body) { responseBody = body; return body },
}

try {
  await handler(request, response)
} finally {
  global.fetch = originalFetch
}

if (statusCode !== 200 || !responseBody?.ok) throw new Error(`Risposta API non valida: ${statusCode} ${JSON.stringify(responseBody)}`)
const resendCalls = calls.filter(({ url }) => url === 'https://api.resend.com/emails')
const supabaseCalls = calls.filter(({ url }) => url.includes('.supabase.co/rest/v1/workbook_responses'))
if (resendCalls.length !== 2) throw new Error(`E-mail attese: 2, trovate: ${resendCalls.length}`)
if (supabaseCalls.length !== 2) throw new Error(`Operazioni Supabase attese: 2, trovate: ${supabaseCalls.length}`)
if (new Set(resendCalls.map(({ options }) => options.headers['Idempotency-Key'])).size !== 2) throw new Error('Chiavi anti-duplicazione e-mail mancanti o non univoche')

const participantEmail = JSON.parse(resendCalls[0].options.body)
const attachment = participantEmail.attachments?.[0]
if (!attachment?.content) throw new Error('Allegato PDF mancante')
const pdf = Buffer.from(attachment.content, 'base64')
if (!pdf.subarray(0, 5).equals(Buffer.from('%PDF-'))) throw new Error('Allegato PDF non valido')

const outputDir = path.join(process.cwd(), 'output', 'pdf')
fs.mkdirSync(outputDir, { recursive: true })
const outputFile = path.join(outputDir, 'workbook-online-esempio.pdf')
fs.writeFileSync(outputFile, pdf)
console.log(`Workbook backend test passed: 1 database insert, 2 e-mail, 1 delivery update, PDF ${pdf.length} bytes.`)
console.log(outputFile)
