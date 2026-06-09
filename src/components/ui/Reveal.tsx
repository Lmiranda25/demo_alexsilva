import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { Variants } from 'framer-motion'
import { fadeUp, inView } from '@/lib/motion'

interface RevealProps {
  children: ReactNode
  variants?: Variants
  delay?: number
  className?: string
}

// Wrapper que anima su contenido al entrar en viewport. Usado en toda la web.
export default function Reveal({ children, variants = fadeUp, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial={inView.initial}
      whileInView={inView.whileInView}
      viewport={inView.viewport}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}
