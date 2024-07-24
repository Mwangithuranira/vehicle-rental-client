/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // or 'media' if you prefer automatic dark mode based on system settings
  theme: {
    extend: {
      colors: {
        'primary-color': '#4a90e2',
        'dark-color': '#2c3e50',
        'light-color': '#ecf0f1',
        'highlight-color': '#f39c12',
      },
    },
  },
  plugins: [
   daisyui,
  ],
}

