import { motion } from 'framer-motion'
import { whatsappLink } from '@/lib/constants'
import { stock } from '@/lib/img'
import { fadeUp, inView } from '@/lib/motion'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'

export default function CtaBand() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 -z-10">
        <img src={stock('cta-bg.jpg')} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-brand-900/85" />
      </div>
      <motion.div
        variants={fadeUp}
        initial={inView.initial}
        whileInView={inView.whileInView}
        viewport={inView.viewport}
        className="container-pro text-center"
      >
        <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
          Si tienes una lesión, has pasado por una cirugía o quieres vivir sin dolor, te podemos
          ayudar a lograrlo.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-brand-50/80">
          Da el primer paso hoy. Escríbeme y diseñamos juntos tu camino de recuperación.
        </p>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold mx-auto mt-8"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Quiero empezar mi recuperación
        </a>
      </motion.div>
    </section>
  )
}
