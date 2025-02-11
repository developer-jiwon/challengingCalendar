import type { Config } from "tailwindcss";

const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        noto: ["var(--font-noto-serif)"],
        lora: ["var(--font-lora)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        burgundy: {
          50: '#fdf2f4',
          100: '#fce7ea',
          200: '#f9d2d9',
          300: '#f4b1bc',
          400: '#ec8494',
          500: '#e05a70',
          600: '#c93251',
          700: '#a72645',
          800: '#8b2240',
          900: '#771f3c',
          950: '#420c1d',
        },
        grey: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
          950: '#262626',
        },
      },
      keyframes: {
        'fade-in-out': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '10%': { opacity: '1', transform: 'translateY(0)' },
          '90%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' }
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' }
        }
      },
      animation: {
        'fade-in-out': 'fade-in-out 2s ease-in-out',
        shimmer: 'shimmer 8s linear infinite',
        'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite'
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
