// Quiz "¿Qué programa necesitas?" — mini cuestionario que recomienda un
// programa/producto y abre WhatsApp con ese contexto. Alta conversión.

export interface QuizOption {
  label: string
  // clave del resultado al que suma este voto
  result: ResultKey
}

export interface QuizStep {
  question: string
  options: QuizOption[]
}

export type ResultKey =
  | 'poscirugia'
  | 'dolor-persistente'
  | 'profesional'
  | 'producto-soporte'

export interface QuizResult {
  title: string
  desc: string
  cta: string
  // mensaje pre-rellenado de WhatsApp
  whatsapp: string
}

export const QUIZ_STEPS: QuizStep[] = [
  {
    question: '¿Quién busca la solución?',
    options: [
      { label: 'Para mí, como paciente', result: 'dolor-persistente' },
      { label: 'Soy fisioterapeuta / profesional', result: 'profesional' },
    ],
  },
  {
    question: '¿Cuál describe mejor tu situación?',
    options: [
      { label: 'Me recupero de una cirugía', result: 'poscirugia' },
      { label: 'Tengo dolor persistente', result: 'dolor-persistente' },
      { label: 'Quiero mejorar mi técnica clínica', result: 'profesional' },
      { label: 'Busco un producto de soporte', result: 'producto-soporte' },
    ],
  },
  {
    question: '¿Qué es lo más importante para ti ahora?',
    options: [
      { label: 'Volver a moverme sin dolor', result: 'poscirugia' },
      { label: 'Una orientación clínica clara', result: 'dolor-persistente' },
      { label: 'Formación con certificación', result: 'profesional' },
      { label: 'Comodidad en el día a día', result: 'producto-soporte' },
    ],
  },
]

export const QUIZ_RESULTS: Record<ResultKey, QuizResult> = {
  poscirugia: {
    title: 'Programa de Tratamiento Poscirugía',
    desc: 'Por lo que nos cuentas, nuestro programa especializado pre/poscirugía con seguimiento personalizado es ideal para ti.',
    cta: 'Quiero mi programa poscirugía',
    whatsapp:
      'Hola Alex, hice el test y me recomendó el Programa de Tratamiento Poscirugía. Quiero más información.',
  },
  'dolor-persistente': {
    title: 'PrimeSolution — Orientación Clínica',
    desc: 'PrimeSolution es la mejor puerta de entrada: orientación clínica especializada para dolor persistente con decisiones personalizadas a tu caso.',
    cta: 'Quiero orientación con PrimeSolution',
    whatsapp:
      'Hola Alex, hice el test y me recomendó PrimeSolution. Tengo dolor persistente y quiero orientación.',
  },
  profesional: {
    title: 'Cursos para Profesionales (Hands Pro / Artick Pro)',
    desc: 'Para llevar tu práctica clínica al siguiente nivel, te recomendamos la formación en manipulación instrumentada y articular asistida.',
    cta: 'Quiero información de los cursos',
    whatsapp:
      'Hola Alex, soy profesional, hice el test y me interesan los cursos Hands Pro / Artick Pro.',
  },
  'producto-soporte': {
    title: 'Productos de Soporte (Back Jamp / Neck Jamp)',
    desc: 'Un producto de soporte ergonómico como Back Jamp puede ayudarte a mantener una postura saludable y aliviar la tensión en tu día a día.',
    cta: 'Quiero ver los productos de soporte',
    whatsapp:
      'Hola Alex, hice el test y me recomendó los productos de soporte (Back Jamp / Neck Jamp). Quiero info.',
  },
}
