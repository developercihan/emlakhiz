/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        accent: "var(--accent)",
        background: "var(--background)",
        "text-main": "var(--text-main)",
        "text-muted": "var(--text-muted)",
      },
      fontFamily: {
        sans: ["Sora", "sans-serif"],
        drama: ["Instrument Serif", "serif"],
        mono: ["Fira Code", "monospace"],
      },
      borderRadius: {
        'premium': '2.5rem',
      }
    },
  },
  plugins: [],
}
