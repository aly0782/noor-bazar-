/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'noor-gold': '#D4A853',
        'noor-dark': '#1a1a2e',
        'noor-purple': '#16213e',
        'noor-accent': '#0f3460',
        'noor-highlight': '#e94560',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
