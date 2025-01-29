import type { Config } from "tailwindcss";

export default {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        arasaka_red: "#e60000",
      },
    },
  },
  plugins: [],
} satisfies Config;
