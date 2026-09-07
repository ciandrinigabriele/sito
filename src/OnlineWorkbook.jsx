import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowLeft, ArrowRight, Check, CheckCircle2, ChevronRight, Clock3, FileHeart,
  LockKeyhole, Mail, RotateCcw, Save, Send, ShieldCheck, Sparkles,
} from 'lucide-react'
import { LandingBrand, PRIVACY_URL, THANK_YOU_URL, useLandingMeta } from './LandingPage'
import { requiredQuestionIds, workbookQuestions, workbookSections } from './workbookQuestions'
import './workbook.css'

const STORAGE_KEY = 'ria-workbook-state-v1'
const TOTAL_STEPS = workbookSections.length + 2

const emptyState = () => ({
  version: 1,
  submissionId: crypto.randomUUID(),
  name: '',
  email: '',
  privacyAccepted: false,
  company: '',
  answers: Object.fromEntries(workbookQuestions.map(({ id }) => [id, ''])),
  currentStep: 0,
})

const loadState = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (saved?.version === 1 && saved.submissionId && saved.answers) return { ...emptyState(), ...saved }
  } catch {
    // An unreadable local draft is ignored safely.
  }
  return emptyState()
}

const getTracking = () => {
  const params = new URLSearchParams(window.location.search)
  return {
    source: params.get('utm_source') || '',
    medium: params.get('utm_medium') || '',
    campaign: params.get('utm_campaign') || '',
    content: params.get('utm_content') || '',
    term: params.get('utm_term') || '',
  }
}

const firstName = (name) => name.trim().split(/\s+/)[0] || ''

function ProgressRail({ currentStep }) {
  return (
    <aside className="workbookRail" aria-label="Avanzamento del workbook">
      <div className="workbookRailTop">
        <span className="workbookRailLabel">IL TUO PERCORSO</span>
        <strong>{String(Math.min(currentStep + 1, TOTAL_STEPS)).padStart(2, '0')} / {String(TOTAL_STEPS).padStart(2, '0')}</strong>
      </div>
      <div className="workbookRailTrack"><i style={{ height: `${(currentStep / (TOTAL_STEPS - 1)) * 100}%` }} /></div>
      <ol>
        <li className={currentStep === 0 ? 'isActive' : currentStep > 0 ? 'isDone' : ''}>
          <span>{currentStep > 0 ? <Check size={13} /> : '00'}</span><div><small>INIZIO</small><strong>Il tuo spazio</strong></div>
        </li>
        {workbookSections.map((section, index) => {
          const step = index + 1
          const className = currentStep === step ? 'isActive' : currentStep > step ? 'isDone' : ''
          return <li className={className} key={section.id}><span>{currentStep > step ? <Check size={13} /> : section.number}</span><div><small>{section.label}</small><strong>{section.title}</strong></div></li>
        })}
        <li className={currentStep === TOTAL_STEPS - 1 ? 'isActive' : ''}><span>06</span><div><small>RILETTURA</small><strong>La tua fotografia</strong></div></li>
      </ol>
      <p><Save size={14} /> Le risposte restano salvate solo su questo dispositivo finché non le invii.</p>
    </aside>
  )
}

function IntroStep({ state, update, onContinue, errors }) {
  return (
    <section className="workbookIntro workbookStepPanel">
      <p className="workbookKicker"><span>PRIMA DI INIZIARE</span> 15–20 minuti tutti per te</p>
      <h1>Non cercare la risposta giusta.<br /><em>Cerca quella vera.</em></h1>
      <p className="workbookLead">Questo percorso non ti assegna un’etichetta e non decide al posto tuo. Ti accompagna in 20 domande per rendere visibile la situazione professionale che stai vivendo oggi.</p>
      <div className="workbookPromiseGrid">
        <article><Clock3 /><strong>Procedi con calma</strong><span>5 sezioni brevi, una alla volta.</span></article>
        <article><FileHeart /><strong>Ricevi la tua copia</strong><span>Al termine avrai il riepilogo personale via e-mail.</span></article>
        <article><ShieldCheck /><strong>Nessuna newsletter</strong><span>I dati servono solo per questo workbook.</span></article>
      </div>
      <div className="workbookIdentityCard">
        <div className="workbookIdentityHead"><span><LockKeyhole /></span><div><small>IL TUO SPAZIO PERSONALE</small><h2>Dove vuoi ricevere le risposte?</h2></div></div>
        <div className="workbookFields">
          <label><span>Il tuo nome</span><input value={state.name} onChange={(event) => update('name', event.target.value)} autoComplete="name" maxLength="100" placeholder="Come ti chiami?" aria-invalid={Boolean(errors.name)} />{errors.name && <small className="workbookError">{errors.name}</small>}</label>
          <label><span>La tua e-mail</span><input value={state.email} onChange={(event) => update('email', event.target.value)} type="email" inputMode="email" autoComplete="email" maxLength="200" placeholder="nome@email.it" aria-invalid={Boolean(errors.email)} />{errors.email && <small className="workbookError">{errors.email}</small>}</label>
          <label className="workbookHoneypot" aria-hidden="true"><span>Azienda</span><input value={state.company} onChange={(event) => update('company', event.target.value)} tabIndex="-1" autoComplete="off" /></label>
        </div>
        <label className="workbookPrivacy"><input checked={state.privacyAccepted} onChange={(event) => update('privacyAccepted', event.target.checked)} type="checkbox" /><span>Ho letto la <a href={PRIVACY_URL} target="_blank" rel="noreferrer">Privacy Policy</a> e chiedo di ricevere via e-mail il riepilogo delle mie risposte. Non inserirò dati sanitari o particolarmente delicati.</span></label>
        {errors.privacy && <small className="workbookError workbookPrivacyError">{errors.privacy}</small>}
      </div>
      <button className="workbookPrimary" type="button" onClick={onContinue}>Inizia la fotografia <ArrowRight /></button>
      <p className="workbookMicrocopy"><LockKeyhole size={13} /> Puoi interrompere e riprendere da questo dispositivo.</p>
    </section>
  )
}

function QuestionStep({ section, answers, updateAnswer, errors }) {
  return (
    <section className="workbookQuestions workbookStepPanel" style={{ '--section-color': section.color }}>
      <div className="workbookSectionHeading">
        <span className="workbookSectionNumber">{section.number}</span>
        <div><p>{section.label}</p><h1>{section.title}</h1><span>{section.prompt}</span></div>
      </div>
      <div className="workbookQuestionList">
        {section.questions.map((question, index) => {
          const id = `${section.id}-${index + 1}`
          const answer = answers[id] || ''
          const required = requiredQuestionIds.has(id)
          return (
            <label className="workbookQuestion" key={id}>
              <span className="workbookQuestionIndex">{section.number}.{index + 1}</span>
              <span className="workbookQuestionText">{question} {required && <i>necessaria</i>}</span>
              <textarea value={answer} onChange={(event) => updateAnswer(id, event.target.value)} maxLength="2500" rows="4" placeholder="Scrivi qui, con parole tue…" aria-invalid={Boolean(errors[id])} />
              <span className="workbookQuestionMeta">{errors[id] ? <b>{errors[id]}</b> : 'Non serve scrivere molto: serve essere concreto.'}<small>{answer.length} / 2500</small></span>
            </label>
          )
        })}
      </div>
    </section>
  )
}

function ReviewStep({ state, onEdit, onSubmit, sending, error }) {
  const completed = workbookQuestions.filter(({ id }) => (state.answers[id] || '').trim()).length
  return (
    <section className="workbookReview workbookStepPanel">
      <p className="workbookKicker"><span>LA TUA FOTOGRAFIA</span> {completed} risposte su 20</p>
      <h1>{firstName(state.name)}, fermati un momento.<br /><em>Guarda ciò che hai reso visibile.</em></h1>
      <p className="workbookLead">Puoi rileggere o correggere ogni sezione. Quando invii, riceverai via e-mail un PDF personale con le tue risposte e anche Gabriele ne riceverà una copia per poterne parlare con te, se lo vorrai.</p>
      <div className="workbookReviewSections">
        {workbookSections.map((section, sectionIndex) => {
          const sectionAnswers = section.questions.map((_, index) => state.answers[`${section.id}-${index + 1}`]).filter((answer) => answer?.trim()).length
          return (
            <button type="button" key={section.id} onClick={() => onEdit(sectionIndex + 1)}>
              <span style={{ background: section.color }}>{section.number}</span><div><small>{section.label}</small><strong>{section.title}</strong><em>{sectionAnswers} di 4 risposte</em></div><ChevronRight />
            </button>
          )
        })}
      </div>
      <div className="workbookSendCard">
        <span className="workbookSendIcon"><Mail /></span>
        <div><small>CONSEGNA PERSONALE</small><h2>Il riepilogo arriverà a {state.email}</h2><p>Nessuna iscrizione automatica e nessun risultato generato da un algoritmo: riceverai soltanto la fotografia delle parole che hai scritto.</p></div>
        <button className="workbookPrimary" type="button" onClick={onSubmit} disabled={sending}>{sending ? 'Preparazione in corso…' : 'Invia e ricevi il riepilogo'} {sending ? <Sparkles /> : <Send />}</button>
      </div>
      {error && <p className="workbookSubmitError" role="alert">{error}</p>}
    </section>
  )
}

export function OnlineWorkbookPage() {
  const [state, setState] = useState(loadState)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const mainRef = useRef(null)
  const tracking = useMemo(getTracking, [])
  const currentStep = Math.min(Math.max(state.currentStep, 0), TOTAL_STEPS - 1)

  useLandingMeta({
    title: 'Workbook online: dove sei adesso? | Gabriele Ciandrini',
    description: 'Compila il workbook guidato per fotografare la tua situazione professionale attuale e ricevere il riepilogo personale delle tue risposte.',
    robots: 'noindex, follow',
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, currentStep }))
  }, [currentStep, state])

  const update = (key, value) => setState((previous) => ({ ...previous, [key]: value }))
  const updateAnswer = (id, value) => setState((previous) => ({ ...previous, answers: { ...previous.answers, [id]: value } }))
  const goTo = (step) => {
    setErrors({})
    setState((previous) => ({ ...previous, currentStep: step }))
    requestAnimationFrame(() => mainRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  const validateStep = () => {
    const nextErrors = {}
    if (currentStep === 0) {
      if (state.name.trim().length < 2) nextErrors.name = 'Scrivi almeno due caratteri.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim())) nextErrors.email = 'Inserisci un indirizzo e-mail valido.'
      if (!state.privacyAccepted) nextErrors.privacy = 'Conferma di aver letto l’informativa per continuare.'
    } else if (currentStep <= workbookSections.length) {
      const section = workbookSections[currentStep - 1]
      section.questions.forEach((_, index) => {
        const id = `${section.id}-${index + 1}`
        if (requiredQuestionIds.has(id) && (state.answers[id] || '').trim().length < 2) nextErrors[id] = 'Questa risposta serve per completare la fotografia.'
      })
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const continueStep = () => {
    if (validateStep()) goTo(Math.min(currentStep + 1, TOTAL_STEPS - 1))
  }

  const submit = async () => {
    const missing = [...requiredQuestionIds].filter((id) => (state.answers[id] || '').trim().length < 2)
    if (missing.length) {
      const firstMissing = workbookQuestions.find((item) => item.id === missing[0])
      const sectionIndex = workbookSections.findIndex((section) => section.id === firstMissing.sectionId)
      goTo(sectionIndex + 1)
      setErrors(Object.fromEntries(missing.map((id) => [id, 'Questa risposta serve per completare la fotografia.'])))
      return
    }

    setSending(true)
    setErrors({})
    const isDemo = ['localhost', '127.0.0.1'].includes(window.location.hostname)
    try {
      if (!isDemo) {
        const response = await fetch('/api/workbook-submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            submissionId: state.submissionId,
            name: state.name.trim(),
            email: state.email.trim().toLowerCase(),
            privacyAccepted: state.privacyAccepted,
            company: state.company,
            answers: state.answers,
            tracking,
            referrer: document.referrer.slice(0, 500),
            landingPath: '/cambia-direzione/',
          }),
        })
        if (!response.ok) throw new Error('DELIVERY_FAILED')
      }

      sessionStorage.setItem('ria-workbook-completed', JSON.stringify({ name: state.name, email: state.email, answers: state.answers, demo: isDemo }))
      localStorage.removeItem(STORAGE_KEY)
      const next = new URL(THANK_YOU_URL, window.location.origin)
      next.searchParams.set('nome', firstName(state.name))
      next.searchParams.set('accesso', '1')
      if (isDemo) next.searchParams.set('demo', '1')
      window.location.assign(next.href)
    } catch {
      setSending(false)
      setErrors({ submit: 'Non siamo riusciti a inviare il riepilogo. Le risposte sono ancora salvate su questo dispositivo: riprova tra poco oppure scrivi a Gabriele.' })
    }
  }

  const reset = () => {
    if (!window.confirm('Vuoi cancellare tutte le risposte salvate su questo dispositivo e ricominciare?')) return
    localStorage.removeItem(STORAGE_KEY)
    setState(emptyState())
    setErrors({})
  }

  const activeSection = currentStep > 0 && currentStep <= workbookSections.length ? workbookSections[currentStep - 1] : null

  return (
    <div className="onlineWorkbook" style={{ '--active-color': activeSection?.color || '#cbff45' }}>
      <header className="workbookHeader"><LandingBrand inverse /><div><button type="button" onClick={reset}><RotateCcw /> Ricomincia</button><a href="/cambia-direzione/">Esci dal workbook</a></div></header>
      <div className="workbookProgressMobile" aria-hidden="true"><span style={{ width: `${(currentStep / (TOTAL_STEPS - 1)) * 100}%` }} /><small>{currentStep === 0 ? 'INIZIO' : currentStep <= workbookSections.length ? `${workbookSections[currentStep - 1].number} / ${workbookSections[currentStep - 1].label}` : 'RILETTURA'}</small></div>
      <div className="workbookShell">
        <ProgressRail currentStep={currentStep} />
        <main ref={mainRef}>
          <form onSubmit={(event) => event.preventDefault()}>
            {currentStep === 0 && <IntroStep state={state} update={update} onContinue={continueStep} errors={errors} />}
            {activeSection && <QuestionStep section={activeSection} answers={state.answers} updateAnswer={updateAnswer} errors={errors} />}
            {currentStep === TOTAL_STEPS - 1 && <ReviewStep state={state} onEdit={goTo} onSubmit={submit} sending={sending} error={errors.submit} />}
            {currentStep > 0 && currentStep < TOTAL_STEPS - 1 && (
              <nav className="workbookNavigation" aria-label="Navigazione tra le sezioni">
                <button type="button" onClick={() => goTo(currentStep - 1)}><ArrowLeft /> Indietro</button>
                <div><span><CheckCircle2 /> Salvataggio automatico</span><button className="workbookPrimary" type="button" onClick={continueStep}>{currentStep === workbookSections.length ? 'Rileggi la tua fotografia' : 'Continua'} <ArrowRight /></button></div>
              </nav>
            )}
            {currentStep === TOTAL_STEPS - 1 && <nav className="workbookNavigation"><button type="button" onClick={() => goTo(workbookSections.length)}><ArrowLeft /> Torna alle domande</button></nav>}
          </form>
        </main>
      </div>
      <footer className="workbookFooter"><span>Respira. Immagina. Agisci.</span><div><a href={PRIVACY_URL}>Privacy Policy</a><a href="/cookie-policy/">Cookie Policy</a></div></footer>
    </div>
  )
}
