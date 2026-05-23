/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter Tight", "Satoshi", "Neue Montreal", "General Sans", "Inter", "Arial", "sans-serif"]
      },
      colors: {
        accent: "#8A5CF6"
      }
    }
  },
  plugins: []
};
