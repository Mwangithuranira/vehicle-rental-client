/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enables dark mode using the 'class' strategy
  theme: {
    extend: {
      colors: {
        "primary-color": "#4a90e2",
        "dark-color": "#2c3e50",
        "light-color": "#ecf0f1",
        "highlight-color": "#f39c12",
      },
      backgroundColor: {
        // Default light mode background
        default: "#ffffff", // White for light mode
        // Dark mode background color
        dark: "#2c3e50", // The dark color you've specified
      },
      transitionProperty: {
        // Allows transitions for background color changes
        "background-color": "background-color",
        "colors": "background-color, color",
      },
      transitionDuration: {
        400: "400ms",
        500: "500ms",
        600: "600ms",
      },
      transitionTimingFunction: {
        "in-out-expo": "cubic-bezier(0.5, 0, 0.25, 1)",
      },
    },
  },
  plugins: [daisyui],
};
