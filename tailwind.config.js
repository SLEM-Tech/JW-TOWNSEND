import { nextui } from "@nextui-org/react";
export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
];
export const darkMode = "class";
export const theme = {
  extend: {
    fontFamily: {
      poppins: ["var(--font-poppins)", "sans-serif"],
    },
    colors: {
      light: "#F3F3F3",
      background: "#F3F3F3",
      gray: {
        100: "#FDF7FD",
        200: "#CCCCCC",
        300: "#F7F7F7",
        400: "#FAFAFA",
      },
      primary: "#008ECC",
      effect: "#FFF0ED",
      primaryColor: {
        100: "#FFE0DD",
        200: "#FFB8B1",
        300: "#FF8F85",
        400: "#76e9fd",
        500: "#76e9fd",
      },
      blue: {
        100: "#E0F2FF",
        200: "#B3E5FC",
        300: "#81D4FA",
        400: "#4FC3F7",
        500: "#29B6F6",
        600: "#008ECC",
        700: "#0288D1",
        800: "#0277BD",
        900: "#01579B",
      },
      dark: "#231834",
      text_color: "#19191D",
      secondary: {
        200: "#333",
        300: "#777",
        400: "#242424",
        500: "#848484",
        600: "#BFBFBF",
        700: "#E4E4E4",
        800: "#1E2832",
      },
      orange: "#FB5646",
      xiaomi: "#FFECDF",
    },
    animation: {
      "spin-slow": "spin 8s linear infinite",
    },
  },
  screens: {
    xs: "400px",
    slg: "999px", // @media (min-width: 999px
    xmd: "800px", // @media (min-width: 800px)
    ...require("tailwindcss/defaultTheme").screens,
  },
};
export const plugins = [nextui()];
