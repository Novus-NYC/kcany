import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        hanji: "var(--hanji)",
        "hanji-2": "var(--hanji-2)",
        flag: "var(--flag)",
        brass: "var(--brass)",
        azure: "var(--azure)",
        "azure-lt": "var(--azure-lt)",
        mute: "var(--mute)",
        "mute-ink": "var(--mute-ink)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-text)", "system-ui", "sans-serif"],
      },
      maxWidth: { page: "76rem" },
    },
  },
  plugins: [],
}
export default config
