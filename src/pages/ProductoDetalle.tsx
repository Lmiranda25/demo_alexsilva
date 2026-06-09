import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, ArrowLeft } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import { getProduct, PRODUCTS } from '@/data/products'
import { whatsappLink } from '@/lib/constants'
import { slideRight, slideLeft, fadeUp, stagger, inView } from '@/lib/motion'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'

export default function ProductoDetalle() {
  const { slug } = useParams()
  const product = slug ? getProduct(slug) : undefined

  if (!product) return <Navigate to="/productos" replace />

  const related = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3)

  return (
    <PageWrapper>
      <section className="bg-brand-50 pt-28 pb-16">
        <div className="container-pro">
          <Link
            to="/productos"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:gap-3 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a productos
          </Link>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
            <motion.div
              variants={slideRight}
              initial="hidden"
              animate="show"
              className="relative flex items-center justify-center rounded-3xl bg-white p-10 shadow-soft"
            >
              {product.comingSoon && (
                <span className="absolute right-5 top-5 rounded-full bg-gold-500 px-4 py-1.5 text-xs font-bold uppercase text-brand-900">
                  Próximamente
                </span>
              )}
              <img src={product.image} alt={product.name} className="max-h-96 w-full object-contain" />
            </motion.div>

            <motion.div variants={slideLeft} initial="hidden" animate="show">
              <span className="eyebrow">{product.tagline}</span>
              <h1 className="mt-2 font-display text-4xl font-extrabold text-brand-900">{product.name}</h1>
              <p className="mt-4 text-base leading-relaxed text-ink/70">{product.longDesc}</p>

              <motion.ul
                variants={stagger}
                initial="hidden"
                animate="show"
                className="mt-7 space-y-3"
              >
                {product.features.map((f) => (
                  <motion.li key={f} variants={fadeUp} className="flex items-start gap-3 text-ink/80">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-gradient text-brand-900">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm font-medium">{f}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="mt-9 rounded-2xl bg-white p-5 shadow-card">
                <p className="text-sm text-ink/60">Precio</p>
                <p className="font-display text-lg font-bold text-brand-900">Consulta por WhatsApp</p>
                <a
                  href={whatsappLink(`Hola Alex, quiero información y precio de "${product.name}".`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-[#25D366] mt-4 w-full text-white hover:brightness-105"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Consultar disponibilidad
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Relacionados */}
      <section className="section-pad bg-paper">
        <div className="container-pro">
          <h2 className="font-display text-2xl font-bold text-brand-900">Otros productos</h2>
          <motion.div
            variants={stagger}
            initial={inView.initial}
            whileInView={inView.whileInView}
            viewport={inView.viewport}
            className="mt-8 grid gap-6 sm:grid-cols-3"
          >
            {related.map((p) => (
              <motion.div key={p.slug} variants={fadeUp}>
                <Link
                  to={`/productos/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-brand-100/60 transition hover:-translate-y-1.5"
                >
                  <div className="flex h-40 items-center justify-center bg-brand-50 p-4">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-contain transition group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-brand-900">{p.name}</h3>
                    <p className="mt-1 text-xs text-gold-600">{p.tagline}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}
