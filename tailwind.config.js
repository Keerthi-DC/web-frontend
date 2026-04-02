/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#000a1e",
        "primary-container": "#002147",
        "on-primary": "#ffffff",
        "on-primary-container": "#708ab5",

        surface: "#f8f9fa",
        "surface-container": "#edeeef",
        "surface-container-low": "#f3f4f5",
        "surface-container-high": "#e7e8e9",
        "surface-container-lowest": "#ffffff",

        "on-surface": "#191c1d",
        "on-surface-variant": "#44474e",

        "outline-variant": "#c4c6cf",

        "tertiary-container": "#002340",
        "on-tertiary-container": "#028de9",
      },
      fontFamily: {
        headline: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};