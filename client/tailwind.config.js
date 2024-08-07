/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
      extend: {
        colors: {
          customBlue: '#14213d',
          customWhite: '#f1faee',
          customLightBlue: '#A8DADC',
          customModBlue: "#457B9D",
          customRed: '#E63946',
          customBg: 'rgb(237, 246, 237)'
        },
      },
    },
    variants: {},
}
