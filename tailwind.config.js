/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: { // Indented one extra level
        primary: '#4B5563',
        secondary: '#f85458',
        textprimary: '#808080'
      }, 
      screens: {
        xxs:'320px',
        xsm: '375px',
        sml:'420px',
        sm: '676px',
        md: '768px',
        lg: '976px',
        subxl: '1150px',
        xl: '1440px',
      },
    },
    plugins: [],
  },
   plugins: [],
}
