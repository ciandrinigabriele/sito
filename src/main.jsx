import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import {
  ArrowDown, ArrowRight, BookOpen, Check, ChevronRight, Compass,
  MapPin, Menu, MessageCircle, Quote, Sparkles, Target, X
} from 'lucide-react'
import { supabase } from './supabase'
import './styles.css'

const WHATSAPP = 'https://wa.me/393497759350'
const oldSite = 'https://gabrieleciandrini.com'

const images = {
  hero: 'https://i0.wp.com/gabrieleciandrini.com/wp-content/uploads/2021/01/gabriele-2-sito.jpg?resize=900%2C900&ssl=1',
  studio1: 'https://i0.wp.com/gabrieleciandrini.com/wp-content/uploads/2026/07/Studio1.jpg?resize=1536%2C842&ssl=1',
  studio2: 'https://i0.wp.com/gabrieleciandrini.com/wp-content/uploads/2026/07/Studio2.jpg?resize=1536%2C780&ssl=1',
  studio3: 'https://i0.wp.com/gabrieleciandrini.com/wp-content/uploads/2026/07/Studio3.jpg?resize=1536%2C961&ssl=1',
  studio4: 'https://i0.wp.com/gabrieleciandrini.com/wp-content/uploads/2026/07/Studio-4.jpg?resize=768%2C598&ssl=1',
  method: 'https://i0.wp.com/gabrieleciandrini.com/wp-content/uploads/2026/06/res.png?resize=1536%2C864&ssl=1',
}

const paths = [
  {
    number: '01', icon: Compass, accent: 'lime',
    title: 'Trovare la tua direzione',
    text: 'Per chi non si riconosce più nel proprio lavoro e vuole capire quale strada sia davvero coerente con valori, capacità e vita reale.',
    href: `${oldSite}/coach-cambiamento-professionale-ancona/`,
    label: 'Ad Ancona e online'
  },
  {
    number: '02', icon: Target, accent: 'coral',
    title: 'Cambiare lavoro con metodo',
    text: 'Un passaggio costruito senza improvvisare: situazione attuale, competenze, limiti, risorse, obiettivo e piano d’azione sostenibile.',
    href: `${oldSite}/cambiare-lavoro-ancona/`,
    label: 'Percorso professionale'
  },
  {
    number: '03', icon: Sparkles, accent: 'violet',
    title: 'Da dipendente a indipendente',
    text: 'Trasforma il desiderio di qualcosa di tuo in un progetto realistico, graduale e capace di reggere nel tempo.',
    href: `${oldSite}/da-dipendente-a-indipendente/`,
    label: 'Progetto indipendente'
  },
]

const method = [
  { word: 'Respira', text: 'Gestisci paura, confusione e dialogo interno. Ritrova lucidità prima di decidere.', color: '#cbff45' },
  { word: 'Immagina', text: 'Definisci valori, visione, obiettivo e identità professionale. Dai un nome alla tua direzione.', color: '#ff735c' },
  { word: 'Agisci', text: 'Trasforma la visione in priorità, tempi, risorse e azioni concrete. Senza buttarti nel vuoto.', color: '#b6a7ff' },
]

const articles = [
  ['Cambiare lavoro senza buttarsi nel vuoto: da dove iniziare', '/2026/07/08/cambiare-lavoro-senza-buttarsi-nel-vuoto/', 'Cambiamento'],
  ['Quanto ti stanno pagando per non farti realizzare i tuoi sogni?', '/2026/07/20/quanto-ti-stanno-pagando-per-non-farti-realizzare-i-tuoi-sogni/', 'Scelte'],
  ['Rompere le etichette per liberare il tuo successo', '/2023/10/02/rompere-le-etichette-per-liberare-il-tuo-successo/', 'Identità'],
  ['Cambia il tuo dialogo interno per trasformare la tua vita', '/2023/10/02/cambia-il-tuo-dialogo-interno-per-trasformare-la-tua-vita/', 'Consapevolezza'],
  ['Lavori solo per soldi oppure anche per la passione?', '/2023/09/29/lavori-solo-per-soldi-oppure-anche-per-la-passione/', 'Lavoro'],
  ['La resilienza: superare le avversità e realizzare ciò che desideri', '/2023/09/28/la-resilienza/', 'Crescita'],
]

function ArrowLink({ href, children, className = '' }) {
  return <a className={`arrowLink ${className}`} href={href}>{children}<ArrowRight size={18} /></a>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const submit = async (event) => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))
    setSending(true)
    setStatus('')
    if (!supabase) {
      setStatus('Il modulo sarà attivo con Supabase. Per ora scrivimi direttamente su WhatsApp.')
      setSending(false)
      return
    }
    const { error } = await supabase.from('contact_requests').insert(data)
    setSending(false)
    if (error) return setStatus('Invio non riuscito. Puoi contattarmi subito su WhatsApp.')
    event.currentTarget.reset()
    setStatus('Messaggio ricevuto. Ti risponderò presto.')
  }

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <a className="brand" href="#top" aria-label="Gabriele Ciandrini, home">
          <span className="brandDot" /> Gabriele <strong>Ciandrini</strong>
        </a>
        <nav className={menuOpen ? 'links open' : 'links'} aria-label="Navigazione principale">
          <a href="#percorsi" onClick={() => setMenuOpen(false)}>Percorsi</a>
          <a href="#metodo" onClick={() => setMenuOpen(false)}>Metodo</a>
          <a href="#chi-sono" onClick={() => setMenuOpen(false)}>Chi sono</a>
          <a href="#risorse" onClick={() => setMenuOpen(false)}>Risorse</a>
          <a className="navCta" href={WHATSAPP}>Parliamone <ArrowRight size={16} /></a>
        </nav>
        <button className="menuButton" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="heroGlow glowOne" />
          <div className="heroGlow glowTwo" />
          <div className="heroCopy">
            <p className="eyebrow"><span /> Coaching per il cambiamento professionale</p>
            <h1>Il lavoro giusto non si trova <em>a caso.</em></h1>
            <p className="heroStatement">Si costruisce con metodo.</p>
            <p className="lead">Ti aiuto a capire quale direzione professionale ha davvero senso per te e a trasformarla in un piano concreto, sostenibile e coerente con i tuoi valori.</p>
            <div className="heroActions">
              <a className="primary" href={WHATSAPP}>Incontro conoscitivo gratuito <ArrowRight size={18} /></a>
              <a className="ghost" href="#percorsi">Esplora i percorsi <ArrowDown size={17} /></a>
            </div>
            <div className="heroMeta">
              <span><MapPin size={15} /> Studio ad Ancona</span>
              <span><Check size={15} /> Online in tutta Italia</span>
            </div>
          </div>
          <div className="heroPortrait">
            <div className="portraitFrame">
              <img src={images.hero} alt="Gabriele Ciandrini, coach per il cambiamento professionale" />
            </div>
            <div className="floatingCard">
              <span className="pulse" />
              <p>La tua prossima direzione<br /><strong>inizia da una domanda.</strong></p>
            </div>
            <div className="orbit orbitOne" />
            <div className="orbit orbitTwo" />
          </div>
        </section>

        <section className="marquee" aria-label="Principi del percorso">
          <div>CHIAREZZA <span>✦</span> DIREZIONE <span>✦</span> METODO <span>✦</span> AZIONE <span>✦</span> CHIAREZZA <span>✦</span> DIREZIONE</div>
        </section>

        <section className="pain sectionPad">
          <div className="sectionNumber">00 / IL PUNTO DI PARTENZA</div>
          <div className="painGrid">
            <h2>Non sei pigro.<br />Non sei bloccato.<br /><em>Sei senza una direzione che senti tua.</em></h2>
            <div>
              <p>Molte persone non si riconoscono più nel proprio lavoro: poca motivazione, la sensazione di sprecare tempo, il desiderio di qualcosa di più libero e coerente.</p>
              <p>Il cambiamento non va improvvisato. Prima capiamo se per te ha senso crescere come dipendente, costruire una strada indipendente o preparare un passaggio graduale.</p>
              <ArrowLink href={WHATSAPP}>Partiamo dalla tua situazione reale</ArrowLink>
            </div>
          </div>
        </section>

        <section className="paths sectionPad" id="percorsi">
          <div className="sectionHead">
            <div className="sectionNumber">01 / PERCORSI</div>
            <h2>Tre strade.<br />Una sola deve essere <em>la tua.</em></h2>
          </div>
          <div className="pathCards">
            {paths.map(({ icon: Icon, ...path }) => (
              <a className={`pathCard ${path.accent}`} href={path.href} key={path.number}>
                <div className="cardTop"><span>{path.number}</span><Icon size={30} strokeWidth={1.5} /></div>
                <p className="cardLabel">{path.label}</p>
                <h3>{path.title}</h3>
                <p>{path.text}</p>
                <span className="cardArrow"><ArrowRight /></span>
              </a>
            ))}
          </div>
        </section>

        <section className="method" id="metodo">
          <div className="methodVisual">
            <img src={images.method} alt="Metodo Respira Immagina Agisci" />
            <div className="methodStamp">R · I · A</div>
          </div>
          <div className="methodCopy">
            <div className="sectionNumber light">02 / IL METODO</div>
            <h2>Respira.<br />Immagina.<br /><em>Agisci.</em></h2>
            <p className="methodIntro">Prima ritrovi lucidità. Poi costruisci una visione. Infine la trasformi in azione concreta.</p>
            <div className="methodSteps">
              {method.map((item, index) => (
                <article key={item.word}>
                  <span style={{ background: item.color }}>{index + 1}</span>
                  <div><h3>{item.word}</h3><p>{item.text}</p></div>
                </article>
              ))}
            </div>
            <ArrowLink href={`${oldSite}/metodo-respira-immagina-agisci/`} className="lightLink">Scopri il metodo completo</ArrowLink>
          </div>
        </section>

        <section className="about sectionPad" id="chi-sono">
          <div className="aboutImages">
            <img className="aboutMain" src={images.studio3} alt="Lo studio di coaching di Gabriele Ciandrini ad Ancona" />
            <img className="aboutDetail" src={images.studio4} alt="Dettaglio dello studio di Gabriele Ciandrini" />
            <span>ANCONA<br />43.6158° N</span>
          </div>
          <div className="aboutCopy">
            <div className="sectionNumber">03 / CHI SONO</div>
            <h2>La mia esperienza non nasce soltanto dallo studio.</h2>
            <p className="bigText">Nasce da una vita attraversata da malattia, cambiamenti di lavoro, scelte imprenditoriali, crisi e ripartenze.</p>
            <p>Dal 2003 lavoro sul rapporto tra corpo, disciplina e benessere; dal 2015 ho integrato coaching e PNL. Oggi unisco esperienza vissuta, formazione e metodo per trasformare una decisione professionale in un piano realistico.</p>
            <blockquote><Quote size={26} /><p>Non devi diventare qualcun altro. Devi creare le condizioni per tornare a essere te.</p></blockquote>
          </div>
        </section>

        <section className="studio">
          <div className="studioCopy">
            <div className="sectionNumber light">04 / DOVE LAVORIAMO</div>
            <h2>Uno spazio per fermarti.<br /><em>E ripartire.</em></h2>
            <p>Ricevo nel mio studio ad Ancona e lavoro online con persone in tutta Italia. Il primo incontro serve a capire se e come posso aiutarti, senza pressioni.</p>
            <div className="studioFacts">
              <span><MapPin /> Ancona</span>
              <span><MessageCircle /> Online</span>
            </div>
          </div>
          <div className="studioGallery">
            <img src={images.studio1} alt="Studio di coaching ad Ancona" />
            <img src={images.studio2} alt="Ambiente dello studio di Gabriele Ciandrini" />
          </div>
        </section>

        <section className="book sectionPad">
          <div className="bookIcon"><BookOpen size={52} /></div>
          <div>
            <div className="sectionNumber">05 / IL LIBRO</div>
            <h2>Respira. Immagina. Agisci.</h2>
            <p>La storia vera da cui nasce il cuore del mio metodo: dalla malattia affrontata fin da bambino alle crisi, ai cambiamenti professionali e alle ripartenze.</p>
          </div>
          <div className="bookActions">
            <ArrowLink href={`${oldSite}/libro-respira-immagina-agisci/`}>Scopri il libro</ArrowLink>
            <a href="https://amzn.eu/d/0QFY4n5" className="smallLink">Acquista su Amazon <ChevronRight size={15} /></a>
          </div>
        </section>

        <section className="resources sectionPad" id="risorse">
          <div className="sectionHead resourcesHead">
            <div className="sectionNumber">06 / RISORSE</div>
            <h2>Idee che non durano cinque minuti.</h2>
            <p>Riflessioni e strumenti pratici su lavoro, identità, paure, obiettivi e cambiamento.</p>
          </div>
          <div className="articleGrid">
            {articles.map(([title, url, tag], index) => (
              <a href={`${oldSite}${url}`} className="articleCard" key={title}>
                <span className="articleIndex">0{index + 1}</span>
                <span className="tag">{tag}</span>
                <h3>{title}</h3>
                <span className="read">Leggi l’articolo <ArrowRight size={16} /></span>
              </a>
            ))}
          </div>
          <ArrowLink href={`${oldSite}/articoli/`} className="allArticles">Esplora tutti gli articoli</ArrowLink>
        </section>

        <section className="wheel">
          <div>
            <div className="sectionNumber light">STRUMENTO GRATUITO</div>
            <h2>Quanto è equilibrata la tua vita, davvero?</h2>
            <p>La Ruota della Vita ti aiuta a osservare lavoro, salute, relazioni, crescita, tempo e soddisfazione con maggiore chiarezza.</p>
            <ArrowLink href={`${oldSite}/ruota-della-vita/`} className="lightLink">Scopri la Ruota della Vita</ArrowLink>
          </div>
          <div className="wheelGraphic"><span>10</span><span>8</span><span>6</span><span>4</span><span>2</span></div>
        </section>

        <section className="contact sectionPad" id="contatti">
          <div className="contactIntro">
            <p className="eyebrow"><span /> Il prossimo passo</p>
            <h2>Partiamo da una domanda concreta.</h2>
            <p className="contactQuestion">Qual è la strada professionale più giusta per te?</p>
            <a className="whatsappBig" href={WHATSAPP}><MessageCircle /> Scrivimi su WhatsApp <ArrowRight /></a>
          </div>
          <form onSubmit={submit}>
            <p>Oppure raccontami qui il tuo momento.</p>
            <label>Come ti chiami?<input name="name" required placeholder="Nome e cognome" /></label>
            <label>Dove posso risponderti?<input name="email" type="email" required placeholder="La tua email" /></label>
            <label>Cosa vorresti cambiare?<textarea name="message" required rows="4" placeholder="Scrivi liberamente…" /></label>
            <button className="primary" type="submit" disabled={sending}>{sending ? 'Invio…' : 'Invia il messaggio'} <ArrowRight size={18} /></button>
            {status && <p className="formStatus" role="status">{status}</p>}
          </form>
        </section>
      </main>

      <a className="mobileWhatsapp" href={WHATSAPP}><MessageCircle size={20} /> Parliamone</a>

      <footer>
        <div><a className="brand footerBrand" href="#top"><span className="brandDot" /> Gabriele <strong>Ciandrini</strong></a><p>Coach per il cambiamento professionale<br />ad Ancona e online.</p></div>
        <div className="footerLinks"><a href="#percorsi">Percorsi</a><a href="#metodo">Metodo</a><a href="#chi-sono">Chi sono</a><a href="#risorse">Articoli</a></div>
        <div className="footerLinks"><a href={WHATSAPP}>WhatsApp</a><a href="https://www.facebook.com/coachgabrieleciandrini">Facebook</a><a href={`${oldSite}/contatti/`}>Contatti</a></div>
        <p className="copyright">© {new Date().getFullYear()} Gabriele Ciandrini</p>
      </footer>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
