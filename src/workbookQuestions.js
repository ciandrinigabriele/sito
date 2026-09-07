export const WORKBOOK_PATH = '/workbook-stato-attuale/'

export const workbookSections = [
  {
    id: 'fotografia',
    number: '01',
    label: 'Fotografia del presente',
    title: 'Dove sei, davvero?',
    prompt: 'Partiamo dai fatti. Non cercare di essere positivo: prova a essere preciso.',
    color: '#cbff45',
    questions: [
      'Se dovessi descrivere in una frase la tua situazione professionale attuale, cosa diresti?',
      'Quale episodio recente rappresenta meglio il momento che stai vivendo?',
      'Che cosa continua a funzionare bene e vuoi assolutamente proteggere?',
      'Quale aspetto della tua situazione professionale ti pesa maggiormente?',
    ],
  },
  {
    id: 'energia',
    number: '02',
    label: 'Energia ed emozioni',
    title: 'Che effetto ti fa?',
    prompt: 'Ascolta i segnali che il corpo e le emozioni stanno già inviando.',
    color: '#ff8a70',
    questions: [
      'Con quale energia inizi normalmente la giornata lavorativa?',
      'Quali attività o situazioni ti tolgono più energia?',
      'Riesci realmente a staccare e recuperare dopo il lavoro?',
      'Qual è l’emozione che provi più frequentemente pensando al tuo lavoro?',
    ],
  },
  {
    id: 'contesto',
    number: '03',
    label: 'Ritmo e contesto',
    title: 'Quanto spazio hai?',
    prompt: 'Osserva ambiente, autonomia e sostenibilità senza attribuirti ogni responsabilità.',
    color: '#b6a7ff',
    questions: [
      'Considerando energia, tempo e responsabilità, il tuo attuale ritmo di lavoro è sostenibile?',
      'Quanto puoi decidere autonomamente come organizzare e svolgere il tuo lavoro?',
      'Sai con chiarezza che cosa ci si aspetta da te oppure ricevi richieste confuse o contraddittorie?',
      'Nel tuo ambiente di lavoro ti senti ascoltato, rispettato e sostenuto?',
    ],
  },
  {
    id: 'identita',
    number: '04',
    label: 'Identità e valore',
    title: 'Ti riconosci ancora?',
    prompt: 'Distingui il tuo valore dal contesto nel quale oggi stai cercando di esprimerlo.',
    color: '#78d9ff',
    questions: [
      'Il lavoro che svolgi rappresenta ancora la persona che sei diventato?',
      'Quali valori personali riesci a esprimere nel lavoro e quali senti di dover sacrificare?',
      'Quali capacità importanti possiedi ma non riesci a utilizzare?',
      'Ti senti realmente privo di valore oppure ti trovi in un contesto che non riesce a riconoscerlo?',
    ],
  },
  {
    id: 'direzione',
    number: '05',
    label: 'Vincoli e direzione',
    title: 'Quale costo stai pagando?',
    prompt: 'Chiudi la fotografia separando i vincoli reali dalle paure e dai costi dell’immobilità.',
    color: '#ffd86b',
    questions: [
      'Quali sono i vincoli realmente oggettivi della tua situazione e quali potrebbero essere paure o supposizioni?',
      'Qual è il primo pensiero che compare quando immagini di cambiare qualcosa?',
      'Che cosa stai ottenendo e che cosa stai perdendo rimanendo nella situazione attuale?',
      'Se nulla cambiasse nei prossimi dodici mesi, quale sarebbe il costo personale, professionale ed emotivo per te?',
    ],
  },
]

export const workbookQuestions = workbookSections.flatMap((section) =>
  section.questions.map((question, index) => ({
    id: `${section.id}-${index + 1}`,
    sectionId: section.id,
    sectionNumber: section.number,
    sectionLabel: section.label,
    question,
  })),
)

export const requiredQuestionIds = new Set([
  'fotografia-1', 'fotografia-4', 'energia-1', 'energia-4', 'contesto-1',
  'identita-1', 'direzione-1', 'direzione-2', 'direzione-3', 'direzione-4',
])
