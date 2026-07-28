import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import {
  ArrowDown, ArrowLeft, ArrowRight, BookOpen, CalendarDays, Check, ChevronRight, Compass,
  MapPin, Menu, MessageCircle, Quote, X
} from 'lucide-react'
import { supabase } from './supabase'
import './styles.css'

const WHATSAPP = 'https://wa.me/393497759350'
const BOOK_URL = '/libro-respira-immagina-agisci/'
const AMAZON_URL = 'https://amzn.eu/d/0ec3bLMb'

const images = {
  hero: '/media/hero.jpg',
  studio1: '/media/studio1.jpg',
  studio2: '/media/studio2.jpg',
  studio3: '/media/studio3.jpg',
  studio4: '/media/studio4.jpg',
  method: '/media/method.png',
}

const journeyPhases = [
  {
    number: '01',
    title: 'Fermati e fai chiarezza',
    text: 'Mettiamo a fuoco cosa ti pesa, cosa vuoi proteggere e quali paure stanno confondendo la scelta.'
  },
  {
    number: '02',
    title: 'Costruisci la direzione',
    text: 'Trasformiamo valori, capacità e desideri in una possibilità professionale concreta, adatta alla tua vita reale.'
  },
  {
    number: '03',
    title: 'Prepara il passaggio',
    text: 'Definiamo priorità, risorse, tempi e azioni. Il cambiamento diventa un ponte da attraversare, non un salto nel vuoto.'
  },
]

const storyMilestones = [
  {
    year: '2000',
    kicker: 'La domanda',
    title: '“Che vita avrò tra dieci anni?”',
    text: 'A 27 anni capisco che l’impresa di famiglia non ha più futuro. Decido di chiuderla: una scelta dolorosa, ma necessaria per smettere di subire il lavoro e tornare a scegliere.'
  },
  {
    year: '2001',
    kicker: 'Il ponte',
    title: 'Entro in fabbrica. Non è la meta.',
    text: 'Il contratto e lo stipendio stabile mi danno sicurezza. Li uso per studiare, esplorare e costruire il futuro senza mettere a rischio tutto ciò che avevo.'
  },
  {
    year: '18.09.2003',
    kicker: 'La prima svolta',
    title: 'Lascio la fabbrica per iniziare dal basso.',
    text: 'Passo da 14,50 a 5 euro l’ora e comincio in palestra. Non è incoscienza: avevo studiato, fatto esperienza e preparato un piano alternativo.'
  },
  {
    year: '2004—2008',
    kicker: 'La costruzione',
    title: 'Autista di giorno. Personal trainer fino a sera.',
    text: 'Cambio più impieghi, guido autobus, studio e seguo clienti. Ogni lavoro temporaneo sostiene il progetto successivo finché, il 31 luglio 2008, divento lavoratore autonomo.'
  },
  {
    year: '31.03.2011',
    kicker: 'Lo spazio mio',
    title: 'Apro il mio studio ad Ancona.',
    text: 'Dopo anni di preparazione nasce Personal Training Lab: il luogo in cui il lavoro individuale su corpo, postura e persona diventa il centro della mia professione.'
  },
  {
    year: '2015',
    kicker: 'La direzione di oggi',
    title: 'Scopro il coaching e riconosco il filo.',
    text: 'Formazione, ascolto e parole diventano nuovi strumenti. Capisco che tutte le mie svolte possono aiutare altre persone a trovare la propria direzione e trasformarla in azione.'
  },
]

const method = [
  { word: 'Respira', text: 'Gestisci paura, confusione e dialogo interno. Ritrova lucidità prima di decidere.', color: '#cbff45' },
  { word: 'Immagina', text: 'Definisci valori, visione, obiettivo e identità professionale. Dai un nome alla tua direzione.', color: '#ff735c' },
  { word: 'Agisci', text: 'Trasforma la visione in priorità, tempi, risorse e azioni concrete. Senza buttarti nel vuoto.', color: '#b6a7ff' },
]

const articles = [
  ['Il blocco non è una colpa: cosa ti impedisce di cambiare lavoro', '/2026/07/29/il-blocco-non-e-una-colpa-cambiare-lavoro/', 'Blocchi'],
  ['Cambiare lavoro senza buttarsi nel vuoto: da dove iniziare', '/2026/07/08/cambiare-lavoro-senza-buttarsi-nel-vuoto/', 'Cambiamento'],
  ['Quanto ti stanno pagando per non farti realizzare i tuoi sogni?', '/2026/07/20/quanto-ti-stanno-pagando-per-non-farti-realizzare-i-tuoi-sogni/', 'Scelte'],
  ['Rompere le etichette per liberare il tuo successo', '/2023/10/16/titolo-rompere-le-etichette-per-liberare-il-tuo-successo/', 'Identità'],
  ['Cambia il tuo dialogo interno per trasformare la tua vita', '/2023/10/09/cambia-il-tuo-dialogo-interno-per-trasformare-la-tua-vita/', 'Consapevolezza'],
  ['Lavori solo per soldi oppure anche per la passione?', '/2023/09/26/lavori-solo-per-soldi-oppure-anche-per-la-passione-due-approcci-diversi-per-una-vita-significativa/', 'Lavoro'],
  ['La resilienza: superare le avversità e realizzare ciò che desideri', '/2023/09/25/la-resilienza-la-chiave-per-superare-le-avversita-e-realizzare-cio-che-desideri/', 'Crescita'],
]

const normalizePath = (value) => {
  const path = value.replace(/\/+/g, '/')
  return path === '/' ? path : `${path.replace(/\/+$/, '')}/`
}

function usePageMeta({ title, description, type = 'website', date, image = '/media/career-bridge-og.png' }) {
  useEffect(() => {
    const canonicalUrl = `https://gabrieleciandrini.com${normalizePath(window.location.pathname)}`
    document.title = title
    const setMeta = (selector, attribute, content) => {
      let element = document.head.querySelector(selector)
      if (!element) {
        element = document.createElement('meta')
        const [key, value] = attribute
        element.setAttribute(key, value)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }
    setMeta('meta[name="description"]', ['name', 'description'], description)
    setMeta('meta[property="og:title"]', ['property', 'og:title'], title)
    setMeta('meta[property="og:description"]', ['property', 'og:description'], description)
    setMeta('meta[property="og:type"]', ['property', 'og:type'], type)
    setMeta('meta[property="og:url"]', ['property', 'og:url'], canonicalUrl)
    setMeta('meta[property="og:image"]', ['property', 'og:image'], new URL(image, window.location.origin).href)
    setMeta('meta[name="twitter:image"]', ['name', 'twitter:image'], new URL(image, window.location.origin).href)
    if (date) setMeta('meta[property="article:published_time"]', ['property', 'article:published_time'], date)
    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl
  }, [title, description, type, date, image])
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="nav scrolled">
      <a className="brand" href="/" aria-label="Gabriele Ciandrini, home"><span className="brandDot" /> Gabriele <strong>Ciandrini</strong></a>
      <nav className={menuOpen ? 'links open' : 'links'} aria-label="Navigazione principale">
        <a href="/#percorso">Il percorso</a>
        <a href="/metodo-respira-immagina-agisci/">Metodo</a>
        <a href={BOOK_URL}>Il libro</a>
        <a href="/about-2/">Chi sono</a>
        <a href="/articoli/">Articoli</a>
        <a className="navCta" href={WHATSAPP}>Parliamone <ArrowRight size={16} /></a>
      </nav>
      <button className="menuButton" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}>
        {menuOpen ? <X /> : <Menu />}
      </button>
    </header>
  )
}

function SiteFooter() {
  return (
    <footer>
      <div><a className="brand footerBrand" href="/"><span className="brandDot" /> Gabriele <strong>Ciandrini</strong></a><p>Coach per il cambiamento professionale<br />ad Ancona e online.</p></div>
      <div className="footerLinks"><a href="/#percorso">Il percorso</a><a href="/metodo-respira-immagina-agisci/">Metodo</a><a href="/about-2/">Chi sono</a><a href="/articoli/">Articoli</a></div>
      <div className="footerLinks"><a href={WHATSAPP}>WhatsApp</a><a href="https://www.facebook.com/coachgabrieleciandrini">Facebook</a><a href="/contatti/">Contatti</a></div>
      <p className="copyright">© {new Date().getFullYear()} Gabriele Ciandrini · P. IVA 02815060423</p>
    </footer>
  )
}

function ContentPage({ item, posts }) {
  const description = item.excerpt || `${item.title}. Scopri il percorso e le risorse di Gabriele Ciandrini per il cambiamento professionale.`
  usePageMeta({ title: `${item.title} | Gabriele Ciandrini`, description, type: item.type === 'post' ? 'article' : 'website', date: item.date, image: item.featuredImage })
  const related = posts.filter((post) => post.id !== item.id).slice(0, 3)
  return (
    <div className={`contentPage ${item.type}`}>
      <SiteHeader />
      <main>
        <header className="contentHero">
          <a className="contentBack" href={item.type === 'post' ? '/articoli/' : '/'}><ArrowLeft size={16} /> {item.type === 'post' ? 'Tutti gli articoli' : 'Torna alla home'}</a>
          <p className="eyebrow"><span /> {item.type === 'post' ? 'Idee per il cambiamento' : 'Percorsi e strumenti'}</p>
          <h1>{item.title}</h1>
          {item.date && <p className="contentDate"><CalendarDays size={16} /> {new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(item.date))}</p>}
        </header>
        <div className="contentLayout">
          <article className="wpContent" dangerouslySetInnerHTML={{ __html: item.html }} />
          <aside className="contentAside">
            <p>Vuoi applicarlo alla tua situazione?</p>
            <h2>Facciamo chiarezza insieme.</h2>
            <a className="primary" href={WHATSAPP}>Incontro gratuito <ArrowRight size={18} /></a>
          </aside>
        </div>
        {item.type === 'post' && (
          <section className="related sectionPad">
            <div className="sectionNumber">CONTINUA A LEGGERE</div>
            <div className="relatedGrid">
              {related.map((post) => <a href={post.path} key={post.id}><span>Articolo</span><h3>{post.title}</h3><ArrowRight /></a>)}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
      <a className="mobileWhatsapp" href={WHATSAPP}><MessageCircle size={18} /> Parliamone su WhatsApp</a>
    </div>
  )
}

function ArticlesPage({ posts }) {
  usePageMeta({
    title: 'Articoli sul cambiamento professionale | Gabriele Ciandrini',
    description: 'Idee e strumenti concreti per cambiare lavoro, superare i blocchi e costruire una direzione professionale più coerente.',
  })
  return (
    <div className="contentPage articlesArchive">
      <SiteHeader />
      <main>
        <header className="contentHero archiveHero">
          <p className="eyebrow"><span /> Risorse</p>
          <h1>Idee che diventano <em>direzione.</em></h1>
          <p>Approfondimenti concreti per comprendere il cambiamento, scegliere con lucidità e trasformare una possibilità in un piano.</p>
        </header>
        <section className="archiveGrid sectionPad">
          {posts.map((post, index) => (
            <a className="archiveCard" href={post.path} key={post.id}>
              <span className="articleIndex">{String(index + 1).padStart(2, '0')}</span>
              <p>{new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(post.date))}</p>
              <h2>{post.title}</h2>
              <span className="archiveRead">Leggi <ArrowRight /></span>
            </a>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

function NotFoundPage() {
  usePageMeta({ title: 'Pagina non trovata | Gabriele Ciandrini', description: 'La pagina richiesta non è disponibile.' })
  return (
    <div className="contentPage">
      <SiteHeader />
      <main className="notFound"><p className="eyebrow"><span /> Errore 404</p><h1>Questa strada non porta più qui.</h1><p>Torniamo al punto di partenza e troviamo la direzione giusta.</p><a className="primary" href="/">Torna alla home <ArrowRight /></a></main>
      <SiteFooter />
    </div>
  )
}

function ArrowLink({ href, children, className = '' }) {
  return <a className={`arrowLink ${className}`} href={href}>{children}<ArrowRight size={18} /></a>
}

function BookPage() {
  useEffect(() => {
    document.title = 'Respira. Immagina. Agisci. | Il libro di Gabriele Ciandrini'
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      'Scopri Respira. Immagina. Agisci., il libro di Gabriele Ciandrini: una storia vera di difficoltà, rinascita e trasformazione diventata un metodo concreto.'
    )
    const schema = document.createElement('script')
    schema.type = 'application/ld+json'
    schema.id = 'book-schema'
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Book',
      name: 'Respira. Immagina. Agisci.',
      author: { '@type': 'Person', name: 'Gabriele Ciandrini' },
      inLanguage: 'it',
      url: `${window.location.origin}${BOOK_URL}`,
      offers: { '@type': 'Offer', url: AMAZON_URL, availability: 'https://schema.org/InStock' }
    })
    document.head.appendChild(schema)
    return () => schema.remove()
  }, [])

  const bookCover = '/media/book-cover.jpg'
  const bookBack = '/media/book-back.jpg'
  const whatsappBook = `${WHATSAPP}?text=Salve%20Gabriele%2C%20ho%20letto%20la%20pagina%20sul%20libro%20Respira%20Immagina%20Agisci%20e%20vorrei%20prenotare%20un%20incontro%20gratuito.`

  return (
    <div className="bookPage">
      <header className="nav scrolled">
        <a className="brand" href="/" aria-label="Gabriele Ciandrini, home"><span className="brandDot" /> Gabriele <strong>Ciandrini</strong></a>
        <nav className="links bookNav" aria-label="Navigazione principale">
          <a href="/#percorso">Il percorso</a><a href="/#metodo">Metodo</a><a className="activeNav" href={BOOK_URL}>Il libro</a><a href="/about-2/">Chi sono</a>
          <a className="navCta" href={AMAZON_URL}>Acquista <ArrowRight size={16} /></a>
        </nav>
        <a className="bookMobileBuy" href={AMAZON_URL}>Acquista</a>
      </header>

      <main>
        <section className="bookHero">
          <div className="bookAura bookAuraOne" /><div className="bookAura bookAuraTwo" />
          <div className="bookHeroCopy">
            <a className="backHome" href="/"><ArrowRight size={14} /> Torna al sito</a>
            <p className="eyebrow"><span /> Il libro di Gabriele Ciandrini</p>
            <h1>Respira.<br />Immagina.<br /><em>Agisci.</em></h1>
            <p className="bookSubtitle">Una storia vera di difficoltà, rinascita e trasformazione. La radice concreta del metodo che oggi applico al cambiamento professionale.</p>
            <div className="heroActions">
              <a className="primary" href={AMAZON_URL}>Acquista su Amazon <ArrowRight size={18} /></a>
              <a className="ghost" href="#scopri">Scopri la storia <ArrowDown size={17} /></a>
            </div>
          </div>
          <div className="bookMockup">
            <img className="coverFront" src={bookCover} alt="Copertina del libro Respira Immagina Agisci di Gabriele Ciandrini" />
            <img className="coverBack" src={bookBack} alt="Retro del libro Respira Immagina Agisci" />
            <div className="bookBadge">Disponibile<br /><strong>su Amazon</strong></div>
          </div>
        </section>

        <section className="bookLead sectionPad" id="scopri">
          <div className="sectionNumber">01 / LA STORIA</div>
          <div className="bookLeadGrid">
            <h2>Non un libro motivazionale.<br /><em>Una storia trasformata in metodo.</em></h2>
            <div>
              <p><strong>Respira. Immagina. Agisci.</strong> non è soltanto un titolo. È il punto di partenza di un metodo nato da una storia concreta: malattia, difficoltà, decisioni, cadute e ripartenze.</p>
              <p>Racconta le tre azioni che mi hanno permesso di trasformare la malattia e le difficoltà in opportunità. Non nasce da una teoria astratta e non vuole essere motivazione fine a sé stessa.</p>
            </div>
          </div>
        </section>

        <section className="bookMethod">
          <div className="sectionNumber light">02 / LE TRE AZIONI</div>
          <div className="bookMethodGrid">
            {method.map((item, index) => (
              <article key={item.word}>
                <span className="bookMethodNumber">0{index + 1}</span>
                <div className="methodOrb" style={{ background: item.color }} />
                <h2>{item.word}</h2>
                <p>{item.word === 'Respira' && 'Fermati, gestisci il tuo stato emotivo e torna lucido. Prima di una decisione importante devi recuperare centratura.'}
                  {item.word === 'Immagina' && 'Pensa alla soluzione, visualizza chi vuoi diventare e definisci una direzione. Senza visione il cambiamento resta confuso.'}
                  {item.word === 'Agisci' && 'Trasforma la direzione in un piano concreto. Costruisci azioni sostenibili, progressive e verificabili.'}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bookWork sectionPad">
          <div className="bookWorkVisual"><img src={images.hero} alt="Gabriele Ciandrini, autore di Respira Immagina Agisci" /></div>
          <div className="bookWorkCopy">
            <div className="sectionNumber">03 / DAL LIBRO AL LAVORO</div>
            <h2>Il cambiamento personale diventa una direzione professionale.</h2>
            <p>Cambiare lavoro, cambiare direzione o passare da dipendente a indipendente non significa buttarsi nel vuoto. Significa ritrovare lucidità, costruire una visione e poi agire con metodo.</p>
            <p>Il libro crea un ponte tra quello che senti, quello che vuoi costruire e quello che puoi fare concretamente.</p>
            <blockquote><Quote size={26} /><p>La storia personale è la radice. Il metodo è la struttura. Il percorso individuale è l’applicazione concreta.</p></blockquote>
          </div>
        </section>

        <section className="bookAudience">
          <div>
            <div className="sectionNumber light">04 / A CHI PUÒ ESSERE UTILE</div>
            <h2>Per chi sente che è arrivato il momento di cambiare davvero.</h2>
          </div>
          <ul>
            <li><Check /> A chi non si riconosce più nel lavoro attuale.</li>
            <li><Check /> A chi vive una fase di blocco, paura o indecisione.</li>
            <li><Check /> A chi vuole trasformare un momento difficile in una nuova direzione.</li>
            <li><Check /> A chi cerca un metodo concreto, non una promessa motivazionale.</li>
          </ul>
        </section>

        <section className="amazonCta">
          <div className="amazonCover"><img src={bookCover} alt="" /></div>
          <div>
            <p className="eyebrow"><span /> Disponibile ora</p>
            <h2>Inizia il viaggio.<br /><em>Una pagina alla volta.</em></h2>
            <p>Acquista il libro su Amazon oppure parti da un incontro conoscitivo gratuito per applicare il metodo al momento professionale che stai vivendo.</p>
            <div className="heroActions">
              <a className="primary" href={AMAZON_URL}>Acquista su Amazon <ArrowRight /></a>
              <a className="ghost" href={whatsappBook}><MessageCircle /> Parliamone</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bookFooter">
        <div><a className="brand footerBrand" href="/"><span className="brandDot" /> Gabriele <strong>Ciandrini</strong></a><p>Coach per il cambiamento professionale<br />ad Ancona e online.</p></div>
        <div className="footerLinks"><a href="/">Home</a><a href="/#metodo">Metodo</a><a href={AMAZON_URL}>Amazon</a></div>
        <p className="copyright">© {new Date().getFullYear()} Gabriele Ciandrini</p>
      </footer>
    </div>
  )
}

function AboutPage() {
  const [situation, setSituation] = useState('Non so ancora quale direzione prendere')
  const whatsappStory = `${WHATSAPP}?text=${encodeURIComponent(`Ciao Gabriele, ho letto la tua storia. ${situation} e vorrei capire da dove iniziare.`)}`

  usePageMeta({
    title: 'Chi sono | Gabriele Ciandrini, coach per il cambiamento professionale',
    description: 'Dall’impresa di famiglia alla fabbrica, dagli autobus al personal training e al coaching: la storia vera con cui Gabriele Ciandrini aiuta a cambiare lavoro con metodo.',
  })

  useEffect(() => {
    const schema = document.createElement('script')
    schema.type = 'application/ld+json'
    schema.id = 'person-schema'
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Gabriele Ciandrini',
      jobTitle: 'Coach per il cambiamento professionale',
      url: 'https://gabrieleciandrini.com/about-2/',
      sameAs: ['https://www.facebook.com/coachgabrieleciandrini'],
      knowsAbout: ['cambiamento professionale', 'coaching', 'PNL', 'personal training', 'postura']
    })
    document.head.appendChild(schema)
    return () => schema.remove()
  }, [])

  return (
    <div className="storyPage">
      <SiteHeader />
      <main>
        <section className="storyHero">
          <div className="storyHeroCopy">
            <p className="eyebrow"><span /> La mia storia</p>
            <h1>Non insegno il cambiamento.<br /><em>L’ho attraversato.</em></h1>
            <p className="storyHeroLead">Ho chiuso un’impresa di famiglia, lavorato in fabbrica, guidato autobus, ricominciato a 5 euro l’ora, aperto uno studio e scoperto nel coaching il filo che univa ogni svolta.</p>
            <div className="heroActions">
              <a className="primary" href="#svolte">Entra nella storia <ArrowDown size={18} /></a>
              <a className="ghost" href={whatsappStory}>Raccontami la tua <MessageCircle size={18} /></a>
            </div>
          </div>
          <div className="storyHeroPortrait">
            <img src={images.hero} alt="Gabriele Ciandrini nel suo studio ad Ancona" />
            <div className="storyQuestion">
              <span>La domanda che ha aperto tutto</span>
              <strong>“Che vita avrò<br />tra dieci anni?”</strong>
            </div>
          </div>
        </section>

        <section className="storyManifesto">
          <p>La mia esperienza non nasce soltanto dallo studio.</p>
          <h2>Nasce dalle volte in cui ho dovuto scegliere tra restare fermo e costruire una via d’uscita.</h2>
          <div className="storyManifestoFacts">
            <span><strong>6</strong> svolte professionali</span>
            <span><strong>2003</strong> inizio nel lavoro individuale</span>
            <span><strong>2015</strong> coaching e PNL</span>
          </div>
        </section>

        <section className="storyTimeline sectionPad" id="svolte">
          <div className="storyTimelineIntro">
            <div className="sectionNumber">01 / LE SVOLTE</div>
            <h2>Non è stato un salto.<br /><em>È stato un ponte.</em></h2>
            <p>Ogni passaggio ha protetto qualcosa di importante e preparato quello successivo. È lo stesso principio che porto oggi nel cambiamento professionale.</p>
          </div>
          <div className="storyTimelineList">
            {storyMilestones.map((item, index) => (
              <article className="storyMoment" key={item.year}>
                <div className="storyMomentMarker"><span>{String(index + 1).padStart(2, '0')}</span></div>
                <div>
                  <p className="storyYear">{item.year} · {item.kicker}</p>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="storyLesson">
          <div className="storyLessonQuote">
            <Quote />
            <p>Non devi lasciare tutto domani. Devi smettere di lasciare al caso il tuo domani.</p>
          </div>
          <div className="storyLessonCopy">
            <div className="sectionNumber light">02 / COSA HO IMPARATO</div>
            <h2>La sicurezza non è il contrario del cambiamento.</h2>
            <p>Può diventarne la base. Un lavoro ponte, una competenza nuova, un tempo protetto o un piano B possono darti lo spazio necessario per scegliere senza paura e senza improvvisare.</p>
            <p>Per questo non ti dirò di mollare tutto. Ti aiuterò a capire cosa vuoi costruire, cosa devi proteggere e qual è il primo passo sostenibile.</p>
          </div>
        </section>

        <section className="storyBook sectionPad">
          <div className="storyBookCover">
            <img src="/media/book-cover.jpg" alt="Copertina di Respira Immagina Agisci di Gabriele Ciandrini" />
          </div>
          <div>
            <div className="sectionNumber">03 / IL LIBRO</div>
            <h2>La storia intera è diventata un metodo.</h2>
            <p><strong>Respira. Immagina. Agisci.</strong> racconta da dove nasce il mio modo di lavorare: ritrovare lucidità, immaginare una direzione concreta e trasformarla in azioni sostenibili.</p>
            <p>Non è una biografia esposta in vetrina. È la prova che una vita professionale può essere riscritta più di una volta.</p>
            <div className="heroActions">
              <a className="primary" href={BOOK_URL}>Scopri il libro <BookOpen size={18} /></a>
              <a className="ghost darkGhost" href={AMAZON_URL}>Acquista su Amazon <ArrowRight size={18} /></a>
            </div>
          </div>
        </section>

        <section className="storyConversion sectionPad">
          <div>
            <p className="eyebrow"><span /> Ora parliamo di te</p>
            <h2>In quale punto della tua storia ti trovi?</h2>
            <p>Non serve avere già la risposta. Scegli la frase che ti somiglia di più: il messaggio sarà pronto e partiremo da lì.</p>
          </div>
          <div className="storyChoices" role="group" aria-label="Scegli la situazione che ti rappresenta">
            {[
              'Non so ancora quale direzione prendere',
              'So cosa vorrei fare, ma ho paura di rischiare',
              'Ho un progetto e voglio trasformarlo in un piano'
            ].map((choice) => (
              <button
                className={situation === choice ? 'active' : ''}
                type="button"
                onClick={() => setSituation(choice)}
                key={choice}
              >
                <span>{situation === choice ? <Check size={17} /> : null}</span>{choice}
              </button>
            ))}
            <a className="storyWhatsapp" href={whatsappStory}><MessageCircle /> Raccontami dove sei <ArrowRight /></a>
            <small>Incontro conoscitivo gratuito · ad Ancona oppure online</small>
          </div>
        </section>
      </main>
      <SiteFooter />
      <a className="mobileWhatsapp" href={whatsappStory}><MessageCircle size={18} /> Raccontami la tua situazione</a>
    </div>
  )
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
          <a href="#percorso" onClick={() => setMenuOpen(false)}>Il percorso</a>
          <a href="#metodo" onClick={() => setMenuOpen(false)}>Metodo</a>
          <a href={BOOK_URL} onClick={() => setMenuOpen(false)}>Il libro</a>
          <a href="/about-2/" onClick={() => setMenuOpen(false)}>Chi sono</a>
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
              <a className="ghost" href="#percorso">Scopri il percorso <ArrowDown size={17} /></a>
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

        <section className="credibility" aria-label="Esperienza e modalità di lavoro">
          <article><strong>2003</strong><span>Inizio del lavoro<br />sulla persona</span></article>
          <article><strong>2015</strong><span>Coaching e PNL<br />integrati nel metodo</span></article>
          <article><strong>Ancona</strong><span>In studio,<br />in un ambiente riservato</span></article>
          <article><strong>Online</strong><span>Incontri disponibili<br />in tutta Italia</span></article>
        </section>

        <section className="pain sectionPad">
          <div className="sectionNumber">00 / IL PUNTO DI PARTENZA</div>
          <div className="painGrid">
            <h2>Il blocco non è una colpa.<br /><em>È qualcosa da comprendere.</em></h2>
            <div>
              <p>Se continui a rimandare, forse non ti manca il coraggio. Potrebbero mancare informazioni, energia, una competenza, una soglia di sicurezza o un primo passo abbastanza piccolo da verificare.</p>
              <p>Non partiamo dal giudizio e nemmeno dal nuovo lavoro. Partiamo da una diagnosi precisa: che cosa rende difficile questo passaggio, esattamente?</p>
              <ArrowLink href="/2026/07/29/il-blocco-non-e-una-colpa-cambiare-lavoro/">Scopri le 7 domande che sbloccano la scelta</ArrowLink>
            </div>
          </div>
        </section>

        <section className="paths sectionPad" id="percorso">
          <div className="sectionHead">
            <div className="sectionNumber">01 / UN PERCORSO UNICO</div>
            <h2>Dalla confusione a una direzione che <em>puoi costruire.</em></h2>
            <p className="singlePathIntro">Un percorso individuale per cambiare lavoro, crescere come dipendente o preparare un progetto indipendente. La meta cambia; il metodo resta uno.</p>
          </div>
          <div className="singlePath">
            <div className="singlePathTop">
              <p><span className="pulse" /> Ad Ancona e online</p>
              <Compass size={38} strokeWidth={1.4} />
            </div>
            <div className="singlePathPromise">
              <span>IL PERCORSO DIREZIONE</span>
              <h3>Non ti aiuto a “mollare tutto”.<br />Ti aiuto a costruire il passaggio.</h3>
            </div>
            <div className="singlePathPhases">
              {journeyPhases.map((phase) => (
                <article key={phase.number}>
                  <span>{phase.number}</span>
                  <h4>{phase.title}</h4>
                  <p>{phase.text}</p>
                </article>
              ))}
            </div>
            <div className="singlePathAction">
              <p>Partiamo dalla tua situazione reale, senza formule standard.</p>
              <a className="primary" href={`${WHATSAPP}?text=${encodeURIComponent('Ciao Gabriele, vorrei capire se il Percorso Direzione è adatto alla mia situazione professionale.')}`}>Prenota l’incontro gratuito <ArrowRight size={18} /></a>
            </div>
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
            <p className="methodIntro">Non è uno slogan e non è un invito a mollare tutto. È un ciclo: crei spazio, dai forma alla direzione e scegli il prossimo passo che puoi verificare.</p>
            <div className="methodSteps">
              {method.map((item, index) => (
                <article key={item.word}>
                  <span style={{ background: item.color }}>{index + 1}</span>
                  <div><h3>{item.word}</h3><p>{item.text}</p></div>
                </article>
              ))}
            </div>
            <ArrowLink href="/metodo-respira-immagina-agisci/" className="lightLink">Scopri il metodo completo</ArrowLink>
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
            <h2>Non insegno il cambiamento. L’ho attraversato.</h2>
            <p className="bigText">Impresa di famiglia, fabbrica, autobus, personal training, studio privato, coaching: ho cambiato lavoro più volte senza affidare il futuro al caso.</p>
            <p>Ho usato impieghi stabili come ponti, studiato mentre lavoravo e accettato di ricominciare dal basso. Oggi porto quella stessa concretezza nel percorso di chi vuole cambiare direzione.</p>
            <blockquote><Quote size={26} /><p>La mia storia non è il centro del percorso. È la prova che un passaggio può essere preparato.</p></blockquote>
            <ArrowLink href="/about-2/">Leggi la storia delle mie svolte</ArrowLink>
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
            <ArrowLink href={BOOK_URL}>Scopri il libro</ArrowLink>
            <a href={AMAZON_URL} className="smallLink">Acquista su Amazon <ChevronRight size={15} /></a>
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
              <a href={url} className="articleCard" key={title}>
                <span className="articleIndex">0{index + 1}</span>
                <span className="tag">{tag}</span>
                <h3>{title}</h3>
                <span className="read">Leggi l’articolo <ArrowRight size={16} /></span>
              </a>
            ))}
          </div>
          <ArrowLink href="/articoli/" className="allArticles">Esplora tutti gli articoli</ArrowLink>
        </section>

        <section className="wheel">
          <div>
            <div className="sectionNumber light">STRUMENTO GRATUITO</div>
            <h2>Quanto è equilibrata la tua vita, davvero?</h2>
            <p>La Ruota della Vita ti aiuta a osservare lavoro, salute, relazioni, crescita, tempo e soddisfazione con maggiore chiarezza.</p>
            <ArrowLink href="/ruota-della-vita/" className="lightLink">Scopri la Ruota della Vita</ArrowLink>
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
        <div className="footerLinks"><a href="#percorso">Il percorso</a><a href="#metodo">Metodo</a><a href="/about-2/">Chi sono</a><a href="#risorse">Articoli</a></div>
        <div className="footerLinks"><a href={WHATSAPP}>WhatsApp</a><a href="https://www.facebook.com/coachgabrieleciandrini">Facebook</a><a href="/contatti/">Contatti</a></div>
        <p className="copyright">© {new Date().getFullYear()} Gabriele Ciandrini</p>
      </footer>
    </>
  )
}

const currentPath = normalizePath(window.location.pathname)
const isBookPage = currentPath === BOOK_URL
const isArticlesPage = currentPath === '/articoli/'
const isAboutPage = currentPath === '/about-2/'
const root = ReactDOM.createRoot(document.getElementById('root'))
const renderPage = (page) => root.render(<React.StrictMode>{page}</React.StrictMode>)

if (currentPath === '/') {
  renderPage(<App />)
} else if (isBookPage) {
  renderPage(<BookPage />)
} else if (isAboutPage) {
  renderPage(<AboutPage />)
} else {
  import('./data/wordpress-content.json').then(({ default: wordpressContent }) => {
    const posts = wordpressContent
      .filter((item) => item.type === 'post')
      .sort((a, b) => new Date(b.date) - new Date(a.date))
    const currentItem = wordpressContent.find((item) => normalizePath(item.path) === currentPath)
    renderPage(
      isArticlesPage
        ? <ArticlesPage posts={posts} />
        : currentItem
          ? <ContentPage item={currentItem} posts={posts} />
          : <NotFoundPage />
    )
  }).catch(() => renderPage(<NotFoundPage />))
}
