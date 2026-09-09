import React from 'react'
import { ArrowRight, BookOpen, Compass, MessageCircle, Sparkles } from 'lucide-react'

const AMAZON_URL = 'https://amzn.eu/d/0ec3bLMb'

const links = [
  {
    eyebrow: 'Inizia da qui',
    title: 'Workbook gratuito',
    text: 'Fai chiarezza sulla tua situazione lavorativa e scopri da dove partire.',
    href: '/cambia-direzione/?utm_source=instagram&utm_medium=social&utm_campaign=profilo',
    image: '/media/gabriele-landing-editorial-v1.webp',
    className: 'socialHubCardPrimary',
    icon: Compass,
  },
  {
    eyebrow: 'La mia esperienza',
    title: 'Conosci la mia storia',
    text: 'I cambiamenti di lavoro, le ripartenze e il percorso che mi ha portato fin qui.',
    href: '/about-2/?utm_source=instagram&utm_medium=social&utm_campaign=profilo',
    image: '/media/gabriele-home-strada-blu-finale-crop2.webp',
    className: 'socialHubCardStory',
    icon: Sparkles,
  },
  {
    eyebrow: 'Respira. Immagina. Agisci.',
    title: 'Scopri il mio libro',
    text: 'La mia storia completa e un invito concreto a trasformare le difficoltà in direzione.',
    href: AMAZON_URL,
    image: '/media/book-cover.jpg',
    className: 'socialHubCardBook',
    icon: BookOpen,
  },
]

export function SocialHubPage() {
  React.useEffect(() => {
    document.title = 'Inizia qui | Gabriele Ciandrini'
    const description = 'Workbook gratuito, storia e libro di Gabriele Ciandrini, coach per il cambiamento professionale.'
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description)
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', 'https://gabrieleciandrini.com/inizia/')
  }, [])

  return (
    <main className="socialHub">
      <div className="socialHubGlow socialHubGlowOne" />
      <div className="socialHubGlow socialHubGlowTwo" />

      <header className="socialHubHeader">
        <a className="socialHubBrand" href="/">
          <span className="socialHubBrandDot" />
          Gabriele <strong>Ciandrini</strong>
        </a>
        <p>Coach per il cambiamento professionale</p>
      </header>

      <section className="socialHubIntro">
        <span className="socialHubPill">Da dove vuoi iniziare?</span>
        <h1>Il primo passo non è cambiare lavoro.</h1>
        <p>È capire con chiarezza dove sei e quale direzione vuoi costruire.</p>
      </section>

      <section className="socialHubLinks" aria-label="Risorse principali">
        {links.map(({ eyebrow, title, text, href, image, className, icon: Icon }) => (
          <a className={`socialHubCard ${className}`} href={href} key={title}>
            <img src={image} alt="" width="560" height="420" loading={title === 'Workbook gratuito' ? 'eager' : 'lazy'} />
            <span className="socialHubCardShade" />
            <span className="socialHubCardContent">
              <span className="socialHubCardIcon"><Icon size={20} /></span>
              <span className="socialHubCardEyebrow">{eyebrow}</span>
              <strong>{title}</strong>
              <span className="socialHubCardText">{text}</span>
              <span className="socialHubCardAction">Apri <ArrowRight size={18} /></span>
            </span>
          </a>
        ))}
      </section>

      <section className="socialHubFooter">
        <p>Vuoi parlarmi direttamente della tua situazione?</p>
        <a href="https://wa.me/393497759350?text=Ciao%20Gabriele%2C%20vorrei%20capire%20meglio%20il%20percorso%20per%20il%20cambiamento%20professionale.">
          <MessageCircle size={19} /> Scrivimi su WhatsApp
        </a>
        <small>© {new Date().getFullYear()} Gabriele Ciandrini</small>
      </section>
    </main>
  )
}
