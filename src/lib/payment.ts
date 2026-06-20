// ============================================================================
// PASARELA DE PAGO SIMULADA.
//
// NOTA PARA BACKEND: reemplazar `processPayment` por la integración real
// (Culqi / Mercado Pago / Stripe). El frontend solo debe enviar el token de
// la tarjeta al backend y este confirma el pago y activa la suscripción.
// Aquí se simula con tarjetas de prueba para la demo.
// ============================================================================

export interface CardData {
  number: string
  name: string
  expiry: string
  cvv: string
}

export interface PaymentResult {
  ok: boolean
  message: string
  // código de operación simulado
  ref?: string
}

// Tarjetas de prueba (igual que las que usan las pasarelas reales).
export const TEST_CARDS = [
  { number: '4242 4242 4242 4242', label: 'Pago aprobado', kind: 'ok' as const },
  { number: '4000 0000 0000 0002', label: 'Pago rechazado', kind: 'fail' as const },
]

function digits(s: string) {
  return s.replace(/\D/g, '')
}

// Simula el procesamiento (incluye un pequeño retardo como una pasarela real).
export function processPayment(card: CardData): Promise<PaymentResult> {
  return new Promise((resolve) => {
    const run = () => {
      const num = digits(card.number)

      if (num.length < 15) {
        resolve({ ok: false, message: 'Número de tarjeta inválido.' })
        return
      }
      if (digits(card.cvv).length < 3) {
        resolve({ ok: false, message: 'El código CVV es inválido.' })
        return
      }
      if (!card.expiry.match(/^\d{2}\/\d{2}$/)) {
        resolve({ ok: false, message: 'La fecha de vencimiento debe tener formato MM/AA.' })
        return
      }
      if (num === '4000000000000002') {
        resolve({ ok: false, message: 'Tu tarjeta fue rechazada por el banco. Intenta con otra.' })
        return
      }
      if (num === '4242424242424242') {
        resolve({ ok: true, message: '¡Pago aprobado!', ref: 'AS-' + num.slice(-4) + '-OK' })
        return
      }
      // Cualquier otra tarjeta: aprobada en la demo, pero avisamos.
      resolve({ ok: true, message: 'Pago aprobado (tarjeta de demostración).', ref: 'AS-DEMO' })
    }
    // retardo simulado de pasarela (~1.2s). setTimeout no usa Date.now, ok en runtime.
    setTimeout(run, 1200)
  })
}
