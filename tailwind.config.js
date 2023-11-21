const forms = require("@tailwindcss/forms")
const typography = require("@tailwindcss/typography")
const aspectRatio = require("@tailwindcss/aspect-ratio")

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [forms, typography, aspectRatio],
}
