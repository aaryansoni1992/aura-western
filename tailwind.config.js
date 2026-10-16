/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aura: {
          pink: '#E11D48',      // Bold Rose/Pink
          'pink-hover': '#BE123C',
          'pink-light': '#FFE4E6',
          coral: '#F97316',     // Vibrant Coral Orange
          'coral-light': '#FFEDD5',
          purple: '#8B5CF6',    // Electric Purple
          'purple-dark': '#6D28D9',
          'purple-light': '#EDE9FE',
          dark: '#0F172A',      // Premium Deep Slate/Charcoal
          sand: '#FAF8F5',      // Clean luxury off-white
          cream: '#FFFDF9',
          gold: '#D97706',
          'gold-light': '#FEF3C7'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        fashion: ['"Outfit"', 'sans-serif'],
      },
      boxShadow: {
        'fashion': '0 10px 30px -10px rgba(225, 29, 72, 0.15)',
        'fashion-lg': '0 20px 40px -15px rgba(225, 29, 72, 0.25)',
        'card': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-subtle': 'pulseSubtle 2s infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
