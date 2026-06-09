import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X } from 'lucide-react'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import { whatsappLink, CONTACT } from '@/lib/constants'

// Botón flotante de WhatsApp con burbuja de invitación. Funcionalidad #1 de conversión.
export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            className="relative w-56 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-brand-100 sm:w-64"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-2 top-2 text-ink/40 hover:text-ink"
              aria-label="Cerrar"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="text-sm font-semibold text-brand-900">¿Hablamos? 👋</p>
            <p className="mt-1 text-xs leading-relaxed text-ink/70">
              Cuéntame tu caso y te oriento sobre el mejor programa para ti.
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-105"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Escribir ahora
            </a>
            <p className="mt-2 text-center text-[11px] text-ink/40">{CONTACT.phone}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-glow"
        aria-label="Abrir chat de WhatsApp"
      >
        <span className="absolute inset-0 animate-pulseRing rounded-full bg-[#25D366]" />
        <motion.span whileTap={{ scale: 0.9 }} className="relative">
          <WhatsAppIcon className="h-7 w-7" />
        </motion.span>
      </button>
    </div>
  )
}
