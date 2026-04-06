/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    
    colors: {
      white: colors.white,
      black: colors.black,
      pink: colors.pink,
      indigo: colors.indigo,
      transparent:colors.transparent,
      onyx: {
        50: "#F1F1F4",
        100: "#E3E3E8",
        200: "#C8C6D2",
        300: "#AFADBE",
        400: "#9490A7",
        500: "#787490",
        600: "#605D75",
        700: "#4B485B",
        800: "#34323F",
        900: "#1f1e26",
        950: "#1c1b22"
      },
      blue: {
        50: "#F6F6FE",
        100: "#ECEDFD",
        200: "#D0D1FB",
        300: "#B9BAF9",
        400: "#9395F5",
        500: "#6366F1",
      },
    },

    fontFamily: {
      sans: ["Figtree", ...defaultTheme.fontFamily.sans],
      display: ["Clash Display", ...defaultTheme.fontFamily.sans],
      mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
    },
    extend: {
       borderRadius: {
      "4xl": "2rem",
      "5xl": "3rem",
      "6xl": "5rem",
    },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),

    require("@tailwindcss/aspect-ratio"),
  ],
};
