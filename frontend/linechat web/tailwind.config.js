/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#F5F7FB',
        'secondary': '#F7F7FF',
        'tertiary': '#E6EBF5',
        'quaternary-blue': '#7269EF',
        'quaternary-light-blue': '#E3E1FC',
        'quaternary-dark-blue': '#4F46E5',
      },
    },
  },
  plugins: [],
}