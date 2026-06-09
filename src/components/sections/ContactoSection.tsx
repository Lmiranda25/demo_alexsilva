import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Send, CheckCircle2, CalendarDays } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import { CONTACT, FORMSPREE_ENDPOINT, CALENDLY_URL, whatsappLink } from '@/lib/constants'
import { slideRight, slideLeft, inView } from '@/lib/motion'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'

type Status = 'idle' | 'sending' | 'ok' | 'error'

// Formulario de cita (Formspree) + reserva con Calendly. Funcionalidades #2 y #4.
export default function ContactoSection() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Si el endpoint de Formspree no está configurado, derivamos a WhatsApp
    // para no perder el lead (degradación elegante).
    if (FORMSPREE_ENDPOINT.includes('your-form-id')) {
      const msg = `Hola Alex, soy ${data.get('nombre')}. Motivo: ${data.get('motivo')}. Tel: ${data.get('telefono')}.`
      window.open(whatsappLink(msg), '_blank')
      setStatus('ok')
      form.reset()
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      if (res.ok) {
        setStatus('ok')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contacto" className="section-pad bg-paper">
      <div className="container-pro">
        <SectionTitle
          eyebrow="Agenda tu cita"
          title="Empieza tu recuperación hoy"
          subtitle="Déjame tus datos y te contacto para coordinar, o reserva directamente en mi calendario."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Formulario */}
          <motion.div
            variants={slideRight}
            initial={inView.initial}
            whileInView={inView.whileInView}
            viewport={inView.viewport}
            className="rounded-3xl bg-white p-7 shadow-soft ring-1 ring-brand-100 sm:p-9"
          >
            {status === 'ok' ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <CheckCircle2 className="h-14 w-14 text-gold-500" />
                <h3 className="mt-4 font-display text-xl font-bold text-brand-900">¡Mensaje enviado!</h3>
                <p className="mt-2 text-sm text-ink/70">
                  Gracias por escribir. Te contactaré muy pronto para coordinar tu cita.
                </p>
                <button onClick={() => setStatus('idle')} className="btn-outline mt-6">
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink/80">Nombre completo</label>
                  <input
                    name="nombre"
                    required
                    placeholder="Tu nombre"
                    className="w-full rounded-xl border border-brand-100 bg-brand-50/50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-50"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink/80">Teléfono</label>
                  <input
                    name="telefono"
                    type="tel"
                    required
                    placeholder="+51 ..."
                    className="w-full rounded-xl border border-brand-100 bg-brand-50/50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-50"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink/80">
                    ¿Cómo podemos ayudarte?
                  </label>
                  <textarea
                    name="motivo"
                    required
                    rows={4}
                    placeholder="Cuéntame brevemente tu caso..."
                    className="w-full resize-none rounded-xl border border-brand-100 bg-brand-50/50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-50"
                  />
                </div>
                {status === 'error' && (
                  <p className="text-sm text-red-500">
                    Hubo un problema. Por favor, escríbeme por WhatsApp.
                  </p>
                )}
                <button type="submit" disabled={status === 'sending'} className="btn-brand w-full">
                  <Send className="h-4 w-4" />
                  {status === 'sending' ? 'Enviando...' : 'Enviar y agendar'}
                </button>
                <p className="text-center text-xs text-ink/40">
                  Tus datos están seguros y solo se usan para contactarte.
                </p>
              </form>
            )}
          </motion.div>

          {/* Info + Calendly */}
          <motion.div
            variants={slideLeft}
            initial={inView.initial}
            whileInView={inView.whileInView}
            viewport={inView.viewport}
            className="flex flex-col gap-6"
          >
            <div className="rounded-3xl bg-brand-gradient p-7 text-white shadow-soft sm:p-9">
              <h3 className="font-display text-xl font-bold">Información de contacto</h3>
              <ul className="mt-6 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
                  <span className="text-brand-50/90">{CONTACT.addressMain}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-gold-400" />
                  <span className="text-brand-50/90">{CONTACT.phone}</span>
                </li>
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {CONTACT.locations.map((loc) => (
                  <span key={loc} className="rounded-full bg-white/10 px-3 py-1 text-xs">
                    {loc}
                  </span>
                ))}
              </div>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-105"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Chatear por WhatsApp
              </a>
            </div>

            <div className="flex flex-1 flex-col justify-center rounded-3xl bg-white p-7 text-center shadow-card ring-1 ring-brand-100 sm:p-9">
              <CalendarDays className="mx-auto h-10 w-10 text-brand-500" />
              <h3 className="mt-3 font-display text-lg font-bold text-brand-900">
                ¿Prefieres reservar tú mismo?
              </h3>
              <p className="mt-2 text-sm text-ink/70">
                Elige el día y la hora que mejor te convenga en mi calendario online.
              </p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold mx-auto mt-5"
              >
                <CalendarDays className="h-4 w-4" />
                Reservar en el calendario
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
