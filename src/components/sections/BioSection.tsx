import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { reciclada } from '@/lib/img'
import { slideRight, slideLeft, inView, stagger, fadeUp } from '@/lib/motion'

const CREDENTIALS = [
  'Director de Fisiolife',
  'Creador de Artick Pro y Hands Pro',
  'Postgrado en Terapia Manual Ortopédica',
  'Máster en Osteopatía',
  'Conferencista en TMO y Manipulación Instrumentada',
]

export default function BioSection() {
  return (
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
          <div className="overflow-hidden rounded-3xl shadow-soft">
            <img src={reciclada('alex2.png')} alt="Alex Silva" className="w-full object-cover" />
          </div>
          <div className="absolute bottom-5 right-5 rounded-2xl bg-white/95 px-6 py-4 shadow-card backdrop-blur">
            <p className="font-display text-lg font-bold text-brand-700">PT. Alex Silva</p>
            <p className="text-xs text-ink/60">Fisioterapeuta · Osteópata</p>
          </div>
        </motion.div>

        <motion.div
          variants={slideLeft}
          initial={inView.initial}
          whileInView={inView.whileInView}
          viewport={inView.viewport}
        >
          <span className="eyebrow">Conoce a tu fisioterapeuta</span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-brand-900 sm:text-4xl">
            Más de 20 años dedicados a que vuelvas a moverte sin dolor
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/70">
            Soy Alex Silva, fisioterapeuta especializado en dolor musculoesquelético. A lo largo de
            más de dos décadas he acompañado a cientos de pacientes en su recuperación, y he formado
            a profesionales con métodos basados en evidencia que hoy se aplican en todo el rubro.
          </p>

          <motion.ul
            variants={stagger}
            initial={inView.initial}
            whileInView={inView.whileInView}
            viewport={inView.viewport}
            className="mt-7 space-y-3"
          >
            {CREDENTIALS.map((c) => (
              <motion.li key={c} variants={fadeUp} className="flex items-center gap-3 text-ink/80">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-gold-500" />
                <span className="text-sm font-medium">{c}</span>
              </motion.li>
            ))}
          </motion.ul>

          <Link to="/sobre" className="btn-brand mt-8">
            Conoce mi historia
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
