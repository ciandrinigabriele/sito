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
  {
    id: 'oggi',
    number: '06',
    label: 'La situazione attuale',
    title: 'Che voto dai a oggi?',
    prompt: 'Dai un numero a ciò che stai vivendo. Non è un giudizio: è un punto di partenza.',
    color: '#ff7f6b',
    kind: 'rating',
    questions: [
      { text: 'Quanto sei soddisfatto della tua situazione lavorativa attuale?', low: 'Per niente soddisfatto', high: 'Completamente soddisfatto' },
      { text: 'Quanto sei soddisfatto di come il tuo lavoro rispecchia i tuoi sogni e obiettivi?', low: 'Per niente soddisfatto', high: 'Completamente soddisfatto' },
      { text: 'Quanto sei soddisfatto di come il tuo lavoro rispecchia i tuoi valori?', low: 'Per niente soddisfatto', high: 'Completamente soddisfatto' },
      { text: 'Quanto sei soddisfatto del tempo che ti rimane per la vita fuori dal lavoro?', low: 'Per niente soddisfatto', high: 'Completamente soddisfatto' },
      { text: 'Quanto sei soddisfatto dei guadagni che ottieni dal tuo lavoro?', low: 'Per niente soddisfatto', high: 'Completamente soddisfatto' },
    ],
  },
  {
    id: 'desideri',
    number: '07',
    label: 'I tuoi desideri',
    title: 'Cosa desideri costruire?',
    prompt: 'Ora sposta lo sguardo in avanti. Quanto desideri che ciascuno di questi aspetti cambi?',
    color: '#b6a7ff',
    kind: 'rating',
    questions: [
      { text: 'Quanto desideri migliorare o cambiare la tua situazione lavorativa?', low: 'Per niente', high: 'Moltissimo' },
      { text: 'Quanto desideri svolgere un lavoro più vicino ai tuoi sogni e obiettivi?', low: 'Per niente', high: 'Moltissimo' },
      { text: 'Quanto desideri che il tuo lavoro rispecchi maggiormente i tuoi valori?', low: 'Per niente', high: 'Moltissimo' },
      { text: 'Quanto desideri avere più tempo per la tua vita personale?', low: 'Per niente', high: 'Moltissimo' },
      { text: 'Quanto desideri aumentare i tuoi guadagni?', low: 'Per niente', high: 'Moltissimo' },
    ],
  },
  {
    id: 'azione',
    number: '08',
    label: 'Dal desiderio all’azione',
    title: 'Quanto sei pronto?',
    prompt: 'Un desiderio diventa direzione quando incontra chiarezza, impegno e il sostegno giusto.',
    color: '#78d9ff',
    kind: 'rating',
    questions: [
      { text: 'Quanto sei disposto a impegnare tempo ed energie affinché la tua situazione lavorativa possa cambiare?', low: 'Per niente disposto', high: 'Pienamente disposto' },
      { text: 'Quanto è importante per te iniziare a fare qualcosa di concreto per costruire il futuro professionale che desideri?', low: 'Per niente importante', high: 'Estremamente importante' },
      { text: 'Quanto ti è chiara, oggi, la direzione professionale che vorresti seguire?', low: 'Per niente chiara', high: 'Completamente chiara' },
      { text: 'Quanto pensi che potrebbe esserti utile il supporto di un professionista per trovare la direzione più adatta a te?', low: 'Per niente utile', high: 'Estremamente utile' },
    ],
  },
]

export const workbookQuestions = workbookSections.flatMap((section) =>
  section.questions.map((question, index) => ({
    id: `${section.id}-${index + 1}`,
    sectionId: section.id,
    sectionNumber: section.number,
    sectionLabel: section.label,
    question: typeof question === 'string' ? question : question.text,
    kind: section.kind || 'text',
    low: typeof question === 'string' ? '' : question.low,
    high: typeof question === 'string' ? '' : question.high,
  })),
)

export const requiredQuestionIds = new Set([
  'fotografia-1', 'fotografia-4', 'energia-1', 'energia-4', 'contesto-1',
  'identita-1', 'direzione-1', 'direzione-2', 'direzione-3', 'direzione-4',
  'oggi-1', 'oggi-2', 'oggi-3', 'oggi-4', 'oggi-5',
  'desideri-1', 'desideri-2', 'desideri-3', 'desideri-4', 'desideri-5',
  'azione-1', 'azione-2', 'azione-3', 'azione-4',
])

export const ratingQuestionIds = new Set(
  workbookQuestions.filter(({ kind }) => kind === 'rating').map(({ id }) => id),
)
