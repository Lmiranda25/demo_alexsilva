import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import { FAQS } from '@/data/faq'
import { whatsappLink } from '@/lib/constants'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'

// Acordeón de preguntas frecuentes. Reduce fricción antes de agendar.
export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="section-pad bg-brand-50">
      <div className="container-pro grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionTitle
            eyebrow="Preguntas frecuentes"
            title="Resolvemos tus dudas"
            subtitle="¿Tienes otra pregunta? Escríbeme por WhatsApp y te respondo personalmente."
            align="left"
          />
          <a
            href={whatsappLink('Hola Alex, tengo una consulta antes de agendar.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-[#25D366] mt-7 text-white hover:brightness-105"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Hacer una consulta
          </a>
        </div>

        <div className="lg:col-span-7">
          <div className="space-y-3">
            {FAQS.map((faq, i) => {
              const isOpen = open === i
              return (
                <div
                  key={faq.q}
                  className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-brand-100/60"
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-semibold text-brand-900">{faq.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600"
                    >
                      <Plus className="h-5 w-5" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="px-6 pb-5 text-sm leading-relaxed text-ink/70">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
