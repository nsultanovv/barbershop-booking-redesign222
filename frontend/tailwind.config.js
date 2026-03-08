/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#050709",
        surface: "#0B0F16",
        surfaceAlt: "#111827",
        accent: "#F97316",
        accentSoft: "#FDBA74",
        muted: "#6B7280",
        border: "#1F2933"
      },
      boxShadow: {
        card: "0 18px 45px rgba(0,0,0,0.65)"
      }
    }
  },
  plugins: []
};

