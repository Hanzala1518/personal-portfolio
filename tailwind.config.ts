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
          // Keep dark backgrounds as requested
          black: "#0A0E14",
          dark: "#13171E",
          darker: "#0D1117",
          // New accent colors - Navy & Coral theme
          green: "#FF3838",      // Primary accent (coral red) - replaces green
          cyan: "#FF6B6B",       // Secondary accent (light coral)
          grey: "#94A3B8",       // Slightly brighter grey for better readability
          white: "#F1F5F9",      // Crisp white
          red: "#DC0000",        // Deep red for emphasis
          yellow: "#FFD700",     // Keep yellow for special highlights
          // New navy colors
          navy: "#002455",       // Navy blue for cards/borders
          navyDark: "#050E3C",   // Darker navy
          navyLight: "#0A3A7A",  // Lighter navy for hover states
          // Accent variations
          accent: "#FF3838",     // Main accent
          accentDark: "#DC0000", // Darker accent
          accentLight: "#FF6B6B" // Lighter accent
        }
      },
      fontFamily: {
        display: ["var(--font-fira)"],
        sans: ["var(--font-inter)"],
        mono: ["var(--font-fira)"]
      },
      boxShadow: {
        glow: "0 0 15px rgba(255, 56, 56, 0.25)",
        insetGlow: "inset 0 0 20px rgba(255, 56, 56, 0.35)",
        glowNavy: "0 0 20px rgba(0, 36, 85, 0.4)",
        card: "0 4px 20px rgba(0, 0, 0, 0.3), 0 0 1px rgba(255, 56, 56, 0.1)"
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
