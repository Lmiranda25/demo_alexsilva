import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// base: './' => rutas relativas. Funciona en cualquier nombre de repo de
// GitHub Pages (usuario.github.io/CUALQUIER-REPO/) sin tener que reconfigurar.
// Combinado con HashRouter, el routing no rompe al recargar.
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
})
