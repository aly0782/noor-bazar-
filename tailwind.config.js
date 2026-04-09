/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'noor-gold': '#d4af37',
        'noor-gold-light': '#c9a961',
        'noor-dark': '#1a1a1a',
        'noor-dark-2': '#2a2a2a',
        'noor-dark-3': '#333333',
        'noor-teal': '#2d5a5a',
        'noor-teal-light': '#4a7c7c',
        'noor-cream': '#e8dcc8',
        'noor-cream-light': '#f5f0e8',
      },
      fontFamily: {
        'display': ['Playfair Display', 'Georgia', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        'widest-xl': '0.2em',
        'widest-2xl': '0.3em',
      }
    },
  },
  plugins: [],
}
