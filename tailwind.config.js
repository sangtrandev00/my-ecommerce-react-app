/** @type {import('tailwindcss').Config} */

// import daisyui from 'daisyui'
import flowbite from 'flowbite/plugin';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [ 
    flowbite,
  ],
}