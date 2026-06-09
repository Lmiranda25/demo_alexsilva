import PageWrapper from '@/components/layout/PageWrapper'
import PageHero from '@/components/ui/PageHero'
import ProductosCatalogo from '@/components/sections/ProductosCatalogo'
import CtaBand from '@/components/sections/CtaBand'
import { stock } from '@/lib/img'

export default function Productos() {
  return (
    <PageWrapper>
      <PageHero
        crumb="Productos"
        eyebrow="Productos clínicos"
        title="Herramientas que potencian resultados"
        subtitle="Productos diseñados por Alex Silva para pacientes y profesionales. Consulta disponibilidad por WhatsApp."
        bg={stock('terapia-manual.jpg')}
      />
      <ProductosCatalogo />
      <CtaBand />
    </PageWrapper>
  )
}
