import React from 'react'
import {
  ArrowDownToLine, ArrowRight, Check, Clock3, Compass, MessageCircle,
  ShieldCheck, Sparkles,
} from 'lucide-react'
import { LandingBrand, useLandingMeta } from './LandingPage'
import './proposal.css'

const PDF_URL = '/downloads/proposta-percorso-cambiamento-professionale-gabriele-ciandrini.pdf'
const WHATSAPP_URL = 'https://wa.me/393497759350?text=Ciao%20Gabriele%2C%20vorrei%20iniziare%20il%20percorso%20di%20cambiamento%20professionale.'

const phases = [
  {
    number: '01',
    title: 'Respira — recupera lucidità',
    intro: 'Prima di decidere dove andare, serve capire con precisione dove sei.',
    points: [
      'Riconosciamo emozioni e pensieri che accompagnano il cambiamento.',
      'Distinguiamo limiti reali e convinzioni che ti trattengono.',
      'Facciamo emergere capacità, esperienze e risorse già disponibili.',
      'Definiamo ciò che vuoi cambiare e ciò che vuoi proteggere.',
    ],
    result: 'Una fotografia chiara del punto di partenza e dei blocchi da affrontare.',
  },
  {
    number: '02',
    title: 'Immagina — costruisci la direzione',
    intro: 'Non cerchiamo un lavoro qualsiasi: costruiamo una possibilità coerente con te.',
    points: [
      'Mettiamo a fuoco valori, bisogni, desideri e priorità.',
      'Individuiamo capacità che vuoi finalmente esprimere.',
      'Esploriamo una strada da dipendente, indipendente o ibrida.',
      'Verifichiamo la compatibilità con tempo, famiglia e risorse.',
    ],
    result: 'Una direzione professionale desiderabile, realistica e sostenibile.',
  },
  {
    number: '03',
    title: 'Agisci — crea il tuo piano',
    intro: 'La direzione diventa utile quando sai quale passo compiere per primo.',
    points: [
      'Scegliamo la possibilità professionale da verificare.',
      'Definiamo obiettivi, priorità e prime azioni concrete.',
      'Prepariamo risorse e strategie per gli ostacoli prevedibili.',
      'Stabiliamo come monitorare progressi e prossime decisioni.',
    ],
    result: 'Una mappa operativa per iniziare senza fare salti nel vuoto.',
  },
]

export function ProposalPage() {
  useLandingMeta({
    title: 'La tua proposta personale | Gabriele Ciandrini',
    description: 'Proposta riservata per il percorso individuale di cambiamento professionale con Gabriele Ciandrini.',
    robots: 'noindex, follow',
  })

  return (
    <div className="proposalPage">
      <header className="proposalNav">
        <LandingBrand inverse />
        <a className="proposalNavLink" href={PDF_URL} download>
          <ArrowDownToLine size={17} /> Scarica il PDF
        </a>
      </header>

      <main>
        <section className="proposalHero">
          <div className="proposalHeroImage" aria-hidden="true" />
          <div className="proposalHeroShade" />
          <div className="proposalHeroContent">
            <p className="proposalEyebrow"><Sparkles size={15} /> Proposta personale e riservata</p>
            <h1>La direzione non si aspetta.<br /><em>Si costruisce.</em></h1>
            <p className="proposalHeroLead">Un percorso individuale per trasformare ciò che hai compreso in una direzione professionale concreta, sostenibile e davvero tua.</p>
            <div className="proposalHeroActions">
              <a className="proposalPrimary" href={WHATSAPP_URL}>Voglio iniziare <ArrowRight size={19} /></a>
              <a className="proposalSecondary" href="#percorso">Scopri il percorso</a>
            </div>
          </div>
        </section>

        <section className="proposalIntro proposalSection" id="percorso">
          <div className="proposalSectionHeading">
            <p className="proposalKicker">Il punto da cui partiamo</p>
            <h2>Hai già fatto qualcosa di importante: ti sei fermato ad ascoltarti.</h2>
          </div>
          <div className="proposalIntroGrid">
            <article>
              <span className="proposalStep">INCLUSO · GRATUITO</span>
              <h3>Workbook sullo stato attuale</h3>
              <p>La prima fotografia della tua situazione professionale: energia, emozioni, valori, vincoli e desideri.</p>
              <Check size={22} />
            </article>
            <article>
              <span className="proposalStep">INCLUSO · GRATUITO</span>
              <h3>Prima sessione online</h3>
              <p>Un confronto individuale per rileggere ciò che è emerso e capire se sono la persona adatta ad accompagnarti.</p>
              <Check size={22} />
            </article>
          </div>
        </section>

        <section className="proposalDirection proposalSection">
          <div className="proposalDirectionLead">
            <p className="proposalKicker">Dal punto A al punto B</p>
            <h2>Non devi diventare per forza indipendente. Devi trovare la forma di lavoro più giusta per te.</h2>
          </div>
          <div className="proposalDirectionMap">
            <article>
              <span>A</span>
              <p>Una situazione professionale che non ti rappresenta più</p>
            </article>
            <ArrowRight aria-hidden="true" />
            <article>
              <span>B</span>
              <p>Una direzione chiara e un piano concreto per costruirla</p>
            </article>
          </div>
          <div className="proposalPaths" aria-label="Possibili direzioni professionali">
            <span>Nuovo lavoro dipendente</span>
            <span>Attività indipendente</span>
            <span>Percorso ibrido</span>
          </div>
        </section>

        <section className="proposalAudience proposalSection">
          <div>
            <p className="proposalKicker">Può essere il percorso giusto per te se…</p>
            <h2>Non cerchi soltanto un altro lavoro. Cerchi una direzione che ti rappresenti.</h2>
          </div>
          <ul>
            <li><Check /> Il lavoro attuale non rispecchia più chi sei o come vuoi vivere.</li>
            <li><Check /> Hai un’idea, ma non sai ancora come trasformarla in un progetto concreto.</li>
            <li><Check /> Vuoi cambiare senza mettere a rischio tutto ciò che hai costruito.</li>
            <li><Check /> Desideri più autonomia, tempo o significato, non soltanto uno stipendio diverso.</li>
          </ul>
        </section>

        <section className="proposalJourney proposalSection">
          <div className="proposalSectionHeading proposalSectionHeadingLight">
            <p className="proposalKicker">Il percorso individuale</p>
            <h2>Tre sessioni per passare dalla confusione a una direzione possibile.</h2>
            <p>Ogni incontro viene costruito sulla tua situazione reale, non su un programma standard.</p>
          </div>
          <div className="proposalPhases">
            {phases.map((phase) => (
              <article key={phase.title}>
                <span>{phase.number}</span>
                <h3>{phase.title}</h3>
                <p className="proposalPhaseIntro">{phase.intro}</p>
                <ul>
                  {phase.points.map((point) => <li key={point}><Check /> {point}</li>)}
                </ul>
                <p className="proposalPhaseResult"><strong>Cosa porti con te</strong>{phase.result}</p>
              </article>
            ))}
          </div>
          <div className="proposalDurationCard">
            <Clock3 size={24} />
            <div><strong>Da 60 a 120 minuti per sessione</strong><span>La durata è flessibile in base al lavoro della singola fase. Non interrompiamo meccanicamente allo scadere dell’ora: entro un massimo di 120 minuti arriviamo a una conclusione utile e concreta.</span></div>
          </div>
        </section>

        <section className="proposalSupport proposalSection">
          <div className="proposalSupportIcon"><MessageCircle /></div>
          <div>
            <p className="proposalKicker">Non resti solo tra una sessione e l’altra</p>
            <h2>Hai il mio supporto anche durante il percorso.</h2>
            <p>Quando emerge un dubbio, un blocco o una decisione da chiarire, puoi scrivermi su WhatsApp. Ti risponderò appena possibile, compatibilmente con gli impegni professionali, per aiutarti a non perdere il filo del lavoro fatto insieme.</p>
          </div>
          <aside>
            <ShieldCheck size={24} />
            <strong>Presenza concreta</strong>
            <span>Un punto di riferimento in più mentre trasformi le idee in azioni.</span>
          </aside>
        </section>

        <section className="proposalOffer proposalSection">
          <div className="proposalOfferCopy">
            <p className="proposalKicker">La proposta</p>
            <h2>Un investimento nella tua prossima direzione.</h2>
            <ul>
              <li><Check /> Workbook online sullo stato attuale</li>
              <li><Check /> Prima sessione conoscitiva gratuita</li>
              <li><Check /> 3 sessioni individuali da 60–120 minuti</li>
              <li><Check /> Supporto WhatsApp durante il percorso</li>
            </ul>
          </div>
          <div className="proposalPriceCard">
            <p>Valore delle 3 sessioni</p>
            <del>€ 600</del>
            <span className="proposalPriceLabel">Proposta riservata</span>
            <strong>€ 450</strong>
            <small>Risparmi €150 · 25%</small>
            <a className="proposalPrimary proposalPriceCta" href={WHATSAPP_URL}>Voglio iniziare <ArrowRight size={19} /></a>
            <p className="proposalMicrocopy">Scrivimi su WhatsApp: chiariremo insieme ogni dettaglio prima di iniziare.</p>
          </div>
        </section>

        <section className="proposalClosing">
          <Compass size={32} />
          <p className="proposalKicker">Il prossimo passo</p>
          <h2>Non devi avere già tutte le risposte.<br />Devi scegliere di cercarle nel modo giusto.</h2>
          <a className="proposalPrimary" href={WHATSAPP_URL}>Parliamone su WhatsApp <MessageCircle size={19} /></a>
          <a className="proposalDownload" href={PDF_URL} download><ArrowDownToLine size={18} /> Scarica questa proposta in PDF</a>
        </section>

        <p className="proposalDisclaimer">Il coaching è un percorso di sviluppo personale e professionale. Non sostituisce percorsi medici o psicologici e non garantisce risultati specifici: i risultati dipendono anche dall’impegno e dalle azioni della persona.</p>
      </main>

      <footer className="proposalFooter">
        <LandingBrand inverse />
        <p>Coach per il cambiamento professionale · Ancona e online</p>
        <div><a href="/privacy-policy/">Privacy</a><a href="/cookie-policy/">Cookie</a></div>
      </footer>
    </div>
  )
}
