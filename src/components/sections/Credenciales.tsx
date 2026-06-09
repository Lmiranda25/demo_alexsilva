import { motion } from 'framer-motion'
import { Award, Users, Stethoscope, GraduationCap } from 'lucide-react'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { stagger, fadeUp, inView } from '@/lib/motion'

// Banda de confianza con contadores animados. Funcionalidad de conversión: credenciales.
const STATS = [
  { icon: Award, to: 20, suffix: '+', label: 'Años de experiencia' },
  { icon: Users, to: 5000, suffix: '+', label: 'Pacientes atendidos' },
  { icon: Stethoscope, to: 4, suffix: '', label: 'Productos clínicos creados' },
  { icon: GraduationCap, to: 100, suffix: '%', label: 'Basado en evidencia' },
]

export default function Credenciales() {
  return (
    <section className="relative z-10 -mt-12">
      <div className="container-pro">
        <motion.div
          variants={stagger}
          initial={inView.initial}
          whileInView={inView.whileInView}
          viewport={inView.viewport}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-brand-100 shadow-soft lg:grid-cols-4"
        >
          {STATS.map(({ icon: Icon, to, suffix, label }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="flex flex-col items-center bg-white px-4 py-8 text-center transition-colors hover:bg-brand-50"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <Icon className="h-6 w-6" />
              </div>
              <p className="font-display text-3xl font-extrabold text-brand-700 sm:text-4xl">
                <AnimatedCounter to={to} suffix={suffix} />
              </p>
              <p className="mt-1 text-xs font-medium text-ink/60 sm:text-sm">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
