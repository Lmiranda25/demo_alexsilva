import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw, Sparkles } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import { QUIZ_STEPS, QUIZ_RESULTS, type ResultKey } from '@/data/quiz'
import { whatsappLink } from '@/lib/constants'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'

// Quiz "¿Qué programa necesitas?" → recomienda y abre WhatsApp con contexto.
// Funcionalidad de conversión de alto impacto.
export default function Quiz() {
  const [step, setStep] = useState(0)
  const [votes, setVotes] = useState<ResultKey[]>([])

  const total = QUIZ_STEPS.length
  const finished = step >= total

  const choose = (result: ResultKey) => {
    setVotes((v) => [...v, result])
    setStep((s) => s + 1)
  }

  const reset = () => {
    setVotes([])
    setStep(0)
  }

  // Resultado = clave más votada
  const resultKey: ResultKey =
    votes.length > 0
      ? (Object.entries(
          votes.reduce<Record<string, number>>((acc, k) => {
            acc[k] = (acc[k] ?? 0) + 1
            return acc
          }, {}),
        ).sort((a, b) => b[1] - a[1])[0][0] as ResultKey)
      : 'dolor-persistente'

  const result = QUIZ_RESULTS[resultKey]

  return (
    <section className="section-pad bg-paper">
      <div className="container-pro">
        <SectionTitle
          eyebrow="Test rápido"
          title="¿Qué programa necesitas?"
          subtitle="Responde 3 preguntas y te recomiendo el camino ideal para tu caso. Toma menos de un minuto."
        />

        <div className="mx-auto mt-12 max-w-2xl overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-brand-100">
          {/* Barra de progreso */}
          <div className="h-1.5 w-full bg-brand-50">
            <motion.div
              className="h-full bg-gold-gradient"
              animate={{ width: `${(Math.min(step, total) / total) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <div className="p-7 sm:p-10">
            <AnimatePresence mode="wait">
              {!finished ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold-600">
                    Pregunta {step + 1} de {total}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold text-brand-900 sm:text-2xl">
                    {QUIZ_STEPS[step].question}
                  </h3>
                  <div className="mt-6 grid gap-3">
                    {QUIZ_STEPS[step].options.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => choose(opt.result)}
                        className="group flex items-center justify-between rounded-xl border-2 border-brand-100 px-5 py-4 text-left text-sm font-medium text-ink/80 transition hover:border-brand-500 hover:bg-brand-50"
                      >
                        {opt.label}
                        <span className="text-brand-300 transition group-hover:translate-x-1 group-hover:text-brand-600">
                          →
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient text-brand-900">
                    <Sparkles className="h-7 w-7" />
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gold-600">
                    Te recomendamos
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-bold text-brand-900">
                    {result.title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink/70">
                    {result.desc}
                  </p>
                  <div className="mt-7 flex flex-col items-center gap-3">
                    <a
                      href={whatsappLink(result.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn bg-[#25D366] text-white hover:brightness-105"
                    >
                      <WhatsAppIcon className="h-5 w-5" />
                      {result.cta}
                    </a>
                    <button
                      onClick={reset}
                      className="inline-flex items-center gap-2 text-sm font-medium text-ink/50 transition hover:text-brand-600"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Repetir test
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
