/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta derivada del logo real de Alex Silva (azul + dorado)
        brand: {
          50: '#E8F1FA',
          100: '#D2E4F5',
          200: '#A5C9EB',
          300: '#6FA8DC',
          400: '#3D8BCC',
          500: '#1B75BC', // azul marca (principal)
          600: '#15619E',
          700: '#0F4C81', // azul oscuro (headers/footer)
          800: '#0B3A63',
          900: '#082B4A',
        },
        gold: {
          50: '#FEF6E7',
          100: '#FDE9C2',
          200: '#FBD68A',
          300: '#F9C152',
          400: '#F7B02E',
          500: '#F5A623', // dorado acento (CTAs)
          600: '#D98911',
          700: '#A66708',
          800: '#7A4D08',
          900: '#4F320A',
        },
        ink: '#1F2933',
        paper: '#FAFCFF',
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      height: {
        18: '4.5rem',
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(15, 76, 129, 0.18)',
        card: '0 4px 24px -8px rgba(15, 76, 129, 0.15)',
        glow: '0 0 30px -5px rgba(245, 166, 35, 0.4)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #1B75BC 0%, #0F4C81 100%)',
        'gold-gradient': 'linear-gradient(135deg, #F7B02E 0%, #F5A623 100%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.95)', opacity: '1' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        pulseRing: 'pulseRing 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
