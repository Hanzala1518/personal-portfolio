import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./content/**/*.{md,mdx}",
    "./styles/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        matrix: {
          black: "#0A0E14",
          dark: "#13171E",
          darker: "#0D1117",
          green: "#00FF41",
          cyan: "#00FFFF",
          grey: "#8B949E",
          white: "#E6EDF3",
          red: "#FF0055",
          yellow: "#FFD700"
        }
      },
      fontFamily: {
        display: ["var(--font-fira)"],
        sans: ["var(--font-inter)"],
        mono: ["var(--font-fira)"]
      },
      boxShadow: {
        glow: "0 0 15px rgba(0, 255, 65, 0.25)",
        insetGlow: "inset 0 0 20px rgba(0, 255, 65, 0.35)"
      },
      backgroundImage: {
        grid: "repeating-linear-gradient(0deg, rgba(255,255,255,0.04), rgba(255,255,255,0.04) 1px, transparent 1px, transparent 24px), repeating-linear-gradient(90deg, rgba(255,255,255,0.04), rgba(255,255,255,0.04) 1px, transparent 1px, transparent 24px)"
      },
      keyframes: {
        glitch: {
          "0%": { clipPath: "inset(0 0 0 0)" },
          "20%": { clipPath: "inset(10% 0 85% 0)" },
          "40%": { clipPath: "inset(50% 0 30% 0)" },
          "60%": { clipPath: "inset(80% 0 5% 0)" },
          "80%": { clipPath: "inset(40% 0 43% 0)" },
          "100%": { clipPath: "inset(0 0 0 0)" }
        },
        "matrix-rain": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" }
        }
      },
      animation: {
        glitch: "glitch 0.5s linear both",
        matrixRain: "matrix-rain 10s linear infinite"
      },
      screens: {
        xs: "475px"
      }
    }
  },
  plugins: [
    plugin(({ addVariant }: { addVariant: (name: string, value: string) => void }) => {
      addVariant("supports-hover", "@media (hover: hover)")
      addVariant("supports-no-hover", "@media (hover: none)")
    })
  ]
}

export default config;
