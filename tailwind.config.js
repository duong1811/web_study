/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.html", "./src/**/*.{html,js,ts}"],
  theme: {
    extend: {
      colors: {
        ink: "#17251f",
        forest: "rgb(var(--forest-rgb) / <alpha-value>)",
        lime: "rgb(var(--lime-rgb) / <alpha-value>)",
        paper: "#f7f7f2",
        muted: "#707a73",
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Manrope", "sans-serif"],
      },
      boxShadow: {
        soft: "0 24px 70px rgba(23, 37, 31, .09)",
      },
    },
  },
  plugins: [],
};
