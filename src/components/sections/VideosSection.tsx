import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import { SOCIALS } from '@/lib/constants'
import { reciclada } from '@/lib/img'
import { scaleIn, inView } from '@/lib/motion'

export default function VideosSection() {
  return (
    <section className="section-pad bg-brand-gradient">
      <div className="container-pro">
        <SectionTitle
          eyebrow="Aprende gratis"
          title="Videos gratuitos para tu bienestar"
          subtitle="Consejos, ejercicios y rutinas para cuidar tu cuerpo desde casa, directo desde mi canal de YouTube."
          light
        />

        <motion.a
          href={SOCIALS.youtube}
          target="_blank"
          rel="noopener noreferrer"
          variants={scaleIn}
          initial={inView.initial}
          whileInView={inView.whileInView}
          viewport={inView.viewport}
          className="group relative mx-auto mt-12 block max-w-3xl overflow-hidden rounded-3xl shadow-soft"
        >
          <img
            src={reciclada('youtube-alex.png')}
            alt="Canal de YouTube de Alex Silva"
            className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-brand-900/30 transition group-hover:bg-brand-900/20">
            <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-brand-600 shadow-glow">
              <span className="absolute inset-0 animate-pulseRing rounded-full bg-white/60" />
              <Play className="relative ml-1 h-8 w-8 fill-current" />
            </span>
          </div>
        </motion.a>
      </div>
    </section>
  )
}
