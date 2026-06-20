// Datos de contacto REALES extraídos de alexsilvagarcia.net
export const CONTACT = {
  phone: '+51 944 416 561',
  phoneRaw: '51944416561',
  addressMain: 'Av. Raúl Ferrero 1274, Interior 3 — La Molina',
  locations: ['La Molina', 'San Borja', 'Los Olivos'],
  city: 'Lima, Perú',
} as const

export const SOCIALS = {
  instagram: 'https://www.instagram.com/alexsilvagarciafisioterapeuta/?hl=es',
  facebook: 'https://www.facebook.com/alexsilvafisioterapeuta',
  youtube: 'https://www.youtube.com/channel/UCutn5NuCKicNbqjKJdE2gSA',
  linkedin: 'https://www.linkedin.com/in/alex-silva-garc%C3%ADa-6a607159/',
} as const

// Helper central para todos los CTA de WhatsApp.
// Reúne todos los enlaces de conversión en un único punto.
export function whatsappLink(message?: string): string {
  const text = message ?? 'Hola Alex, solicito información sobre tus programas de fisioterapia.'
  return `https://api.whatsapp.com/send?phone=${CONTACT.phoneRaw}&text=${encodeURIComponent(text)}`
}

// Reemplaza esta URL por el calendario real de Calendly del cliente.
export const CALENDLY_URL = 'https://calendly.com/alexsilvagarcia/consulta'

// Endpoint de Formspree (placeholder). El cliente crea su form gratis en
// formspree.io y pega aquí su ID -> https://formspree.io/f/XXXXXXXX
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/your-form-id'

export const NAV_LINKS = [
  { label: 'Inicio', to: '/' },
  { label: 'Sobre Alex', to: '/sobre' },
  { label: 'Programas', to: '/programas' },
  { label: 'Productos', to: '/productos' },
  { label: 'Aula Virtual', to: '/aula' },
  { label: 'Contacto', to: '/contacto' },
] as const
