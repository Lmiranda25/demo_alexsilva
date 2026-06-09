import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import { TESTIMONIALS } from '@/data/testimonials'

// Carrusel de testimonios. Funcionalidad de conversión: prueba social.
export default function Testimonios() {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(0)

  const go = (next: number) => {
    setDir(next > index ? 1 : -1)
    setIndex((next + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  const t = TESTIMONIALS[index]

  return (
    <section className="section-pad bg-brand-50">
      <div className="container-pro">
        <SectionTitle
          eyebrow="Testimonios"
          title="Lo que dicen mis pacientes"
          subtitle="Historias reales de recuperación. Tu bienestar es la mejor prueba de mi trabajo."
        />

        <div className="relative mx-auto mt-14 max-w-2xl">
          <Quote className="absolute -left-2 -top-6 h-16 w-16 text-brand-100" />
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={index}
              custom={dir}
              initial={{ opacity: 0, x: dir > 0 ? 60 : -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir > 0 ? -60 : 60 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-3xl bg-white p-6 text-center shadow-card sm:p-8 lg:p-10"
            >
              <div className="mb-4 flex justify-center">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gold-400 text-gold-400" />
                ))}
              </div>
              <p className="text-lg leading-relaxed text-ink/80">“{t.text}”</p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
                <div className="text-left">
                  <p className="font-semibold text-brand-900">{t.name}</p>
                  <p className="text-xs text-ink/60">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => go(index - 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-600 shadow-card transition hover:bg-brand-600 hover:text-white"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? 'w-6 bg-brand-600' : 'w-2 bg-brand-200'
                  }`}
                  aria-label={`Testimonio ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => go(index + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-600 shadow-card transition hover:bg-brand-600 hover:text-white"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
