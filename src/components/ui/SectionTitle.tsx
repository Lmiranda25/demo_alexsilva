import { motion } from 'framer-motion'
import { fadeUp, inView } from '@/lib/motion'

interface SectionTitleProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'center' | 'left'
  light?: boolean
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
}: SectionTitleProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <motion.div
      variants={fadeUp}
      initial={inView.initial}
      whileInView={inView.whileInView}
      viewport={inView.viewport}
      className={`max-w-2xl ${alignment}`}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2
        className={`mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.6rem] ${
          light ? 'text-white' : 'text-brand-900'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? 'text-brand-50/90' : 'text-ink/70'}`}>
          {subtitle}
        </p>
      )}
      {align === 'center' && (
        <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gold-gradient" />
      )}
    </motion.div>
  )
}
