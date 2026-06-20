import { useState, type FormEvent } from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Lock,
  CreditCard,
  Check,
  Copy,
  Infinity as InfinityIcon,
  ShieldCheck,
  Loader2,
} from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import { getCategory } from '@/data/aula'
import { useAula } from '@/lib/aulaAuth'
import { processPayment, TEST_CARDS, type CardData } from '@/lib/payment'

export default function AulaCheckout() {
  const { slug } = useParams()
  const category = slug ? getCategory(slug) : undefined
  const navigate = useNavigate()
  const { user, isSubscribed, grantSubscription } = useAula()

  const [card, setCard] = useState<CardData>({ number: '', name: '', expiry: '', cvv: '' })
  const [status, setStatus] = useState<'idle' | 'processing' | 'error' | 'done'>('idle')
  const [message, setMessage] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  if (!category) return <Navigate to="/aula" replace />
  // Si no hay sesión, primero pide login (y vuelve al checkout).
  if (!user) return <Navigate to={`/aula/login?next=/aula/checkout/${category.slug}`} replace />
  // Si ya está suscrito, no tiene sentido el checkout.
  if (isSubscribed(category.slug)) return <Navigate to={`/aula/categoria/${category.slug}`} replace />

  function set<K extends keyof CardData>(k: K, v: string) {
    setCard((c) => ({ ...c, [k]: v }))
  }

  // Formateo amigable del número de tarjeta y vencimiento.
  function onNumber(v: string) {
    const digits = v.replace(/\D/g, '').slice(0, 16)
    set('number', digits.replace(/(.{4})/g, '$1 ').trim())
  }
  function onExpiry(v: string) {
    const d = v.replace(/\D/g, '').slice(0, 4)
    set('expiry', d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d)
  }

  function copyCard(num: string) {
    navigator.clipboard?.writeText(num).then(() => {
      setCopied(num)
      setTimeout(() => setCopied(null), 1500)
    })
    // también lo rellena directo para comodidad de la demo
    onNumber(num)
    if (!card.expiry) set('expiry', '12/28')
    if (!card.cvv) set('cvv', '123')
    if (!card.name) set('name', user?.name ?? 'Titular Demo')
  }

  async function handlePay(e: FormEvent) {
    e.preventDefault()
    setStatus('processing')
    setMessage('')
    const result = await processPayment(card)
    if (result.ok) {
      grantSubscription(category!.slug)
      setStatus('done')
      setMessage(result.message)
    } else {
      setStatus('error')
      setMessage(result.message)
    }
  }

  // Pantalla de éxito
  if (status === 'done') {
    return (
      <PageWrapper>
        <section className="flex min-h-screen items-center justify-center bg-paper px-5 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-soft"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <Check className="h-8 w-8" />
            </div>
            <h1 className="mt-5 font-display text-2xl font-bold text-brand-900">¡Suscripción activada!</h1>
            <p className="mt-2 text-sm text-ink/65">
              Ya tienes acceso de por vida a <strong>{category.title}</strong>. Disfruta todos los videos.
            </p>
            <Link to={`/aula/categoria/${category.slug}`} className="btn-brand mt-6 w-full">
              <Check className="h-4 w-4" /> Ir a mis videos
            </Link>
            <button
              onClick={() => navigate('/aula/mi-cuenta')}
              className="mt-3 text-sm font-medium text-brand-600 hover:underline"
            >
              Ver mis suscripciones
            </button>
          </motion.div>
        </section>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <section className="min-h-screen bg-paper pt-24 pb-16">
        <div className="container-pro max-w-5xl">
          <Link
            to={`/aula/categoria/${category.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:gap-3"
          >
            <ArrowLeft className="h-4 w-4" /> Volver
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-5">
            {/* Formulario de pago */}
            <div className="lg:col-span-3">
              <h1 className="font-display text-2xl font-bold text-brand-900">Pago seguro</h1>
              <p className="mt-1 text-sm text-ink/60">Completa los datos de tu tarjeta para suscribirte.</p>

              {/* Tarjetas de prueba */}
              <div className="mt-5 rounded-2xl border border-dashed border-brand-200 bg-brand-50/50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-brand-600">
                  Tarjetas de prueba — clic para copiar y rellenar
                </p>
                <div className="mt-3 space-y-2">
                  {TEST_CARDS.map((tc) => (
                    <button
                      key={tc.number}
                      type="button"
                      onClick={() => copyCard(tc.number)}
                      className="flex w-full items-center justify-between rounded-xl bg-white px-4 py-2.5 text-left ring-1 ring-brand-100 transition hover:ring-brand-300"
                    >
                      <span className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-brand-500" />
                        <span className="font-mono text-sm text-brand-900">{tc.number}</span>
                      </span>
                      <span className="flex items-center gap-2">
                        <span
                          className={`text-[11px] font-bold ${
                            tc.kind === 'ok' ? 'text-green-600' : 'text-red-500'
                          }`}
                        >
                          {tc.label}
                        </span>
                        {copied === tc.number ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4 text-ink/40" />
                        )}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-ink/45">
                  Venc.: cualquiera (ej. 12/28) · CVV: cualquiera (ej. 123)
                </p>
              </div>

              <form onSubmit={handlePay} className="mt-6 space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink/80">Número de tarjeta</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-3.5 h-4 w-4 text-ink/40" />
                    <input
                      value={card.number}
                      onChange={(e) => onNumber(e.target.value)}
                      required
                      inputMode="numeric"
                      placeholder="4242 4242 4242 4242"
                      className="w-full rounded-xl border border-brand-100 bg-white py-3 pl-9 pr-4 font-mono text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-50"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink/80">Titular de la tarjeta</label>
                  <input
                    value={card.name}
                    onChange={(e) => set('name', e.target.value)}
                    required
                    placeholder="Nombre y apellido"
                    className="w-full rounded-xl border border-brand-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink/80">Vencimiento</label>
                    <input
                      value={card.expiry}
                      onChange={(e) => onExpiry(e.target.value)}
                      required
                      placeholder="MM/AA"
                      className="w-full rounded-xl border border-brand-100 bg-white px-4 py-3 font-mono text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-50"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink/80">CVV</label>
                    <input
                      value={card.cvv}
                      onChange={(e) => set('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                      required
                      inputMode="numeric"
                      placeholder="123"
                      className="w-full rounded-xl border border-brand-100 bg-white px-4 py-3 font-mono text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-50"
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{message}</p>
                )}

                <button type="submit" disabled={status === 'processing'} className="btn-gold w-full">
                  {status === 'processing' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Procesando pago...
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" /> Pagar {category.currency} {category.price}
                    </>
                  )}
                </button>
                <p className="flex items-center justify-center gap-1.5 text-xs text-ink/45">
                  <ShieldCheck className="h-3.5 w-3.5" /> Pago simulado para la demostración
                </p>
              </form>
            </div>

            {/* Resumen */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-card ring-1 ring-brand-100">
                <h2 className="font-display text-lg font-bold text-brand-900">Resumen</h2>
                <div className="mt-4 flex gap-3">
                  <img src={category.cover} alt="" className="h-16 w-20 rounded-lg object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-brand-900">{category.title}</p>
                    <p className="text-xs text-ink/55">{category.videos.length} videos · {category.level}</p>
                  </div>
                </div>
                <ul className="mt-5 space-y-2 border-t border-brand-50 pt-4 text-sm text-ink/70">
                  <li className="flex items-center gap-2">
                    <InfinityIcon className="h-4 w-4 text-gold-500" /> Acceso de por vida
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-gold-500" /> Todos los videos de la categoría
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-gold-500" /> Sin mensualidades
                  </li>
                </ul>
                <div className="mt-5 flex items-center justify-between border-t border-brand-50 pt-4">
                  <span className="text-sm text-ink/60">Total</span>
                  <span className="font-display text-2xl font-extrabold text-brand-900">
                    {category.currency} {category.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
