/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(210, 16%, 82%)", // пример цвета для border-border
        background: "hsl(0, 0%, 100%)"
      }
    },
  },
  plugins: [],
}
