/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#85d366', // TechHub Logo Neon Green
        secondary: '#49673c', // TechHub Logo Dark Green
        dark: '#1a1a1a',
        light: '#f8f9fa',
        bodyText: '#666666'
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
