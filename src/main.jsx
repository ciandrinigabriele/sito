import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { ArrowRight, Check, Compass, Menu, Quote, Sparkles, Target, X } from 'lucide-react'
import { supabase } from './supabase'
import './styles.css'

const steps = [
  { icon: Compass, number: '01', title: 'Fai chiarezza', text: 'Metti a fuoco ciò che vuoi davvero, oltre le aspettative e le abitudini.' },
  { icon: Target, number: '02', title: 'Scegli la direzione', text: 'Trasforma possibilità confuse in una rotta personale e sostenibile.' },
  { icon: Sparkles, number: '03', title: 'Passa all’azione', text: 'Costruisci passi concreti, compatibili con la tua vita e i tuoi tempi.' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))
    setSending(true)
    setStatus('')

    if (!supabase) {
      setStatus('Il modulo sarà attivo appena collegheremo Supabase. Puoi intanto scrivere a info@gabrieleciandrini.com.')
      setSending(false)
      return
    }

    const { error } = await supabase.from('contact_requests').insert(data)
    setSending(false)
    if (error) {
      setStatus('Non è stato possibile inviare il messaggio. Riprova o contattami via email.')
      return
    }
    event.currentTarget.reset()
    setStatus('Grazie. Ho ricevuto il tuo messaggio e ti risponderò presto.')
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="nav">
        <a className="brand" href="#top" aria-label="Gabriele Ciandrini, home">
          <span>Gabriele</span> Ciandrini
        </a>
        <button className="menuButton" onClick={() => setMenuOpen(!menuOpen)} aria-label="Apri menu">
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={menuOpen ? 'links open' : 'links'} aria-label="Navigazione principale">
          <a href="#percorso" onClick={closeMenu}>Il percorso</a>
          <a href="#chi-sono" onClick={closeMenu}>Chi sono</a>
          <a href="#contatti" onClick={closeMenu}>Contatti</a>
          <a className="navCta" href="#contatti" onClick={closeMenu}>Parliamone <ArrowRight size={16} /></a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="heroCopy">
            <p className="eyebrow">Coaching per il cambiamento professionale</p>
            <h1>Il lavoro non deve essere il posto in cui <em>ti perdi.</em></h1>
            <p className="lead">Ti aiuto a ritrovare direzione, energia e coraggio per costruire un cambiamento che ti assomigli davvero.</p>
            <div className="heroActions">
              <a className="primary" href="#contatti">Prenota un primo incontro <ArrowRight size={18} /></a>
              <a className="textLink" href="#percorso">Scopri come lavoreremo</a>
            </div>
            <div className="trust">
              <span><Check size={16} /> Primo confronto conoscitivo</span>
              <span><Check size={16} /> Online e ad Ancona</span>
            </div>
          </div>
          <div className="heroVisual" aria-label="Uno spazio per ritrovare la propria direzione">
            <div className="sun" />
            <div className="path pathOne" />
            <div className="path pathTwo" />
            <p>Respira.<br /><strong>Immagina.</strong><br />Agisci.</p>
          </div>
        </section>

        <section className="manifesto">
          <p>Forse non ti manca la motivazione.</p>
          <h2>Forse hai solo bisogno di uno spazio in cui ascoltarti sul serio.</h2>
        </section>

        <section className="process" id="percorso">
          <div className="sectionIntro">
            <p className="eyebrow">Il percorso</p>
            <h2>Dal dubbio a una direzione concreta.</h2>
            <p>Non ti consegno risposte preconfezionate. Ti accompagno a costruire le tue, con metodo e senza salti nel vuoto.</p>
          </div>
          <div className="steps">
            {steps.map(({ icon: Icon, number, title, text }) => (
              <article className="step" key={number}>
                <span className="stepNumber">{number}</span>
                <Icon size={30} strokeWidth={1.5} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about" id="chi-sono">
          <div className="portrait">
            <span>GC</span>
          </div>
          <div className="aboutCopy">
            <p className="eyebrow">Chi sono</p>
            <h2>Sono Gabriele. Credo nei cambiamenti che partono da dentro e diventano passi reali.</h2>
            <p>Accompagno persone che sentono di poter vivere il lavoro con più senso, libertà e coerenza. Il mio approccio unisce ascolto, domande profonde e concretezza.</p>
            <blockquote>
              <Quote size={22} />
              <p>Non devi diventare qualcun altro. Devi creare le condizioni per tornare a essere te.</p>
            </blockquote>
          </div>
        </section>

        <section className="contact" id="contatti">
          <div>
            <p className="eyebrow">Iniziamo da qui</p>
            <h2>Raccontami dove sei.<br />Capiremo insieme dove vuoi andare.</h2>
            <p>Scrivimi poche righe. Il primo confronto serve a conoscerci e capire se questo percorso è quello giusto per te.</p>
          </div>
          <form onSubmit={submit}>
            <label>Nome<input name="name" required placeholder="Il tuo nome" /></label>
            <label>Email<input name="email" type="email" required placeholder="nome@email.it" /></label>
            <label>Il tuo momento<textarea name="message" required rows="4" placeholder="Cosa vorresti cambiare?" /></label>
            <button className="primary" type="submit" disabled={sending}>
              {sending ? 'Invio…' : 'Invia il messaggio'} <ArrowRight size={18} />
            </button>
            {status && <p className="formStatus" role="status">{status}</p>}
          </form>
        </section>
      </main>

      <footer>
        <a className="brand" href="#top"><span>Gabriele</span> Ciandrini</a>
        <p>Coaching per il cambiamento professionale · Ancona e online</p>
        <p>© {new Date().getFullYear()} Gabriele Ciandrini</p>
      </footer>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><App /></React.StrictMode>
)
