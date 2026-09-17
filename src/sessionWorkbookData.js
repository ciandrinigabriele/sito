export const SESSION_WORKBOOK_PATH = '/workbook-paure-limiti-vincoli/'

export const sessionQuestions = [
  { id: 'paure-1', group: 'Paure', color: '#ff8a70', text: 'Di che cosa hai paura quando pensi di cambiare lavoro?' },
  { id: 'paure-2', group: 'Paure', color: '#ff8a70', text: 'Che cosa temi di perdere cambiando?' },
  { id: 'paure-3', group: 'Paure', color: '#ff8a70', text: 'Se avessi la certezza di non fallire, che cosa faresti?' },
  { id: 'limiti-1', group: 'Limiti mentali', color: '#b6a7ff', text: 'Quale limite mentale senti che ti sta frenando?' },
  { id: 'limiti-2', group: 'Limiti mentali', color: '#b6a7ff', text: 'Quale frase ti ripeti quando pensi di cambiare?' },
  { id: 'limiti-3', group: 'Limiti mentali', color: '#b6a7ff', text: 'Hai già superato delle difficoltà in passato? Quali?' },
  { id: 'vincoli-1', group: 'Vincoli reali', color: '#78d9ff', text: 'Qual è il vincolo concreto più importante che oggi ti impedisce di cambiare?' },
  { id: 'vincoli-2', group: 'Vincoli reali', color: '#78d9ff', text: 'Quali condizioni devi assolutamente proteggere?' },
  { id: 'vincoli-3', group: 'Vincoli reali', color: '#78d9ff', text: 'Che cosa ti manca concretamente per poter fare il primo passo in sicurezza?' },
]

export const professionalWheel = [
  { id: 'soddisfazione', label: 'Soddisfazione lavorativa', color: '#ff806b' },
  { id: 'sicurezza', label: 'Stipendio e sicurezza economica', color: '#ffb84d' },
  { id: 'benessere', label: 'Tempo ed energie per il benessere', color: '#ffd86b' },
  { id: 'crescita-professionale', label: 'Possibilità di crescita professionale', color: '#cbff45' },
  { id: 'tempo-libero', label: 'Tempo libero e divertimento', color: '#6ee7b7' },
  { id: 'crescita-personale', label: 'Crescita personale', color: '#78d9ff' },
  { id: 'ambiente', label: 'Ambiente e relazioni di lavoro', color: '#8ea7ff' },
  { id: 'liberta', label: 'Libertà e autonomia', color: '#b6a7ff' },
]

export const sessionSections = ['Paure', 'Limiti mentali', 'Vincoli reali'].map((label, index) => ({
  number: String(index + 1).padStart(2, '0'),
  label,
  title: label,
  color: sessionQuestions.find((question) => question.group === label).color,
  answers: sessionQuestions.filter((question) => question.group === label),
}))
