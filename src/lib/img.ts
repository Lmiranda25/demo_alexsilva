// Helper para construir rutas de imágenes respetando el `base` relativo
// de Vite (import.meta.env.BASE_URL = './' en producción de GitHub Pages).
export function img(path: string): string {
  const clean = path.replace(/^\//, '')
  return `${import.meta.env.BASE_URL}${clean}`
}

// Atajos por carpeta
export const reciclada = (file: string) => img(`images/reciclada/${file}`)
export const stock = (file: string) => img(`images/stock/${file}`)
