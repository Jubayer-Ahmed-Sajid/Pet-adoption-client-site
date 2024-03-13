/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: { // Indented one extra level
        primary: '#83c8e5',
        secondary: '#f85458',
        textprimary: '#808080'
      } 
    },
    plugins: [],
  },
   plugins: [],
}
