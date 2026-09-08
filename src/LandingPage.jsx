import React, { useEffect } from 'react'
import {
  ArrowDown, ArrowRight, BookOpen, Check, ChevronRight, Compass,
  FileText, MessageCircle, Play, ShieldCheck, Sparkles,
} from 'lucide-react'
import { WORKBOOK_PATH } from './workbookQuestions'
import './landing.css'

export const THANK_YOU_URL = '/grazie-per-il-workbook/'
const VIDEO_URL = '/media/video-landing-pause-naturali-v2.mp4'
export const WHATSAPP = 'https://wa.me/393497759350'
export const PRIVACY_URL = '/privacy-policy/'

const landingMeta = {
  title: 'Dove sei adesso? Fai chiarezza | Gabriele Ciandrini',
  description: 'Guarda il video e compila il workbook online per fotografare la tua situazione, riconoscere blocchi e convinzioni limitanti e scegliere il primo passo.',
}

export function useLandingMeta({ title, description, robots = null }) {
  useEffect(() => {
    document.title = title
    const canonical = `https://gabrieleciandrini.com${window.location.pathname}`
    const setMeta = (selector, key, value) => {
      let element = document.head.querySelector(selector)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(key[0], key[1])
        document.head.appendChild(element)
      }
      element.content = value
    }
    setMeta('meta[name="description"]', ['name', 'description'], description)
    if (robots) setMeta('meta[name="robots"]', ['name', 'robots'], robots)
    setMeta('meta[property="og:title"]', ['property', 'og:title'], title)
    setMeta('meta[property="og:description"]', ['property', 'og:description'], description)
    setMeta('meta[property="og:url"]', ['property', 'og:url'], canonical)
    setMeta('meta[property="og:image"]', ['property', 'og:image'], `${window.location.origin}/media/career-bridge-og.png`)
    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = canonical
  }, [description, robots, title])
}

export function LandingBrand({ inverse = false }) {
  return (
    <a className={`leadBrand ${inverse ? 'isInverse' : ''}`} href="/" aria-label="Gabriele Ciandrini, torna alla home">
      <span className="leadBrandMark"><i /><i /><i /></span>
      <span>Gabriele <strong>Ciandrini</strong><small>Respira. Immagina. Agisci.</small></span>
    </a>
  )
}

function VideoSection() {
  return (
    <section className="leadVideoSection" id="video">
      <div className="leadSectionIntro">
        <p className="leadEyebrow"><span>01</span> Prima guarda, poi scegli</p>
        <h2>Non ti serve più coraggio.<br /><em>Ti serve più chiarezza.</em></h2>
        <p>In questo breve video ti accompagno nel primo passo: fotografare con sincerità la tua situazione professionale attuale e capire se è arrivato il momento di costruire una nuova direzione.</p>
      </div>
      <div className="leadVideoGrid">
        <div className="leadVideoFrame">
          <span className="leadVideoBadge"><Play size={13} fill="currentColor" /> Mini sessione gratuita</span>
          <video
            src={VIDEO_URL}
            poster="/media/video-landing-finale-poster.jpg"
            controls
            playsInline
            preload="metadata"
          >
            Il tuo browser non supporta la riproduzione video.
          </video>
          <div className="leadVideoGlow" />
        </div>
        <aside className="leadVideoNotes">
          <p className="leadNotesLabel">NEL VIDEO</p>
          {[
            ['01', 'Perché ogni cambiamento serio parte dalla consapevolezza del punto in cui ti trovi.'],
            ['02', 'Come usare il workbook per osservare emozioni, energia, valori e ciò che oggi ti trattiene.'],
            ['03', 'Come richiedere un incontro conoscitivo gratuito, senza pressioni, se vuoi costruire il passo successivo.'],
          ].map(([number, text]) => (
            <article key={number}><span>{number}</span><p>{text}</p></article>
          ))}
          <a href="#workbook">Voglio fare chiarezza <ArrowDown size={17} /></a>
        </aside>
      </div>
    </section>
  )
}

export function LeadLandingPage() {
  useLandingMeta(landingMeta)
  return (
    <div className="leadLanding">
      <header className="leadHeader">
        <LandingBrand inverse />
        <a className="leadHeaderHelp" href={`${WHATSAPP}?text=${encodeURIComponent('Ciao Gabriele, ho visto la pagina sul cambiamento professionale e vorrei farti una domanda.')}`}>
          <MessageCircle size={17} /> Hai una domanda?
        </a>
      </header>

      <main>
        <section className="leadHero">
          <div className="leadHeroGrid" aria-hidden="true" />
          <div className="leadOrb leadOrbOne" aria-hidden="true" />
          <div className="leadOrb leadOrbTwo" aria-hidden="true" />
          <div className="leadHeroCopy">
            <p className="leadEyebrow"><span>START</span> Per chi sente che il lavoro non è più quello giusto</p>
            <h1><span>Non devi</span><span>mollare tutto.</span><em><span>Devi capire</span><span>dove andare.</span></em></h1>
            <p className="leadHeroText">Scopri come trasformare dubbi, paura e insoddisfazione in una direzione professionale concreta, sostenibile e adatta alla tua vita reale.</p>
            <div className="leadHeroActions">
              <a className="leadPrimary" href="#video">Guarda il video gratuito <Play size={17} fill="currentColor" /></a>
              <span><ShieldCheck size={17} /> Nessuna promessa facile. Un metodo concreto.</span>
            </div>
            <div className="leadHeroProof">
              <span><strong>2003</strong> lavoro individuale sulla persona</span>
              <span><strong>Ancona</strong> e online in tutta Italia</span>
              <span><strong>R · I · A</strong> un metodo, tre azioni</span>
            </div>
          </div>
          <div className="leadHeroVisual">
            <div className="leadPortraitCard">
              <img src="/media/gabriele-landing-editorial-v1.webp" alt="Gabriele Ciandrini, coach per il cambiamento professionale" fetchpriority="high" />
              <span className="leadPortraitLine" />
              <div className="leadPortraitCaption"><small>GABRIELE CIANDRINI</small><strong>Non insegno il cambiamento.<br />L’ho attraversato.</strong></div>
            </div>
            <div className="leadDiscoveryLinks">
              <span className="leadDiscoveryIntro">Vuoi sapere chi sta parlando?</span>
              <a className="leadStoryShortcut" href="/about-2/">
                <strong>Conosci la mia storia</strong>
                <ChevronRight size={18} />
              </a>
              <a className="leadBookShortcut" href="/libro-respira-immagina-agisci/">
                La storia completa è nel mio libro
                <strong>Respira. Immagina. Agisci.</strong>
                <ChevronRight size={15} />
              </a>
            </div>
            <div className="leadFloatingWord"><span>Respira.</span><span>Immagina.</span><strong>Agisci.</strong></div>
          </div>
        </section>

        <VideoSection />

        <section className="leadWorkbookSection" id="workbook">
          <div className="leadWorkbookPreview">
            <div className="leadWorkbookCard">
              <span>WORKBOOK<br />ONLINE</span>
              <h2>Dove sei<br />adesso?</h2>
              <p>La mappa del tuo punto di partenza per vedere con chiarezza ciò che oggi ti blocca.</p>
              <div><i /><i /><i /></div>
            </div>
            <div className="leadWorkbookPages" aria-hidden="true"><span /><span /></div>
          </div>
          <div className="leadWorkbookCopy">
            <p className="leadEyebrow dark"><span>02</span> Dalla riflessione all’azione</p>
            <h2>Non il solito ebook da leggere e dimenticare.</h2>
            <p>È un'autovalutazione da compilare. Ti aiuta a fotografare la fase che stai vivendo, riconoscere ciò che ti limita e trasformare la confusione in un primo passo concreto.</p>
            <ul>
              <li><Check size={18} /> Osserva lo stato attuale e i segnali che non vuoi più ignorare.</li>
              <li><Check size={18} /> Riconosci convinzioni limitanti, risorse e priorità reali.</li>
              <li><Check size={18} /> Scegli una prima verifica concreta da fare entro due settimane.</li>
            </ul>
          </div>
          <aside className="leadWorkbookAction">
            <span className="leadMiniIcon"><FileText size={18} /></span>
            <p>34 DOMANDE · 8 SEZIONI · 20–25 MINUTI</p>
            <h2>Apri il tuo spazio personale.</h2>
            <span>Compila il percorso direttamente online, interrompilo quando vuoi e ricevi via e-mail la fotografia completa delle tue risposte.</span>
            <a className="leadSubmit" href={WORKBOOK_PATH}>Inizia il workbook online <ArrowRight size={19} /></a>
            <small><ShieldCheck size={13} /> Nessuna etichetta, nessuna newsletter. Solo le tue parole.</small>
          </aside>
        </section>

        <section className="leadMethodSection">
          <p className="leadEyebrow dark"><span>03</span> Il metodo</p>
          <div className="leadMethodHeading">
            <h2>Tre azioni.<br />Una direzione.</h2>
            <p>Il cambiamento non parte dalle dimissioni. Parte da una sequenza capace di trasformare la confusione in una scelta verificabile.</p>
          </div>
          <div className="leadMethodSteps">
            <article><span>01</span><Compass /><h3>Respira.</h3><p>Fermati, riduci il rumore e osserva la situazione senza giudicarti.</p></article>
            <article><span>02</span><Sparkles /><h3>Immagina.</h3><p>Dai forma a possibilità coerenti con valori, capacità e vita reale.</p></article>
            <article><span>03</span><ArrowRight /><h3>Agisci.</h3><p>Trasforma la direzione in una prova concreta, piccola e sostenibile.</p></article>
          </div>
        </section>

        <section className="leadStorySection">
          <div className="leadStoryImage"><img src="/media/studio3.jpg" alt="Lo studio di Gabriele Ciandrini ad Ancona" loading="lazy" /></div>
          <div className="leadStoryCopy">
            <p className="leadEyebrow"><span>04</span> Esperienza vissuta</p>
            <h2>Ho cambiato lavoro più volte. Mai con un salto nel vuoto.</h2>
            <p>Impresa di famiglia, fabbrica, autobus, personal training, studio privato, coaching: ho usato la stabilità come ponte, studiato mentre lavoravo e preparato ogni passaggio.</p>
            <p>Oggi aiuto chi sente di essere bloccato a costruire una direzione professionale concreta, senza formule standard.</p>
            <a href="/about-2/">Conosci la mia storia <ChevronRight size={17} /></a>
          </div>
        </section>

        <section className="leadFaqSection">
          <div><p className="leadEyebrow dark"><span>05</span> Domande frequenti</p><h2>Prima di iniziare.</h2></div>
          <div className="leadFaqList">
            <details open><summary>Il workbook è davvero gratuito?<ChevronRight /></summary><p>Sì. Si compila direttamente online e al termine ricevi via e-mail la copia personale delle tue risposte.</p></details>
            <details><summary>Devo già sapere quale lavoro voglio fare?<ChevronRight /></summary><p>No. È pensato proprio per chi sente il bisogno di cambiare ma non ha ancora una direzione chiara.</p></details>
            <details><summary>Riceverò messaggi pubblicitari?<ChevronRight /></summary><p>No. I dati vengono usati per consegnare la risorsa e gestire un’eventuale richiesta. Non vieni iscritto automaticamente a una newsletter.</p></details>
            <details><summary>Posso parlare direttamente con Gabriele?<ChevronRight /></summary><p>Sì. Dopo la compilazione troverai il collegamento per richiedere un primo confronto conoscitivo.</p></details>
          </div>
        </section>

        <section className="leadFinalSection">
          <div className="leadFinalGlow" />
          <p className="leadEyebrow"><span>ORA</span> Il primo passo è piccolo</p>
          <h2>Non devi decidere tutto oggi.<br /><em>Devi iniziare a vedere più chiaro.</em></h2>
          <a className="leadPrimary" href={WORKBOOK_PATH}>Inizia il workbook online <ArrowRight size={18} /></a>
        </section>
      </main>

      <footer className="leadFooter">
        <LandingBrand inverse />
        <div><a href={PRIVACY_URL}>Privacy Policy</a><a href="/cookie-policy/">Cookie Policy</a><a href="/">Sito principale</a></div>
        <p>© {new Date().getFullYear()} Gabriele Ciandrini · P. IVA 02815060423</p>
      </footer>
    </div>
  )
}

export function LeadThankYouPage() {
  const params = new URLSearchParams(window.location.search)
  const firstName = (params.get('nome') || '').replace(/[^\p{L}' -]/gu, '').slice(0, 40)
  const hasAccess = params.get('accesso') === '1'
  const isDemo = params.get('demo') === '1'
  useLandingMeta({
    title: 'La tua fotografia è pronta | Gabriele Ciandrini',
    description: 'Ricevi il riepilogo personale del workbook e scegli il prossimo passo verso una direzione professionale più chiara e sostenibile.',
    robots: 'noindex, follow',
  })

  return (
    <div className="leadThankYou">
      <header><LandingBrand inverse /></header>
      <main>
        <div className="leadSuccessIcon"><Check /></div>
        {isDemo && <p className="leadDemoNotice">MODALITÀ DI PROVA · I DATI NON SONO STATI INVIATI</p>}
        <p className="leadEyebrow"><span>FATTO</span> La prima azione è compiuta</p>
        <h1>{firstName ? `${firstName}, la tua fotografia` : 'La tua fotografia'} è pronta.</h1>
        <p className="leadThankLead">{isDemo ? 'Hai completato l’intero percorso di prova. In questa anteprima locale nessun dato è stato salvato o inviato via e-mail.' : 'Abbiamo inviato alla tua e-mail la copia personale delle risposte. Rileggila senza giudicarti: è la fotografia del tuo presente, non un’etichetta.'}</p>
        {hasAccess ? (
          <a className="leadDownloadButton" href={isDemo ? WORKBOOK_PATH : `${WHATSAPP}?text=${encodeURIComponent('Ciao Gabriele, ho compilato il workbook e vorrei confrontarmi sulla mia direzione professionale.')}`}>
            <span>{isDemo ? <BookOpen /> : <MessageCircle />}<small>{isDemo ? 'ANTEPRIMA COMPLETATA' : 'PRIMO CONFRONTO CONOSCITIVO'}</small><strong>{isDemo ? 'Riapri il workbook' : 'Confronta le tue risposte'}</strong></span><ArrowRight />
          </a>
        ) : (
          <a className="leadDownloadButton" href={WORKBOOK_PATH}><span><BookOpen /><small>ACCESSO AL PERCORSO</small><strong>Inizia il workbook online</strong></span><ArrowRight /></a>
        )}
        <section className="leadNextStep">
          <div><p className="leadEyebrow dark"><span>DOPO</span> Quando hai fatto chiarezza</p><h2>Vuoi confrontare le tue risposte?</h2><p>In un primo incontro conoscitivo partiamo dalla tua situazione reale e capiamo quale verifica può aiutarti a costruire il passaggio.</p></div>
          <a href={`${WHATSAPP}?text=${encodeURIComponent('Ciao Gabriele, ho compilato il workbook e vorrei confrontarmi sulla mia direzione professionale.')}`}><MessageCircle /> Richiedi il primo incontro <ArrowRight /></a>
        </section>
      </main>
      <footer><a href="/">Torna al sito principale</a><span>·</span><a href={PRIVACY_URL}>Privacy Policy</a></footer>
    </div>
  )
}
