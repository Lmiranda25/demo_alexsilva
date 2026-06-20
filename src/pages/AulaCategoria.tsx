import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PlayCircle, Lock, Check, ArrowLeft, Infinity as InfinityIcon, ShieldCheck } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import { getCategory } from '@/data/aula'
import { useAula } from '@/lib/aulaAuth'
import { stagger, fadeUp, inView } from '@/lib/motion'

export default function AulaCategoria() {
  const { slug } = useParams()
  const category = slug ? getCategory(slug) : undefined
  const { isSubscribed } = useAula()

  if (!category) return <Navigate to="/aula" replace />

  const subscribed = isSubscribed(category.slug)

  return (
    <PageWrapper>
      {/* Cabecera de la categoría */}
      <section className="relative overflow-hidden bg-brand-gradient pt-28 pb-14 text-white">
        <div className="absolute inset-0 -z-0 opacity-20">
          <img src={category.cover} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="container-pro relative">
          <Link to="/aula" className="inline-flex items-center gap-1.5 text-sm text-brand-50/80 hover:text-gold-300">
            <ArrowLeft className="h-4 w-4" /> Volver al aula
          </Link>
          <div className="mt-6 grid items-center gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-gold-300">
                {category.level}
              </span>
              <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
                {category.title}
              </h1>
              <p className="mt-3 max-w-xl text-brand-50/85">{category.description}</p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-brand-50/80">
                <span className="flex items-center gap-2">
                  <PlayCircle className="h-4 w-4 text-gold-400" /> {category.videos.length} videos
                </span>
                <span className="flex items-center gap-2">
                  <InfinityIcon className="h-4 w-4 text-gold-400" /> Acceso de por vida
                </span>
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-gold-400" /> Instructor: PT. Alex Silva
                </span>
              </div>
            </div>

            {/* Tarjeta de suscripción */}
            <div className="rounded-2xl bg-white p-6 text-ink shadow-soft">
              {subscribed ? (
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Check className="h-6 w-6" />
                  </div>
                  <p className="mt-3 font-display text-lg font-bold text-brand-900">¡Ya tienes acceso!</p>
                  <p className="mt-1 text-sm text-ink/60">Disfruta todos los videos de esta categoría.</p>
                </div>
              ) : (
                <>
                  <p className="text-sm text-ink/55">Suscripción única</p>
                  <p className="font-display text-3xl font-extrabold text-brand-900">
                    {category.currency} {category.price}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-green-600">
                    <InfinityIcon className="h-3.5 w-3.5" /> Acceso de por vida
                  </p>
                  <Link to={`/aula/checkout/${category.slug}`} className="btn-gold mt-5 w-full">
                    <Lock className="h-4 w-4" /> Suscribirme ahora
                  </Link>
                  <p className="mt-3 text-center text-xs text-ink/45">
                    Pago único · Sin mensualidades
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Lista de videos */}
      <section className="section-pad bg-paper">
        <div className="container-pro max-w-3xl">
          <h2 className="font-display text-xl font-bold text-brand-900">Contenido de la categoría</h2>
          <p className="mt-1 text-sm text-ink/60">
            {subscribed
              ? 'Tienes acceso completo. Haz clic en cualquier video.'
              : 'Mira la vista previa gratuita. Suscríbete para desbloquear todos los videos.'}
          </p>

          <motion.ol
            variants={stagger}
            initial={inView.initial}
            whileInView={inView.whileInView}
            viewport={inView.viewport}
            className="mt-6 space-y-3"
          >
            {category.videos.map((v, i) => {
              const unlocked = subscribed || v.free
              return (
                <motion.li key={v.id} variants={fadeUp}>
                  {unlocked ? (
                    <Link
                      to={`/aula/video/${v.id}`}
                      className="group flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card ring-1 ring-brand-100/60 transition hover:-translate-y-0.5 hover:shadow-soft"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-white">
                        <PlayCircle className="h-6 w-6" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-brand-900">
                          {i + 1}. {v.title}
                        </p>
                        <p className="text-xs text-ink/55">{v.duration} min</p>
                      </div>
                      {v.free && !subscribed && (
                        <span className="shrink-0 rounded-full bg-gold-100 px-2.5 py-0.5 text-[11px] font-bold text-gold-700">
                          Gratis
                        </span>
                      )}
                    </Link>
                  ) : (
                    <div className="flex items-center gap-4 rounded-2xl bg-brand-50/50 p-4 ring-1 ring-brand-100/60">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-400">
                        <Lock className="h-5 w-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-ink/50">
                          {i + 1}. {v.title}
                        </p>
                        <p className="text-xs text-ink/40">{v.duration} min · Bloqueado</p>
                      </div>
                      <Link
                        to={`/aula/checkout/${category.slug}`}
                        className="shrink-0 text-xs font-semibold text-brand-600 hover:underline"
                      >
                        Desbloquear
                      </Link>
                    </div>
                  )}
                </motion.li>
              )
            })}
          </motion.ol>
        </div>
      </section>
    </PageWrapper>
  )
}
