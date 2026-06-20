import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Mail, User, ArrowLeft, Info, GraduationCap } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import { useAula, DEMO_CREDENTIALS } from '@/lib/aulaAuth'

export default function AulaLogin() {
  const { login, register } = useAula()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const next = params.get('next') || '/aula'

  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function submit(e: FormEvent) {
    e.preventDefault()
    setError('')
    const res = mode === 'login' ? login(email, password) : register(name, email, password)
    if (res.ok) navigate(next)
    else setError(res.error || 'Ocurrió un error.')
  }

  return (
    <PageWrapper>
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-gradient px-5 py-24">
        <div className="absolute -left-20 top-24 h-60 w-60 rounded-full bg-gold-500/15 blur-3xl" />
        <div className="absolute -right-10 bottom-10 h-72 w-72 rounded-full bg-brand-400/20 blur-3xl" />

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-md">
          <Link to="/aula" className="mb-6 inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-gold-300">
            <ArrowLeft className="h-4 w-4" /> Volver al aula
          </Link>

          <div className="rounded-3xl bg-white p-7 shadow-soft sm:p-9">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-white">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h1 className="mt-4 font-display text-2xl font-bold text-brand-900">
              {mode === 'login' ? 'Ingresa al aula virtual' : 'Crea tu cuenta'}
            </h1>
            <p className="mt-1 text-sm text-ink/60">
              {mode === 'login'
                ? 'Accede a tus categorías y videos.'
                : 'Regístrate para suscribirte a las categorías.'}
            </p>

            <form onSubmit={submit} className="mt-6 space-y-4">
              {mode === 'register' && (
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-4 w-4 text-ink/40" />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Nombre completo"
                    className="w-full rounded-xl border border-brand-100 bg-brand-50/40 py-3 pl-9 pr-4 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-50"
                  />
                </div>
              )}
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-4 w-4 text-ink/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Correo electrónico"
                  className="w-full rounded-xl border border-brand-100 bg-brand-50/40 py-3 pl-9 pr-4 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-50"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-4 w-4 text-ink/40" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Contraseña"
                  className="w-full rounded-xl border border-brand-100 bg-brand-50/40 py-3 pl-9 pr-4 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-50"
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button type="submit" className="btn-brand w-full">
                {mode === 'login' ? 'Ingresar' : 'Crear cuenta'}
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-ink/60">
              {mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
              <button
                onClick={() => {
                  setMode(mode === 'login' ? 'register' : 'login')
                  setError('')
                }}
                className="font-semibold text-brand-600 hover:underline"
              >
                {mode === 'login' ? 'Regístrate' : 'Inicia sesión'}
              </button>
            </p>

            {mode === 'login' && (
              <div className="mt-5 flex items-start gap-2 rounded-xl bg-gold-50 p-3 text-xs text-brand-800">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                <span>
                  <strong>Demo:</strong> correo <strong>{DEMO_CREDENTIALS.email}</strong> · contraseña{' '}
                  <strong>{DEMO_CREDENTIALS.password}</strong>
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </section>
    </PageWrapper>
  )
}
