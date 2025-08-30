/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(210, 16%, 82%)",       // для border-border
        background: "hsl(0, 0%, 100%)",     // для bg-background
        foreground: "hsl(222, 47%, 11%)",   // для text-foreground
        primary: "hsl(222, 47%, 11%)",      // пример для primary
        secondary: "hsl(210, 16%, 82%)",    // пример для secondary
        muted: "hsl(210, 16%, 82%)",        // пример для muted
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
