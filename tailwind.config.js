/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          black: "#0a0a0a",
          charcoal: "#1c1c1c",
          gold: "#d4af37",
          champagne: "#f7e7ce",
          white: "#fafafa",
          accent: "#c5a028"
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        display: ['Cinzel', 'serif']
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(to right bottom, #0a0a0a, #1a1a1a)',
        'gold-gradient': 'linear-gradient(135deg, #d4af37 0%, #c5a028 100%)'
      }
    },
  },
  plugins: [],
}
