import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          button: {
            color: "#fafafa",
            background: "#8baa36",
            "hover-background": "#76982b",
          },
          transparent: {
            "hover-background": "rgba(0, 0, 0, 0.3)",
          },
          disabled: {
            background: "#d9d9d9",
            color: "#23262a",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;

