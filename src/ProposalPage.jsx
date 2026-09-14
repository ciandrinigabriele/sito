import React from 'react'
import {
  ArrowDownToLine, ArrowRight, BriefcaseBusiness, Check, Clock3, Compass,
  Gauge, MessageCircle, Route, ShieldCheck, Sparkles, WalletCards,
} from 'lucide-react'
import { LandingBrand, useLandingMeta } from './LandingPage'
import './proposal.css'

const PDF_URL = '/downloads/proposta-percorso-cambiamento-professionale-gabriele-ciandrini.pdf'
const WHATSAPP_URL = 'https://wa.me/393497759350?text=Ciao%20Gabriele%2C%20vorrei%20iniziare%20il%20percorso%20di%20cambiamento%20professionale.'

const phases = [
  {
    number: '01',
    title: 'Respira — proteggi la base',
    intro: 'Prima di cambiare, fotografiamo la situazione e definiamo ciò che deve restare stabile mentre costruisci il nuovo.',
    points: [
      'Leggiamo la situazione professionale, personale ed economica attuale.',
      'Distinguiamo limiti reali e convinzioni che ti trattengono.',
      'Mappiamo responsabilità, tempo, entrate e risorse già disponibili.',
      'Definiamo la base di sicurezza da proteggere durante il passaggio.',
    ],
    result: 'Un punto di partenza chiaro e le condizioni di sicurezza da rispettare.',
  },
  {
    number: '02',
    title: 'Immagina — costruisci la direzione',
    intro: 'Non cerchiamo un lavoro qualsiasi: costruiamo il lavoro desiderato e verifichiamo se può reggere nella vita reale.',
    points: [
      'Mettiamo a fuoco valori, bisogni, desideri e priorità.',
      'Individuiamo capacità che vuoi finalmente esprimere.',
      'Esploriamo il ruolo, il settore o l’attività che possono rappresentarti.',
      'Verifichiamo la compatibilità con tempo, famiglia e risorse.',
    ],
    result: 'Una direzione professionale desiderabile, realistica e sostenibile.',
  },
  {
    number: '03',
    title: 'Agisci — costruisci il passaggio',
    intro: 'La direzione diventa concreta quando creiamo il ponte tra il lavoro di oggi e quello che desideri.',
    points: [
      'Se lavori, manteniamo la base mentre prepari e verifichi il nuovo.',
      'Se ti serve reddito, individuiamo anche un lavoro-ponte immediato.',
      'Definiamo prove, risorse, tempi e soglie prima del passaggio.',
      'Se hai una reale autonomia economica, acceleriamo il piano con criterio.',
    ],
    result: 'Una mappa operativa personalizzata per cambiare senza salti nel vuoto.',
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
            <p className="proposalEyebrow"><Sparkles size={15} /> Il mio metodo per cambiare lavoro</p>
            <h1>Non devi mollare tutto.<br /><em>Devi costruire il passaggio.</em></h1>
            <p className="proposalHeroLead">Con Respira. Immagina. Agisci. proteggiamo la tua base attuale, definiamo il lavoro che desideri e prepariamo il ponte per raggiungerlo senza salti nel vuoto.</p>
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

        <section className="proposalPrinciple proposalSection">
          <div className="proposalDirectionLead">
            <p className="proposalKicker">Il principio che guida tutto</p>
            <h2>Il cambiamento non comincia lasciando il lavoro. Comincia costruendo una base per quello nuovo.</h2>
          </div>
          <p className="proposalPrincipleLead">La sicurezza non significa restare fermi. Significa muoversi con una strategia compatibile con le proprie responsabilità e possibilità economiche.</p>
          <div className="proposalScenarios">
            <article>
              <BriefcaseBusiness />
              <span>SE HAI GIÀ UN LAVORO</span>
              <h3>Lo mantieni mentre costruisci il nuovo.</h3>
              <p>Usiamo lo stipendio e la stabilità attuale come base. Nel frattempo esplori, ti prepari e verifichi concretamente la nuova direzione.</p>
            </article>
            <article>
              <WalletCards />
              <span>SE TI SERVE REDDITO SUBITO</span>
              <h3>Troviamo anche un lavoro-ponte.</h3>
              <p>Una soluzione temporanea può proteggere le entrate mentre organizzi il cambiamento vero, senza confondere il ponte con la destinazione.</p>
            </article>
            <article>
              <Gauge />
              <span>SE HAI AUTONOMIA ECONOMICA</span>
              <h3>Possiamo accelerare con criterio.</h3>
              <p>Se disponi delle risorse necessarie, riduciamo i tempi. Ma la velocità nasce da una valutazione concreta, non da una decisione impulsiva.</p>
            </article>
          </div>
          <div className="proposalDirectionMap">
            <article><span>A</span><p>La situazione professionale e le responsabilità di oggi</p></article>
            <div className="proposalBridge"><Route /><strong>Un passaggio protetto</strong><span>costruito sul tuo caso reale</span></div>
            <article><span>B</span><p>Il lavoro desiderato, raggiunto con un piano sostenibile</p></article>
          </div>
        </section>

        <section className="proposalAudience proposalSection">
          <div>
            <p className="proposalKicker">Può essere il percorso giusto per te se…</p>
            <h2>Non cerchi un’altra soluzione casuale. Vuoi costruire un lavoro che ti rappresenti.</h2>
          </div>
          <ul>
            <li><Check /> Il lavoro attuale non rispecchia più chi sei o come vuoi vivere.</li>
            <li><Check /> Hai un’idea, ma non sai ancora come trasformarla in una possibilità verificabile.</li>
            <li><Check /> Vuoi cambiare senza mettere inutilmente a rischio reddito e responsabilità.</li>
            <li><Check /> Hai risorse economiche e vuoi capire come accelerare senza agire d’impulso.</li>
          </ul>
        </section>

        <section className="proposalJourney proposalSection">
          <div className="proposalSectionHeading proposalSectionHeadingLight">
            <p className="proposalKicker">Il percorso individuale</p>
            <h2>Tre sessioni per costruire la strada, non per spingerti a saltare.</h2>
            <p>Respira. Immagina. Agisci. si adatta alla tua situazione, alle responsabilità e alle risorse che hai davvero.</p>
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
            <h2>Un investimento per costruire il passaggio con metodo.</h2>
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
