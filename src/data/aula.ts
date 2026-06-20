import { reciclada, stock } from '@/lib/img'

// ============================================================================
// AULA VIRTUAL — modelo de suscripción por CATEGORÍAS.
// El usuario se suscribe a una categoría y desbloquea TODOS sus videos.
//
// NOTA PARA BACKEND: esta es la estructura de datos que el backend deberá
// servir vía API. Los videos usan URLs de ejemplo (YouTube/placeholder).
// Reemplazar `videoUrl` por las URLs reales (privadas) cuando exista el backend.
// Basado en los cursos reales de alexsilvagarcia.net.
// ============================================================================

export interface Video {
  id: string
  title: string
  duration: string // "12:30"
  // URL de embed del video. Placeholder de ejemplo.
  videoUrl: string
  // ¿Es una vista previa gratuita (accesible sin suscripción)?
  free?: boolean
}

export interface Category {
  slug: string
  title: string
  subtitle: string
  description: string
  cover: string
  // precio de suscripción a la categoría (acceso de por vida)
  price: number
  currency: string
  level: 'Básico' | 'Intermedio' | 'Avanzado'
  videos: Video[]
}

// Videos REALES públicos del canal de Alex Silva (@alexsilvacomovivirsindolor),
// usados como vistas previas gratuitas de cada categoría.
const REAL = {
  consulta: 'https://www.youtube.com/embed/ix6dxEY0pyg', // Por qué hacer consulta en fisioterapia
  queEs: 'https://www.youtube.com/embed/V7RlxGKM74w', // Fisioterapia: qué es, cómo ayuda
  lumbar: 'https://www.youtube.com/embed/aXjrmwfDrOE', // Tratamiento del dolor lumbar
}

// PLACEHOLDER para los videos de PAGO. Estos son privados de la plataforma del
// cliente; el backend (VPS) debe reemplazar esta URL por las URLs reales protegidas.
const SAMPLE = 'https://www.youtube.com/embed/aXjrmwfDrOE'

export const CATEGORIES: Category[] = [
  {
    slug: 'columna-lumbar',
    title: 'Especialización en Columna Lumbar',
    subtitle: 'Domina la evaluación y tratamiento de la zona lumbar',
    description:
      'Categoría completa de especialización en columna lumbar. Aprende desde la anatomía y biomecánica hasta las técnicas de tratamiento más avanzadas, con casos clínicos reales. Acceso de por vida a todos los videos de esta categoría.',
    cover: reciclada('web-2.png'),
    price: 99,
    currency: 'S/',
    level: 'Avanzado',
    videos: [
      { id: 'cl-1', title: 'Introducción: tratamiento del dolor lumbar', duration: '14:20', videoUrl: REAL.lumbar, free: true },
      { id: 'cl-2', title: 'Biomecánica de la columna lumbar', duration: '18:45', videoUrl: SAMPLE },
      { id: 'cl-3', title: 'Evaluación del paciente lumbar', duration: '22:10', videoUrl: SAMPLE },
      { id: 'cl-4', title: 'Banderas rojas y diagnóstico diferencial', duration: '16:30', videoUrl: SAMPLE },
      { id: 'cl-5', title: 'Técnicas de movilización I', duration: '20:05', videoUrl: SAMPLE },
      { id: 'cl-6', title: 'Técnicas de movilización II', duration: '19:40', videoUrl: SAMPLE },
      { id: 'cl-7', title: 'Ejercicio terapéutico lumbar', duration: '24:15', videoUrl: SAMPLE },
      { id: 'cl-8', title: 'Casos clínicos comentados', duration: '28:00', videoUrl: SAMPLE },
      { id: 'cl-9', title: 'Prevención de recaídas', duration: '15:50', videoUrl: SAMPLE },
      { id: 'cl-10', title: 'Plan de tratamiento integral', duration: '21:25', videoUrl: SAMPLE },
      { id: 'cl-11', title: 'Trabajo con el paciente postquirúrgico', duration: '17:35', videoUrl: SAMPLE },
      { id: 'cl-12', title: 'Cierre y recomendaciones finales', duration: '12:10', videoUrl: SAMPLE },
    ],
  },
  {
    slug: 'terapia-manual-tratamiento',
    title: 'Terapia Manual: Tratamiento del Dolor Lumbar',
    subtitle: 'Técnicas manuales para el manejo del dolor',
    description:
      'Aprende las técnicas de terapia manual más efectivas para el tratamiento del dolor lumbar, paso a paso y basadas en evidencia. Acceso de por vida.',
    cover: reciclada('web-1-1.png'),
    price: 69,
    currency: 'S/',
    level: 'Intermedio',
    videos: [
      { id: 'tmt-1', title: 'Fisioterapia: qué es y cómo ayuda', duration: '13:15', videoUrl: REAL.queEs, free: true },
      { id: 'tmt-2', title: 'Técnicas de tejidos blandos', duration: '19:20', videoUrl: SAMPLE },
      { id: 'tmt-3', title: 'Manipulación articular segura', duration: '23:40', videoUrl: SAMPLE },
      { id: 'tmt-4', title: 'Integración en el plan de tratamiento', duration: '16:55', videoUrl: SAMPLE },
    ],
  },
  {
    slug: 'terapia-manual-evaluacion',
    title: 'Terapia Manual: Evaluación Lumbar',
    subtitle: 'Evalúa con precisión antes de tratar',
    description:
      'Una evaluación precisa es la base de un buen tratamiento. Domina el proceso de evaluación lumbar completo. Acceso de por vida.',
    cover: reciclada('primesolution.png'),
    price: 69,
    currency: 'S/',
    level: 'Intermedio',
    videos: [
      { id: 'tme-1', title: 'Por qué hacer una consulta en fisioterapia', duration: '15:30', videoUrl: REAL.consulta, free: true },
      { id: 'tme-2', title: 'Inspección y observación', duration: '14:10', videoUrl: SAMPLE },
      { id: 'tme-3', title: 'Pruebas de movilidad', duration: '18:25', videoUrl: SAMPLE },
      { id: 'tme-4', title: 'Pruebas neurológicas', duration: '20:15', videoUrl: SAMPLE },
      { id: 'tme-5', title: 'Pruebas especiales', duration: '17:45', videoUrl: SAMPLE },
      { id: 'tme-6', title: 'Razonamiento clínico y diagnóstico', duration: '22:30', videoUrl: SAMPLE },
    ],
  },
  {
    slug: 'post-cirugia',
    title: 'Cuidados Post-Cirugía Lumbar',
    subtitle: 'Rehabilitación tras la cirugía',
    description:
      'Próximamente: protocolos de rehabilitación y cuidados para el paciente que ha pasado por una cirugía lumbar. Acceso de por vida.',
    cover: stock('terapia-manual.jpg'),
    price: 89,
    currency: 'S/',
    level: 'Avanzado',
    videos: [
      { id: 'pc-1', title: 'Próximamente — avance gratuito', duration: '03:00', videoUrl: REAL.lumbar, free: true },
    ],
  },
]

export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug)

export const getVideo = (id: string): { video: Video; category: Category } | undefined => {
  for (const category of CATEGORIES) {
    const video = category.videos.find((v) => v.id === id)
    if (video) return { video, category }
  }
  return undefined
}

export const totalVideos = CATEGORIES.reduce((sum, c) => sum + c.videos.length, 0)
