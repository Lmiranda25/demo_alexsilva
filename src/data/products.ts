import { reciclada, stock } from '@/lib/img'

export type Audience = 'profesional' | 'paciente'

export interface Product {
  slug: string
  name: string
  tagline: string
  audience: Audience
  image: string
  gallery?: string[]
  shortDesc: string
  longDesc: string
  features: string[]
  comingSoon?: boolean
}

// Productos REALES de alexsilvagarcia.net. Sin precios (CTA a WhatsApp),
// tal como la web original.
export const PRODUCTS: Product[] = [
  {
    slug: 'hands-pro',
    name: 'Hands Pro',
    tagline: 'Manipulación instrumental',
    audience: 'profesional',
    image: reciclada('handspro.png'),
    gallery: [reciclada('handspro.png'), stock('terapia-manual.jpg')],
    shortDesc:
      'Programa de manipulación instrumental con herramientas que mejoran la calidad de los tejidos y reducen la carga sobre las manos del profesional.',
    longDesc:
      'Hands Pro es un sistema de trabajo instrumentado diseñado por Alex Silva para potenciar la terapia manual. Permite tratar la fascia y los tejidos blandos con mayor precisión, eficacia y ergonomía, protegiendo las manos del fisioterapeuta y mejorando los resultados clínicos sesión tras sesión.',
    features: [
      'Mejora la calidad de los tejidos blandos',
      'Reduce la carga y el desgaste en las manos del terapeuta',
      'Mayor precisión en el tratamiento miofascial',
      'Avalado por +20 años de experiencia clínica',
    ],
  },
  {
    slug: 'artick-pro',
    name: 'Artick Pro',
    tagline: 'Manipulación articular asistida',
    audience: 'profesional',
    image: reciclada('artickpro.png'),
    gallery: [reciclada('artickpro.png'), stock('fisio-trabajo.jpg')],
    shortDesc:
      'Programa de manipulación articular asistida con herramientas ergonómicas para restaurar la movilidad y disminuir el dolor.',
    longDesc:
      'Artick Pro lleva la manipulación articular a otro nivel mediante herramientas ergonómicas que asisten al profesional en la restauración de la movilidad. Una solución basada en evidencia para abordar restricciones articulares con seguridad y reducir el dolor del paciente.',
    features: [
      'Restaura la movilidad articular de forma asistida',
      'Disminuye el dolor del paciente',
      'Diseño ergonómico que cuida al profesional',
      'Técnicas basadas en evidencia',
    ],
  },
  {
    slug: 'back-jamp',
    name: 'Back Jamp',
    tagline: 'Cojín lumbar de soporte',
    audience: 'paciente',
    image: reciclada('back-pro.png'),
    gallery: [reciclada('back-pro.png'), stock('espalda.jpg')],
    shortDesc:
      'Cojín lumbar de apoyo diseñado para mantener una postura saludable y aliviar la tensión en la zona baja de la espalda.',
    longDesc:
      'Back Jamp es un producto de apoyo para el día a día. Su diseño acompaña la curva natural de la columna lumbar, ayudando a mantener una postura correcta al sentarte y reduciendo la tensión que provoca el dolor de espalda baja, tanto en casa como en la oficina o el auto.',
    features: [
      'Soporte ergonómico de la zona lumbar',
      'Favorece una postura saludable',
      'Alivia la tensión de la espalda baja',
      'Ideal para oficina, hogar y auto',
    ],
  },
  {
    slug: 'neck-jamp',
    name: 'Neck Jamp',
    tagline: 'Soporte cervical',
    audience: 'paciente',
    image: reciclada('proximo-producto.jpg'),
    shortDesc:
      'Soporte cervical pensado para descargar la tensión del cuello y acompañar el descanso y la recuperación.',
    longDesc:
      'Neck Jamp es la solución de soporte para la zona cervical. Pensado para quienes pasan muchas horas frente a pantallas o sufren de tensión en el cuello, ayuda a descargar la musculatura y a mantener una alineación más saludable.',
    features: [
      'Descarga la tensión cervical',
      'Acompaña el descanso y la recuperación',
      'Pensado para uso diario',
      'Complemento ideal del Back Jamp',
    ],
    comingSoon: true,
  },
]

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug)
