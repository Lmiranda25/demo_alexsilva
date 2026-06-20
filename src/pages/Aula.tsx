import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PlayCircle, Lock, Check, GraduationCap, Infinity as InfinityIcon } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import PageHero from '@/components/ui/PageHero'
import { CATEGORIES, totalVideos } from '@/data/aula'
import { useAula } from '@/lib/aulaAuth'
import { stock } from '@/lib/img'
import { stagger, fadeUp, inView } from '@/lib/motion'

export default function Aula() {
  const { user, isSubscribed } = useAula()

  return (
    <PageWrapper>
      <PageHero
        crumb="Aula Virtual"
        eyebrow="Formación profesional online"
        title="Aula Virtual de Alex Silva"
        subtitle="Categorías de videos para fisioterapeutas. Suscríbete a la que necesites y accede de por vida."
        bg={stock('terapia-manual.jpg')}
      />

      {/* Barra de valor */}
      <section className="border-b border-brand-100 bg-white">
        <div className="container-pro grid gap-4 py-6 sm:grid-cols-3">
          {[
            { icon: GraduationCap, t: `${CATEGORIES.length} categorías`, s: `${totalVideos} videos en total` },
            { icon: InfinityIcon, t: 'Acceso de por vida', s: 'Paga una vez, mira siempre' },
            { icon: PlayCircle, t: 'Vistas previas gratis', s: 'Mira un video antes de suscribirte' },
          ].map((x) => (
            <div key={x.t} className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <x.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-sm font-bold text-brand-900">{x.t}</p>
                <p className="text-xs text-ink/60">{x.s}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad bg-paper">
        <div className="container-pro">
          {!user && (
            <div className="mb-8 flex flex-col items-center justify-between gap-3 rounded-2xl bg-brand-50 p-5 text-center sm:flex-row sm:text-left">
              <p className="text-sm text-ink/75">
                ¿Ya tienes cuenta? Inicia sesión para ver tus categorías suscritas.
              </p>
              <Link to="/aula/login" className="btn-outline shrink-0 px-5 py-2.5 text-sm">
                Iniciar sesión
              </Link>
            </div>
          )}

          <motion.div
            variants={stagger}
            initial={inView.initial}
            whileInView={inView.whileInView}
            viewport={inView.viewport}
            className="grid gap-7 md:grid-cols-2 lg:grid-cols-3"
          >
            {CATEGORIES.map((c) => {
              const subscribed = isSubscribed(c.slug)
              return (
                <motion.article
                  key={c.slug}
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-brand-100/60"
                >
                  <Link to={`/aula/categoria/${c.slug}`} className="relative block h-44 overflow-hidden">
                    <img
                      src={c.cover}
                      alt={c.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-brand-600">
                      {c.level}
                    </span>
                    {subscribed && (
                      <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-green-500 px-3 py-1 text-[11px] font-bold text-white">
                        <Check className="h-3 w-3" /> Suscrito
                      </span>
                    )}
                    <span className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs font-medium text-white">
                      <PlayCircle className="h-4 w-4" /> {c.videos.length} videos
                    </span>
                  </Link>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-bold leading-snug text-brand-900">{c.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/65">{c.subtitle}</p>

                    <div className="mt-4 flex items-center justify-between border-t border-brand-50 pt-4">
                      {subscribed ? (
                        <span className="flex items-center gap-1.5 text-sm font-bold text-green-600">
                          <Check className="h-4 w-4" /> Con acceso
                        </span>
                      ) : (
                        <span className="font-display text-lg font-extrabold text-brand-900">
                          {c.currency} {c.price}
                        </span>
                      )}
                      <Link
                        to={`/aula/categoria/${c.slug}`}
                        className={subscribed ? 'btn-brand px-4 py-2 text-xs' : 'btn-gold px-4 py-2 text-xs'}
                      >
                        {subscribed ? (
                          <>
                            <PlayCircle className="h-4 w-4" /> Ver videos
                          </>
                        ) : (
                          <>
                            <Lock className="h-3.5 w-3.5" /> Suscribirme
                          </>
                        )}
                      </Link>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}
