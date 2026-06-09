import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Star } from 'lucide-react'
import { whatsappLink } from '@/lib/constants'
import { stock, reciclada } from '@/lib/img'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // Parallax suave de la imagen del hero
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.8])

  return (
    <section ref={ref} className="relative flex min-h-screen items-center overflow-hidden">
      {/* Fondo con parallax */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 -z-10 scale-110">
        <img src={stock('hero-fisio.jpg')} alt="" className="h-full w-full object-cover" />
      </motion.div>
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-900 via-brand-800/90 to-brand-700/70"
      />

      <div className="container-pro grid items-center gap-12 pt-28 pb-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-300 backdrop-blur"
          >
            <ShieldCheck className="h-4 w-4" />
            +20 años recuperando vidas sin dolor
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-6 font-display text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-6xl"
          >
            Tu salud, la pasión que me{' '}
            <span className="bg-gold-gradient bg-clip-text text-transparent">mueve cada día</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-brand-50/90"
          >
            Si tienes una lesión, has pasado por una cirugía o quieres vivir sin dolor, te ayudo a
            lograrlo con un enfoque clínico personalizado y técnicas basadas en evidencia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-gold">
              <WhatsAppIcon className="h-5 w-5" />
              Agenda tu cita
            </a>
            <Link to="/programas" className="btn border-2 border-white/40 text-white hover:bg-white hover:text-brand-700">
              Ver programas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-10 flex items-center gap-3 text-sm text-brand-50/80"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
              ))}
            </div>
            <span>Cientos de pacientes recuperados en La Molina, San Borja y Los Olivos</span>
          </motion.div>
        </div>

        {/* Tarjeta flotante con foto de Alex */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.45, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:col-span-5 lg:block"
        >
          <div className="relative ml-auto w-fit">
            <div className="absolute -inset-4 rounded-[2rem] bg-gold-gradient/30 blur-2xl" />
            <div className="relative animate-float overflow-hidden rounded-[2rem] bg-white/95 p-2 shadow-soft backdrop-blur">
              <img
                src={reciclada('alex2.png')}
                alt="Alex Silva, fisioterapeuta"
                className="h-[460px] w-[360px] rounded-[1.6rem] object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-4 -left-6 rounded-2xl bg-white px-5 py-3 shadow-card">
              <p className="font-display text-2xl font-bold text-brand-600">+20</p>
              <p className="text-xs text-ink/60">años de experiencia</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/50 p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="h-2 w-1 rounded-full bg-white"
          />
        </div>
      </motion.div>
    </section>
  )
}
