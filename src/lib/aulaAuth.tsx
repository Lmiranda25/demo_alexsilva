import { createContext, useContext, useState, type ReactNode } from 'react'

// ============================================================================
// AULA VIRTUAL — Contexto de autenticación y suscripciones (SIMULADO).
//
// NOTA PARA BACKEND: toda la lógica aquí es una simulación en memoria pensada
// como contrato del frontend. Reemplazar cada función por llamadas a la API real:
//   - register / login        -> POST /auth/register, POST /auth/login (JWT)
//   - subscriptions           -> GET /me/subscriptions
//   - subscribeTo (tras pago) -> el backend marca la suscripción al confirmar pago
// La persistencia usa localStorage solo para que la demo recuerde la sesión.
// ============================================================================

export interface AulaUser {
  name: string
  email: string
  // slugs de categorías a las que el usuario está suscrito (acceso de por vida)
  subscriptions: string[]
}

interface AulaAuth {
  user: AulaUser | null
  login: (email: string, password: string) => { ok: boolean; error?: string }
  register: (name: string, email: string, password: string) => { ok: boolean; error?: string }
  logout: () => void
  // Marca la categoría como suscrita (lo llama el checkout tras un pago aprobado).
  grantSubscription: (slug: string) => void
  isSubscribed: (slug: string) => boolean
}

const Ctx = createContext<AulaAuth | null>(null)
const STORAGE_KEY = 'aula_user_demo'

// Usuario demo precargado. Credenciales mostradas en la pantalla de login.
const DEMO_USER: AulaUser = {
  name: 'Fisioterapeuta Demo',
  email: 'demo@aula.com',
  // ya viene suscrito a una categoría para mostrar el estado "con acceso"
  subscriptions: ['terapia-manual-evaluacion'],
}
const DEMO_PASSWORD = 'demo123'

function loadUser(): AulaUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AulaUser) : null
  } catch {
    return null
  }
}

function saveUser(user: AulaUser | null) {
  try {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* noop */
  }
}

export function AulaProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AulaUser | null>(loadUser)

  function login(email: string, password: string) {
    // Demo: solo valida el usuario precargado. Backend: validar contra la API.
    if (email.trim().toLowerCase() === DEMO_USER.email && password === DEMO_PASSWORD) {
      const fresh = loadUser() ?? DEMO_USER
      setUser(fresh)
      saveUser(fresh)
      return { ok: true }
    }
    return { ok: false, error: 'Correo o contraseña incorrectos. Usa los datos demo indicados.' }
  }

  function register(name: string, email: string, _password: string) {
    if (!name.trim() || !email.includes('@')) {
      return { ok: false, error: 'Completa tu nombre y un correo válido.' }
    }
    // Demo: crea un usuario nuevo sin suscripciones. Backend: POST /auth/register.
    const fresh: AulaUser = { name: name.trim(), email: email.trim(), subscriptions: [] }
    setUser(fresh)
    saveUser(fresh)
    return { ok: true }
  }

  function logout() {
    setUser(null)
    saveUser(null)
  }

  function grantSubscription(slug: string) {
    setUser((prev) => {
      if (!prev) return prev
      if (prev.subscriptions.includes(slug)) return prev
      const updated = { ...prev, subscriptions: [...prev.subscriptions, slug] }
      saveUser(updated)
      return updated
    })
  }

  function isSubscribed(slug: string) {
    return !!user?.subscriptions.includes(slug)
  }

  return (
    <Ctx.Provider value={{ user, login, register, logout, grantSubscription, isSubscribed }}>
      {children}
    </Ctx.Provider>
  )
}

export function useAula() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAula debe usarse dentro de <AulaProvider>')
  return ctx
}

// Credenciales demo expuestas para mostrarlas en la pantalla de login.
export const DEMO_CREDENTIALS = { email: DEMO_USER.email, password: DEMO_PASSWORD }
