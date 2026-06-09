import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, whatsappLink } from '@/lib/constants'
import { reciclada } from '@/lib/img'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Cierra el menú móvil al navegar
  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/90 shadow-card backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="container-pro flex h-18 items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2 py-2" aria-label="Inicio">
          <img src={reciclada('logo.png')} alt="Alex Silva Fisioterapia" className="h-11 w-auto" />
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `relative text-sm font-medium transition-colors ${
                    isActive ? 'text-brand-600' : 'text-ink/80 hover:text-brand-600'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-gold-gradient"
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-gold">
            <WhatsAppIcon className="h-4 w-4" />
            Agenda tu cita
          </a>
        </div>

        <button
          className="rounded-lg p-2 text-brand-800 lg:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menú"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-white shadow-card lg:hidden"
          >
            <ul className="container-pro flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `block rounded-lg px-3 py-3 text-base font-medium ${
                        isActive ? 'bg-brand-50 text-brand-600' : 'text-ink/80'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li className="mt-2">
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-gold w-full">
                  <WhatsAppIcon className="h-4 w-4" />
                  Agenda tu cita
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
