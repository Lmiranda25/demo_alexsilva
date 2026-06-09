import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionTitle from '@/components/ui/SectionTitle'
import { PROGRAMS } from '@/data/programs'
import { stagger, fadeUp, inView } from '@/lib/motion'
import { whatsappLink } from '@/lib/constants'

interface Props {
  audience: 'paciente' | 'profesional'
  eyebrow: string
  title: string
  subtitle: string
  tinted?: boolean
}

export default function ProgramasSection({ audience, eyebrow, title, subtitle, tinted }: Props) {
  const items = PROGRAMS.filter((p) => p.audience === audience)

  return (
    <section className={`section-pad ${tinted ? 'bg-brand-50' : 'bg-paper'}`}>
      <div className="container-pro">
        <SectionTitle eyebrow={eyebrow} title={title} subtitle={subtitle} />

        <motion.div
          variants={stagger}
          initial={inView.initial}
          whileInView={inView.whileInView}
          viewport={inView.viewport}
          className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((p) => (
            <motion.article
              key={p.slug}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-brand-100/60"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/50 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl font-bold text-brand-900">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">{p.desc}</p>
                <ul className="mt-4 space-y-1.5">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-ink/70">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                      {b}
                    </li>
                  ))}
                </ul>
                <a
                  href={whatsappLink(`Hola Alex, quiero más información sobre "${p.title}".`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition group-hover:gap-3"
                >
                  Más información
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Link to="/programas" className="btn-outline">
            Ver todos los programas
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
