import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#faf9f7",
          100: "#f0ede8",
          200: "#ddd7cd",
          300: "#c4b9a8",
          400: "#a6947a",
          500: "#8a7460",
          600: "#6e5a46",
          700: "#564433",
          800: "#3b2f22",
          900: "#231b13"
        },
        surface: {
          DEFAULT: "#ffffff",
          light: "#f5f5f3",
          lighter: "#fafaf8",
        },
        accent: {
          DEFAULT: "#8b6f47",
          light: "#c8a97e",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "ui-sans-serif", "sans-serif"]
      },
      boxShadow: {
        card: "0 2px 16px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 8px 30px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: []
};

export default config;
