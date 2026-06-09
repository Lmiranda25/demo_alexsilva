import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

interface PageHeroProps {
  eyebrow?: string
  title: string
  subtitle?: string
  bg: string
  crumb: string
}

// Cabecera reutilizable para las páginas internas.
export default function PageHero({ eyebrow, title, subtitle, bg, crumb }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[42vh] items-center overflow-hidden pt-20">
      <div className="absolute inset-0 -z-10">
        <img src={bg} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/90 to-brand-800/70" />
      </div>
      <div className="container-pro py-14">
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 text-xs text-brand-50/70"
        >
          <Link to="/" className="hover:text-gold-300">
            Inicio
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-gold-300">{crumb}</span>
        </motion.nav>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          {eyebrow && <span className="eyebrow mt-4 block text-gold-300">{eyebrow}</span>}
          <h1 className="mt-2 max-w-2xl font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {subtitle && <p className="mt-4 max-w-xl text-base text-brand-50/85 sm:text-lg">{subtitle}</p>}
        </motion.div>
      </div>
    </section>
  )
}
