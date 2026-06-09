import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, X, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionTitle from '@/components/ui/SectionTitle'
import { PRODUCTS, type Product, type Audience } from '@/data/products'
import { whatsappLink } from '@/lib/constants'
import { stagger, fadeUp, inView } from '@/lib/motion'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'

type Filter = 'todos' | Audience

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'paciente', label: 'Para pacientes' },
  { key: 'profesional', label: 'Para profesionales' },
]

// Catálogo de productos filtrable + modal de detalle. Funcionalidad #3 de conversión.
export default function ProductosCatalogo() {
  const [filter, setFilter] = useState<Filter>('todos')
  const [selected, setSelected] = useState<Product | null>(null)

  const items = PRODUCTS.filter((p) => filter === 'todos' || p.audience === filter)

  return (
    <section className="section-pad bg-paper">
      <div className="container-pro">
        <SectionTitle
          eyebrow="Productos"
          title="Herramientas que marcan la diferencia"
          subtitle="Productos clínicos diseñados por Alex Silva para pacientes y profesionales. Consulta disponibilidad por WhatsApp."
        />

        {/* Filtros */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`relative rounded-full px-5 py-2 text-sm font-semibold transition ${
                filter === f.key ? 'text-white' : 'text-ink/60 hover:text-brand-600'
              }`}
            >
              {filter === f.key && (
                <motion.span
                  layoutId="product-filter"
                  className="absolute inset-0 -z-10 rounded-full bg-brand-gradient"
                />
              )}
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          variants={stagger}
          initial={inView.initial}
          whileInView={inView.whileInView}
          viewport={inView.viewport}
          className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {items.map((p) => (
              <motion.article
                layout
                key={p.slug}
                variants={fadeUp}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -8 }}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-brand-100/60"
              >
                <div className="relative flex h-48 items-center justify-center overflow-hidden bg-brand-50 p-4">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                  {p.comingSoon && (
                    <span className="absolute right-3 top-3 rounded-full bg-gold-500 px-3 py-1 text-[11px] font-bold uppercase text-brand-900">
                      Próximamente
                    </span>
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-brand-600">
                    {p.audience === 'paciente' ? 'Paciente' : 'Profesional'}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-bold text-brand-900">{p.name}</h3>
                  <p className="text-xs font-medium text-gold-600">{p.tagline}</p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70 line-clamp-3">
                    {p.shortDesc}
                  </p>
                  <button
                    onClick={() => setSelected(p)}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition hover:gap-3"
                  >
                    Ver detalle
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal de detalle */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-brand-900/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative grid max-h-[90vh] w-full max-w-3xl gap-6 overflow-y-auto rounded-3xl bg-white p-6 shadow-soft sm:grid-cols-2 sm:p-8"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 rounded-full bg-brand-50 p-2 text-ink/50 transition hover:bg-brand-100 hover:text-ink"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center justify-center rounded-2xl bg-brand-50 p-6">
                <img src={selected.image} alt={selected.name} className="max-h-72 w-full object-contain" />
              </div>

              <div>
                <span className="eyebrow">{selected.tagline}</span>
                <h3 className="mt-2 font-display text-2xl font-bold text-brand-900">{selected.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{selected.longDesc}</p>
                <ul className="mt-5 space-y-2">
                  {selected.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-ink/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={whatsappLink(`Hola Alex, quiero consultar por el producto "${selected.name}".`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn bg-[#25D366] text-white hover:brightness-105"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Consultar por WhatsApp
                  </a>
                  <Link
                    to={`/productos/${selected.slug}`}
                    className="btn-outline"
                    onClick={() => setSelected(null)}
                  >
                    Ver página completa
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
