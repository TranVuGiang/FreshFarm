import { space } from 'postcss/lib/list';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          '100': '#f3f4f6ff'
        }
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif']
      }
    },
  },
  plugins: [],
}

