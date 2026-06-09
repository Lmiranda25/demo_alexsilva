import { motion } from 'framer-motion'
import { CheckCircle2, Award, Target, HeartHandshake } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import PageHero from '@/components/ui/PageHero'
import Credenciales from '@/components/sections/Credenciales'
import CtaBand from '@/components/sections/CtaBand'
import { reciclada, stock } from '@/lib/img'
import { slideRight, slideLeft, fadeUp, stagger, inView } from '@/lib/motion'

const CREDENTIALS = [
  'Director de Fisiolife',
  'Creador de Artick Pro y Hands Pro',
  'Postgrado en Terapia Manual Ortopédica',
  'Máster en Osteopatía',
  'Conferencista en TMO y Manipulación Instrumentada',
]

const VALUES = [
  { icon: Target, title: 'Enfoque clínico', desc: 'Cada plan se diseña según tu caso, no con fórmulas genéricas.' },
  { icon: Award, title: 'Basado en evidencia', desc: 'Técnicas validadas y en constante actualización.' },
  { icon: HeartHandshake, title: 'Acompañamiento real', desc: 'Te guío en cada etapa, hasta que vuelvas a moverte sin dolor.' },
]

export default function Sobre() {
  return (
    <PageWrapper>
      <PageHero
        crumb="Sobre Alex"
        eyebrow="PT. Alex Silva"
        title="Más de 20 años recuperando vidas"
        subtitle="Fisioterapeuta especializado en dolor musculoesquelético, osteópata y formador de profesionales."
        bg={stock('fisio-trabajo.jpg')}
      />

      <section className="section-pad bg-paper">
        <div className="container-pro grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            variants={slideRight}
            initial={inView.initial}
            whileInView={inView.whileInView}
            viewport={inView.viewport}
            className="relative"
          >
            <div className="absolute -inset-3 -z-10 rounded-3xl bg-brand-gradient opacity-10 blur-xl" />
            <img src={reciclada('alex2.png')} alt="Alex Silva" className="w-full rounded-3xl shadow-soft" />
          </motion.div>

          <motion.div
            variants={slideLeft}
            initial={inView.initial}
            whileInView={inView.whileInView}
            viewport={inView.viewport}
          >
            <span className="eyebrow">Mi historia</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-brand-900">
              La salud de mis pacientes es mi mayor motivación
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-ink/70">
              <p>
                Durante más de dos décadas he dedicado mi vida a entender el dolor y el movimiento
                humano. Como Director de Fisiolife y creador de Artick Pro y Hands Pro, he combinado
                la práctica clínica con la innovación para ofrecer mejores resultados.
              </p>
              <p>
                Mi formación incluye un postgrado en Terapia Manual Ortopédica y un Máster en
                Osteopatía, y comparto mi experiencia como conferencista en terapia manual y
                manipulación instrumentada para formar a la próxima generación de fisioterapeutas.
              </p>
            </div>

            <motion.ul
              variants={stagger}
              initial={inView.initial}
              whileInView={inView.whileInView}
              viewport={inView.viewport}
              className="mt-7 grid gap-3 sm:grid-cols-2"
            >
              {CREDENTIALS.map((c) => (
                <motion.li key={c} variants={fadeUp} className="flex items-center gap-2.5 text-sm text-ink/80">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-gold-500" />
                  {c}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </section>

      <section className="bg-brand-50 section-pad">
        <div className="container-pro">
          <motion.div
            variants={stagger}
            initial={inView.initial}
            whileInView={inView.whileInView}
            viewport={inView.viewport}
            className="grid gap-6 md:grid-cols-3"
          >
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="rounded-2xl bg-white p-7 text-center shadow-card"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-white">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-brand-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Credenciales />
      <div className="h-16" />
      <CtaBand />
    </PageWrapper>
  )
}
