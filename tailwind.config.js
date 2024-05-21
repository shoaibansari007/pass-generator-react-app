/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "rgba(255,255,255, 0.1) 0px 0px 2px 1px",
      },
    },
  },
  plugins: [],
};
