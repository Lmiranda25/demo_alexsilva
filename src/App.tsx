import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import WhatsAppFloat from './components/layout/WhatsAppFloat'
import ScrollToTop from './components/layout/ScrollToTop'
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Programas from './pages/Programas'
import Productos from './pages/Productos'
import ProductoDetalle from './pages/ProductoDetalle'
import Contacto from './pages/Contacto'
import Aula from './pages/Aula'
import AulaCategoria from './pages/AulaCategoria'
import AulaVideo from './pages/AulaVideo'
import AulaCheckout from './pages/AulaCheckout'
import AulaLogin from './pages/AulaLogin'
import AulaMiCuenta from './pages/AulaMiCuenta'

export default function App() {
  const location = useLocation()
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/programas" element={<Programas />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/productos/:slug" element={<ProductoDetalle />} />
            <Route path="/contacto" element={<Contacto />} />
            {/* Aula virtual */}
            <Route path="/aula" element={<Aula />} />
            <Route path="/aula/login" element={<AulaLogin />} />
            <Route path="/aula/mi-cuenta" element={<AulaMiCuenta />} />
            <Route path="/aula/categoria/:slug" element={<AulaCategoria />} />
            <Route path="/aula/video/:id" element={<AulaVideo />} />
            <Route path="/aula/checkout/:slug" element={<AulaCheckout />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
