import { stock } from '@/lib/img'

export interface Testimonial {
  name: string
  role: string
  avatar: string
  rating: number
  text: string
}

// PLACEHOLDER: testimonios de ejemplo realistas. El cliente debe
// reemplazarlos por reseñas reales de sus pacientes.
export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'María Fernanda R.',
    role: 'Paciente — Poscirugía lumbar',
    avatar: stock('paciente2.jpg'),
    rating: 5,
    text: 'Después de mi operación pensé que nunca volvería a caminar sin dolor. El programa de Alex me devolvió la movilidad y la confianza. Un profesional de otro nivel.',
  },
  {
    name: 'Jorge L. Mendoza',
    role: 'Paciente — Dolor cervical crónico',
    avatar: stock('paciente1.jpg'),
    rating: 5,
    text: 'Llevaba años con tensión en el cuello. En pocas sesiones noté la diferencia. La terapia manual de Alex es precisa y los resultados se sienten de verdad.',
  },
  {
    name: 'Lucía Paredes',
    role: 'Fisioterapeuta — Curso Hands Pro',
    avatar: stock('paciente3.jpg'),
    rating: 5,
    text: 'El curso de Hands Pro transformó mi práctica clínica. Mejores resultados para mis pacientes y mucho menos desgaste en mis manos. Totalmente recomendado.',
  },
]
