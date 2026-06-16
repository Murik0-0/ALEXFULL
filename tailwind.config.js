/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Цвета из твоего макета (примерные, потом поправим)
        darkBg: '#0d0d0d', 
        darkGray: '#1a1a1a',
        accentPurple: '#8b5cf6', 
      },
    },
  },
  plugins: [],
}
