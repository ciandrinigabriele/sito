export const WORKBOOK_PATH = '/workbook-stato-attuale/'

export const workbookSections = [
  {
    id: 'energia',
    number: '01',
    label: 'Energia ed emozioni',
    title: 'Che effetto ti fa?',
    prompt: 'Ascolta i segnali che il corpo e le emozioni stanno già inviando.',
    color: '#ff8a70',
    guide: {
      title: 'Cosa intendiamo per energia?',
      text: 'Non soltanto la stanchezza fisica. Osserva come il lavoro influisce sulla tua energia mentale, emotiva e fisica: lucidità, motivazione, tensione, irritabilità, entusiasmo e capacità di recuperare.',
      tip: 'Pensa a come ti senti prima di iniziare, durante la giornata e quando torni a casa.',
    },
    questions: [
      'Quali sensazioni ed emozioni provi la domenica sera?',
      'Il lunedì mattina, quando ti svegli, quali sono i tuoi primi pensieri e le tue emozioni?',
      'Al mattino, pensando alla giornata lavorativa che ti aspetta, come descriveresti la tua energia mentale, emotiva e fisica?',
      'Quali attività o situazioni lavorative ti tolgono più energia?',
      'Dopo il lavoro, riesci davvero a staccare e recuperare energie?',
      'Quali emozioni provi quando pensi al tuo lavoro?',
    ],
  },
  {
    id: 'fotografia',
    number: '02',
    label: 'Fotografia del presente',
    title: 'Dove sei, davvero?',
    prompt: 'Partiamo dai fatti. Non cercare di essere positivo: prova a essere preciso.',
    color: '#cbff45',
    questions: [
      'Descrivi con una frase la tua situazione professionale attuale.',
      'Che cosa continua a funzionare bene nella tua vita e vuoi assolutamente proteggere?',
      'Quale aspetto della tua situazione professionale ti pesa maggiormente?',
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
      'Nel tuo lavoro quanto ti senti autonomo e quanto, invece, limitato da regole, orari o modalità che non puoi scegliere?',
      'Nel tuo ambiente di lavoro ti senti ascoltato, rispettato e sostenuto?',
    ],
  },
  {
    id: 'identita',
    number: '04',
    label: 'Identità e valori',
    title: 'Ti riconosci ancora?',
    prompt: 'Distingui il tuo valore dal contesto nel quale oggi stai cercando di esprimerlo.',
    color: '#78d9ff',
    guide: {
      title: 'Cosa intendiamo per valori?',
      text: 'Sono le cose che per te contano davvero e che vorresti riconoscere nel tuo modo di lavorare: per esempio autonomia, sicurezza, rispetto, crescita, creatività, libertà, utilità, equilibrio e relazioni positive.',
      tip: 'Non scegliere ciò che dovrebbe essere importante. Pensa a ciò che conta realmente per te.',
    },
    questions: [
      'Quali valori personali riesci a esprimere nel tuo lavoro?',
      'Quali valori, invece, senti di dover sacrificare nel tuo lavoro?',
      'Senti di avere capacità e qualità che non puoi esprimere nel lavoro che svolgi attualmente?',
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
      'Quali sono i vincoli o le paure che ti tengono legato a questo lavoro?',
      'Qual è il primo pensiero che compare quando immagini di cambiare lavoro?',
      'Che cosa stai ottenendo da questo lavoro, in questo momento?',
      'Che cosa senti di stare perdendo restando in questo lavoro?',
      'Immagina i prossimi dieci anni: se rimanessi fermo senza cambiare nulla, quale sarebbe il costo personale, professionale ed emotivo per te?',
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
  'energia-1', 'energia-6', 'fotografia-1', 'fotografia-3', 'contesto-1',
  'identita-1', 'direzione-1', 'direzione-2', 'direzione-3', 'direzione-4', 'direzione-5',
  'oggi-1', 'oggi-2', 'oggi-3', 'oggi-4', 'oggi-5',
  'desideri-1', 'desideri-2', 'desideri-3', 'desideri-4', 'desideri-5',
  'azione-1', 'azione-2', 'azione-3', 'azione-4',
])

export const ratingQuestionIds = new Set(
  workbookQuestions.filter(({ kind }) => kind === 'rating').map(({ id }) => id),
)
