/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        accent: ["var(--tangerine)"],
        display: ["var(--rye)"],
        text: ["var(--cantarell)"],
        sans: ["var(--roboto)"],
      },
      colors: {
        // Primary
        primary: {
          500: "hsl(137 58% 11%)",
          700: "hsl(137, 58% 5%)",
        },
        backdrop: {
          500: "hsl(36 62% 94%)",
        },
      },
    },
  },
  plugins: [],
};

module.exports = config;
