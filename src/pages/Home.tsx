import PageWrapper from '@/components/layout/PageWrapper'
import Hero from '@/components/sections/Hero'
import Credenciales from '@/components/sections/Credenciales'
import ProgramasSection from '@/components/sections/ProgramasSection'
import CtaBand from '@/components/sections/CtaBand'
import BioSection from '@/components/sections/BioSection'
import VideosSection from '@/components/sections/VideosSection'
import ProductosCatalogo from '@/components/sections/ProductosCatalogo'
import Testimonios from '@/components/sections/Testimonios'
import Quiz from '@/components/sections/Quiz'
import Faq from '@/components/sections/Faq'
import ContactoSection from '@/components/sections/ContactoSection'

export default function Home() {
  return (
    <PageWrapper>
      <Hero />
      <Credenciales />
      <ProgramasSection
        audience="paciente"
        eyebrow="Para pacientes"
        title="Programas para tu recuperación"
        subtitle="Planes diseñados para acompañarte en cada etapa, desde la lesión hasta volver a moverte con total libertad."
      />
      <CtaBand />
      <ProgramasSection
        audience="profesional"
        eyebrow="Para profesionales"
        title="Formación para fisioterapeutas"
        subtitle="Lleva tu práctica clínica al siguiente nivel con métodos basados en evidencia creados por Alex Silva."
        tinted
      />
      <BioSection />
      <VideosSection />
      <ProductosCatalogo />
      <Testimonios />
      <Quiz />
      <Faq />
      <ContactoSection />
    </PageWrapper>
  )
}
