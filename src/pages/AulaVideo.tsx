import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Lock, PlayCircle, Check } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import { getVideo } from '@/data/aula'
import { useAula } from '@/lib/aulaAuth'

export default function AulaVideo() {
  const { id } = useParams()
  const found = id ? getVideo(id) : undefined
  const { isSubscribed } = useAula()

  if (!found) return <Navigate to="/aula" replace />

  const { video, category } = found
  const hasAccess = isSubscribed(category.slug) || video.free
  const index = category.videos.findIndex((v) => v.id === video.id)

  return (
    <PageWrapper>
      <section className="min-h-screen bg-brand-900 pt-24 pb-16">
        <div className="container-pro max-w-5xl">
          <Link
            to={`/aula/categoria/${category.slug}`}
            className="inline-flex items-center gap-1.5 text-sm text-brand-50/80 hover:text-gold-300"
          >
            <ArrowLeft className="h-4 w-4" /> {category.title}
          </Link>

          {/* Reproductor o candado */}
          <div className="mt-5 overflow-hidden rounded-2xl bg-black shadow-soft">
            {hasAccess ? (
              <div className="relative aspect-video w-full">
                <iframe
                  src={video.videoUrl}
                  title={video.title}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="flex aspect-video w-full flex-col items-center justify-center bg-brand-800 p-6 text-center text-white">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10"
                >
                  <Lock className="h-8 w-8 text-gold-400" />
                </motion.div>
                <h2 className="mt-4 font-display text-xl font-bold">Este video está bloqueado</h2>
                <p className="mt-2 max-w-md text-sm text-brand-50/80">
                  Suscríbete a la categoría <strong>{category.title}</strong> para desbloquear este y
                  todos los videos, con acceso de por vida.
                </p>
                <Link to={`/aula/checkout/${category.slug}`} className="btn-gold mt-5">
                  <Lock className="h-4 w-4" /> Suscribirme por {category.currency} {category.price}
                </Link>
              </div>
            )}
          </div>

          {/* Info del video */}
          <div className="mt-6 rounded-2xl bg-white p-6 shadow-card">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gold-600">
              {hasAccess ? (
                <>
                  <Check className="h-4 w-4" /> {video.free && !isSubscribed(category.slug) ? 'Vista previa gratuita' : 'Acceso completo'}
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" /> Contenido bloqueado
                </>
              )}
            </div>
            <h1 className="mt-2 font-display text-2xl font-bold text-brand-900">
              {index + 1}. {video.title}
            </h1>
            <p className="mt-1 text-sm text-ink/55">
              {category.title} · {video.duration} min
            </p>
          </div>

          {/* Siguientes videos */}
          <div className="mt-6">
            <h3 className="font-display text-lg font-bold text-white">Más videos de esta categoría</h3>
            <div className="mt-4 space-y-2">
              {category.videos
                .filter((v) => v.id !== video.id)
                .slice(0, 4)
                .map((v) => {
                  const unlocked = isSubscribed(category.slug) || v.free
                  return (
                    <Link
                      key={v.id}
                      to={`/aula/video/${v.id}`}
                      className="flex items-center gap-3 rounded-xl bg-white/5 p-3 text-white transition hover:bg-white/10"
                    >
                      {unlocked ? (
                        <PlayCircle className="h-5 w-5 shrink-0 text-gold-400" />
                      ) : (
                        <Lock className="h-5 w-5 shrink-0 text-brand-50/50" />
                      )}
                      <span className="flex-1 truncate text-sm">{v.title}</span>
                      <span className="shrink-0 text-xs text-brand-50/50">{v.duration}</span>
                    </Link>
                  )
                })}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
