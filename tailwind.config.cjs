/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--roboto-slab)"],
        sans: ["var(--roboto)"],
      },
    },
  },
  plugins: [],
};

module.exports = config;
