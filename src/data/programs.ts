import { reciclada, stock } from '@/lib/img'

export interface Program {
  slug: string
  title: string
  audience: 'paciente' | 'profesional'
  image: string
  desc: string
  bullets: string[]
}

// Programas y servicios REALES de alexsilvagarcia.net
export const PROGRAMS: Program[] = [
  {
    slug: 'programas-tratamientos',
    title: 'Programas y Tratamientos',
    audience: 'paciente',
    image: reciclada('web-2.png'),
    desc: 'Planes especializados pre y poscirugía con técnicas avanzadas y seguimiento personalizado para que recuperes tu movilidad sin dolor.',
    bullets: [
      'Programas pre y poscirugía lumbar',
      'Técnicas avanzadas de fisioterapia',
      'Seguimiento personalizado',
    ],
  },
  {
    slug: 'manuales-y-guias',
    title: 'Manuales y Guías',
    audience: 'paciente',
    image: reciclada('web-1-1.png'),
    desc: 'Recursos prácticos para pacientes y fisioterapeutas: optimiza tu recuperación poscirugía y previene recaídas con guías paso a paso.',
    bullets: [
      'Guías de recuperación poscirugía',
      'Prevención de recaídas',
      'Material para pacientes y profesionales',
    ],
  },
  {
    slug: 'primesolution',
    title: 'PrimeSolution',
    audience: 'paciente',
    image: reciclada('primesolution.png'),
    desc: 'Orientación clínica especializada para el dolor persistente. Decisiones personalizadas basadas en tu caso para que vuelvas a vivir sin límites.',
    bullets: [
      'Orientación clínica especializada',
      'Enfoque en dolor persistente',
      'Decisiones personalizadas',
    ],
  },
  {
    slug: 'terapia-manual',
    title: 'Terapia Manual',
    audience: 'profesional',
    image: stock('terapia-manual.jpg'),
    desc: 'Programa especializado en terapia manual ortopédica con técnicas basadas en evidencia, dictado por un referente del rubro.',
    bullets: [
      'Técnicas basadas en evidencia',
      'Terapia manual ortopédica',
      'Para fisioterapeutas en formación continua',
    ],
  },
  {
    slug: 'cursos-profesionales',
    title: 'Cursos para Profesionales',
    audience: 'profesional',
    image: reciclada('web-profesionales.png'),
    desc: 'Formación avanzada en manipulación instrumentada (Hands Pro) y articular asistida (Artick Pro) para llevar tu práctica clínica al siguiente nivel.',
    bullets: [
      'Manipulación instrumentada',
      'Manipulación articular asistida',
      'Certificación con respaldo internacional',
    ],
  },
]
