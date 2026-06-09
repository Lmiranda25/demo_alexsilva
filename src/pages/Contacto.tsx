import PageWrapper from '@/components/layout/PageWrapper'
import PageHero from '@/components/ui/PageHero'
import ContactoSection from '@/components/sections/ContactoSection'
import Faq from '@/components/sections/Faq'
import { stock } from '@/lib/img'

export default function Contacto() {
  return (
    <PageWrapper>
      <PageHero
        crumb="Contacto"
        eyebrow="Hablemos"
        title="Estoy aquí para ayudarte"
        subtitle="Agenda tu cita, reserva en mi calendario o escríbeme por WhatsApp. Demos juntos el primer paso."
        bg={stock('cta-bg.jpg')}
      />
      <ContactoSection />
      <Faq />
    </PageWrapper>
  )
}
