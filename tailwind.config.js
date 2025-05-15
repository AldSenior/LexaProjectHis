/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-revolution": "linear-gradient(to bottom, #B22222, #1C2526)",
      },
      fontFamily: {
        Playfair_Display: ["Playfair Display", "serif"],
        Roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        gold: "#D4A017",
      },
      boxShadow: {
        glow: "0 0 20px rgba(255,215,0,0.6)",
      },
    },
  },
  plugins: [],
};
