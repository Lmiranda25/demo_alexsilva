# Alex Silva — Fisioterapia

Web profesional para Alex Silva, fisioterapeuta con +20 años de experiencia.
Rediseño en **React + Vite + TypeScript + Tailwind CSS + Framer Motion**.

Sitio de referencia del cliente: https://alexsilvagarcia.net/

---

## 🚀 Cómo trabajar el proyecto

```bash
npm install      # instala dependencias (solo la primera vez)
npm run dev      # servidor de desarrollo en http://localhost:5173
npm run build    # compila a /dist (producción)
npm run preview  # previsualiza el build de producción
```

---

## 🌐 Despliegue manual a GitHub Pages (sin GitHub Actions)

Este proyecto usa **rutas relativas** (`base: './'` en `vite.config.ts`) y
**HashRouter**, por lo que funciona en cualquier repositorio de GitHub Pages
sin reconfigurar nada y sin imágenes rotas.

### Opción A — con el paquete `gh-pages` (recomendado, un solo comando)

1. Sube este proyecto a tu repositorio de GitHub.
2. Ejecuta:
   ```bash
   npm run deploy
   ```
   Esto compila y publica la carpeta `dist` en la rama `gh-pages`.
3. En GitHub: **Settings → Pages → Source: rama `gh-pages` / carpeta `/ (root)`**.
4. Tu web quedará en `https://TU-USUARIO.github.io/TU-REPO/`.

### Opción B — subir `dist` manualmente

1. `npm run build`
2. Sube el **contenido** de la carpeta `dist/` a la rama/carpeta que GitHub
   Pages tenga configurada como origen.

> ℹ️ El archivo `public/.nojekyll` ya está incluido para que GitHub Pages no
> ignore carpetas. Se copia automáticamente al build.

---

## 🖼️ Imágenes

- `public/images/reciclada/` → imágenes **recicladas de la web del cliente**
  (logo, foto de Alex, productos, banners, miniatura de YouTube).
- `public/images/stock/` → imágenes libres de **Unsplash** del mismo rubro
  (fisioterapia, clínica) para fondos y testimonios.

Todas las imágenes son **locales** (no se enlazan desde la web original), así
que no habrá imágenes rotas.

---

## ⚙️ Configuración pendiente del cliente (placeholders)

Edita `src/lib/constants.ts`:

| Constante            | Qué hacer                                                            |
| -------------------- | ------------------------------------------------------------------- |
| `FORMSPREE_ENDPOINT` | Crear un formulario gratis en https://formspree.io y pegar el ID.   |
| `CALENDLY_URL`       | Pegar el enlace real de Calendly del cliente.                       |

> Si `FORMSPREE_ENDPOINT` no se configura, el formulario de contacto deriva
> automáticamente el mensaje a **WhatsApp** (no se pierde ningún lead).

Contenido que conviene reemplazar por información real del cliente:
- `src/data/testimonials.ts` — testimonios de ejemplo.
- `src/data/faq.ts` — preguntas frecuentes de ejemplo.

---

## 🧩 Funcionalidades de conversión incluidas

1. **WhatsApp flotante** con burbuja de invitación y mensajes pre-rellenados.
2. **Formulario de cita** (Formspree, con fallback a WhatsApp).
3. **Catálogo de productos filtrable** con modal de detalle.
4. **Reserva con calendario** (Calendly).
5. **Testimonios** en carrusel (prueba social).
6. **Quiz "¿Qué programa necesitas?"** que recomienda y abre WhatsApp con contexto.
7. **Banda de credenciales** con contadores animados.
8. **FAQ** en acordeón para reducir fricción antes de agendar.

---

## 🎨 Paleta (derivada del logo)

| Color        | Hex       | Uso                        |
| ------------ | --------- | -------------------------- |
| Azul marca   | `#1B75BC` | Color principal            |
| Azul oscuro  | `#0F4C81` | Headers, footer            |
| Dorado       | `#F5A623` | Acentos y CTAs             |
| Azul claro   | `#E8F1FA` | Fondos suaves              |
| Blanco roto  | `#FAFCFF` | Fondo base (look clínico)  |
```
