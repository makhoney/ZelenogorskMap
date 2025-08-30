/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@your-ui-lib/**/*.{js,ts,jsx,tsx}" // если используешь shadcn/ui
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
