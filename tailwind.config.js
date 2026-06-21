/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        rose: {
          gold: "#C9A96E",
          goldLight: "#D4B97E",
          goldDark: "#B8985D",
        },
        ivory: {
          DEFAULT: "#FAF7F2",
          dark: "#F0EBE3",
        },
        wine: {
          DEFAULT: "#722F37",
          light: "#8B454D",
          dark: "#5A242B",
        },
        blush: {
          DEFAULT: "#F5E6E8",
          dark: "#E8D3D6",
        },
        warmgray: {
          DEFAULT: "#8B7E74",
          light: "#A6998F",
          dark: "#6E635B",
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "serif"],
        body: ['"Lato"', "sans-serif"],
      },
      boxShadow: {
        elegant: "0 4px 20px rgba(201, 169, 110, 0.15)",
        card: "0 2px 12px rgba(139, 126, 116, 0.1)",
        hover: "0 8px 30px rgba(201, 169, 110, 0.25)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
