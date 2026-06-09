import { Link } from 'react-router-dom'
import { MapPin, Phone, Instagram, Facebook, Youtube, Linkedin } from 'lucide-react'
import { CONTACT, SOCIALS, NAV_LINKS, whatsappLink } from '@/lib/constants'
import { reciclada } from '@/lib/img'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'

const socialItems = [
  { icon: Instagram, href: SOCIALS.instagram, label: 'Instagram' },
  { icon: Facebook, href: SOCIALS.facebook, label: 'Facebook' },
  { icon: Youtube, href: SOCIALS.youtube, label: 'YouTube' },
  { icon: Linkedin, href: SOCIALS.linkedin, label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer className="bg-brand-gradient text-white">
      <div className="container-pro grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="inline-flex rounded-xl bg-white px-4 py-3">
            <img src={reciclada('logo.png')} alt="Alex Silva Fisioterapia" className="h-10 w-auto" />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-50/80">
            Fisioterapeuta con +20 años de experiencia. Tu salud, la pasión que me mueve cada día.
          </p>
          <div className="mt-5 flex gap-3">
            {socialItems.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-gold-500 hover:text-brand-900"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold">Navegación</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-brand-50/80">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition hover:text-gold-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold">Contacto</h4>
          <ul className="mt-4 space-y-3 text-sm text-brand-50/80">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
              <span>{CONTACT.addressMain}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 shrink-0 text-gold-400" />
              <span>{CONTACT.phone}</span>
            </li>
          </ul>
          <p className="mt-4 text-xs uppercase tracking-wider text-brand-50/60">
            {CONTACT.locations.join(' · ')}
          </p>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold">Empieza hoy</h4>
          <p className="mt-4 text-sm text-brand-50/80">
            Da el primer paso hacia una vida sin dolor. Escríbeme y conversemos.
          </p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-105"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Escríbeme por WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-pro flex flex-col items-center justify-between gap-2 py-5 text-xs text-brand-50/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Alex Silva Fisioterapia. Todos los derechos reservados.</p>
          <p>Hecho con dedicación para tu bienestar.</p>
        </div>
      </div>
    </footer>
  )
}
