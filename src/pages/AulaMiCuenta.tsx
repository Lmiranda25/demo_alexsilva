import { Link, Navigate, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogOut, PlayCircle, Lock, GraduationCap, Infinity as InfinityIcon } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import { useAula } from '@/lib/aulaAuth'
import { CATEGORIES } from '@/data/aula'

export default function AulaMiCuenta() {
  const { user, logout } = useAula()
  const navigate = useNavigate()

  if (!user) return <Navigate to="/aula/login?next=/aula/mi-cuenta" replace />

  const mine = CATEGORIES.filter((c) => user.subscriptions.includes(c.slug))
  const others = CATEGORIES.filter((c) => !user.subscriptions.includes(c.slug))

  return (
    <PageWrapper>
      <section className="min-h-screen bg-paper pt-24 pb-16">
        <div className="container-pro">
          {/* Cabecera */}
          <div className="flex flex-col gap-4 rounded-3xl bg-brand-gradient p-6 text-white shadow-soft sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 font-display text-xl font-bold">
                {user.name.charAt(0)}
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gold-300">Mi cuenta</p>
                <h1 className="font-display text-2xl font-bold">{user.name}</h1>
                <p className="text-sm text-brand-50/80">{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => {
                logout()
                navigate('/aula')
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold transition hover:bg-white/20"
            >
              <LogOut className="h-4 w-4" /> Cerrar sesión
            </button>
          </div>

          {/* Mis suscripciones */}
          <h2 className="mt-10 font-display text-xl font-bold text-brand-900">Mis suscripciones</h2>
          {mine.length === 0 ? (
            <div className="mt-4 rounded-2xl bg-white p-8 text-center shadow-card ring-1 ring-brand-100/60">
              <GraduationCap className="mx-auto h-10 w-10 text-brand-300" />
              <p className="mt-3 font-medium text-brand-900">Aún no tienes categorías suscritas</p>
              <p className="mt-1 text-sm text-ink/60">Explora el aula y suscríbete a la que necesites.</p>
              <Link to="/aula" className="btn-brand mt-5">
                Explorar el aula
              </Link>
            </div>
          ) : (
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {mine.map((c) => (
                <motion.div
                  key={c.slug}
                  whileHover={{ y: -6 }}
                  className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-brand-100/60"
                >
                  <Link to={`/aula/categoria/${c.slug}`}>
                    <div className="relative h-32">
                      <img src={c.cover} alt={c.title} className="h-full w-full object-cover" />
                      <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-green-500 px-2.5 py-0.5 text-[11px] font-bold text-white">
                        <InfinityIcon className="h-3 w-3" /> De por vida
                      </span>
                    </div>
                    <div className="p-4">
                      <p className="font-display font-bold text-brand-900">{c.title}</p>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-ink/55">
                        <PlayCircle className="h-3.5 w-3.5" /> {c.videos.length} videos
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* Otras categorías */}
          {others.length > 0 && (
            <>
              <h2 className="mt-12 font-display text-xl font-bold text-brand-900">Categorías disponibles</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((c) => (
                  <div
                    key={c.slug}
                    className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card ring-1 ring-brand-100/60"
                  >
                    <img src={c.cover} alt="" className="h-16 w-20 shrink-0 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-brand-900">{c.title}</p>
                      <p className="text-xs text-ink/55">
                        {c.currency} {c.price} · de por vida
                      </p>
                    </div>
                    <Link
                      to={`/aula/checkout/${c.slug}`}
                      className="shrink-0 rounded-lg bg-gold-gradient px-3 py-2 text-xs font-bold text-brand-900"
                    >
                      <Lock className="mr-1 inline h-3 w-3" /> Suscribirme
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </PageWrapper>
  )
}
