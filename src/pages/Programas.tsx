import PageWrapper from '@/components/layout/PageWrapper'
import PageHero from '@/components/ui/PageHero'
import ProgramasSection from '@/components/sections/ProgramasSection'
import Quiz from '@/components/sections/Quiz'
import Faq from '@/components/sections/Faq'
import { stock } from '@/lib/img'

export default function Programas() {
  return (
    <PageWrapper>
      <PageHero
        crumb="Programas"
        eyebrow="Programas y servicios"
        title="Un plan para cada necesidad"
        subtitle="Tratamientos para pacientes y formación para profesionales, todo con un enfoque clínico basado en evidencia."
        bg={stock('consulta.jpg')}
      />
      <ProgramasSection
        audience="paciente"
        eyebrow="Para pacientes"
        title="Programas para tu recuperación"
        subtitle="Planes que te acompañan en cada etapa, desde la lesión hasta volver a moverte con libertad."
      />
      <ProgramasSection
        audience="profesional"
        eyebrow="Para profesionales"
        title="Formación para fisioterapeutas"
        subtitle="Cursos y métodos para llevar tu práctica clínica al siguiente nivel."
        tinted
      />
      <Quiz />
      <Faq />
    </PageWrapper>
  )
}
