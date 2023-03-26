/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
    maxWidth: {
      ta: '960px',
      dt: '1140px',
      modal: '600px',
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
