import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#2C5F2D',
        secondary: '#D4E8D4',
        accent: '#FF8C42',
      },
    },
  },
  plugins: [],
} satisfies Config;