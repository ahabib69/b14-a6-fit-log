/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#ccff00',
        bg: '#0b0b0c',
        surface: '#161618',
        border: '#2a2a2d',
      },
      fontFamily: {
        display: ['Oswald', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
