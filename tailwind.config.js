/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        steel: "#1e293b",
        fog: "#e2e8f0",
        tide: "#0f766e",
        sun: "#f59e0b",
        coral: "#f97316",
        mint: "#10b981",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Space Grotesk", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(15, 118, 110, 0.2), 0 10px 30px rgba(2, 132, 199, 0.12)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        rise: {
          "0%": { transform: "translateY(12px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        rise: "rise 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
