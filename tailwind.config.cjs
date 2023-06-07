/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        accent: ["Tangerine", "var(--tangerine)"],
        display: ["Rye", "var(--rye)"],
        text: ["Cantarell", "var(--cantarell)"],
        sans: ["Roboto", "var(--roboto)"],
      },
      colors: {
        // Primary
        primary: {
          500: "hsl(137 58% 11%)",
          700: "hsl(137, 58% 5%)",
        },
        backdrop: {
          500: "hsl(36 62% 94%)",
          700: "hsl(36 62% 94%)",
        },
      },
    },
  },
  plugins: [],
};

module.exports = config;
