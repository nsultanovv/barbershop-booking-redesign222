/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./app/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        accent: "#ff7a18",
        accentSoft: "#ff3d00",
        surfaceAlt: "#0f0f17",
        muted: "rgba(255,255,255,0.6)",
        border: "rgba(255,255,255,0.08)"
      }
    },
  },
  plugins: [],
}