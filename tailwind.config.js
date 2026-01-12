/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
      themes: [
        {
          light: {
            "primary": "#7c3aed",
            "secondary": "#14b8a6",
            "accent": "#f97316",
            "neutral": "#1e293b",
            "base-100": "#ffffff",
            "base-200": "#f1f5f9",
            "base-300": "#e2e8f0",
            "info": "#06b6d4",
            "success": "#22c55e",
            "warning": "#eab308",
            "error": "#f43f5e",
          },
        },
        {
          dark: {
            "primary": "#a78bfa",
            "secondary": "#2dd4bf",
            "accent": "#fb923c",
            "neutral": "#374151",
            "base-100": "#1f2937",
            "base-200": "#111827",
            "base-300": "#0f172a",
            "info": "#22d3ee",
            "success": "#4ade80",
            "warning": "#facc15",
            "error": "#fb7185",
          },
        },
      ],
    },
  }
  