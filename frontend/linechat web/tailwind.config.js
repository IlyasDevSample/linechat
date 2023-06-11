/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#F5F7FB',
        'secondary': '#F7F7FF',
        'tertiary': '#E6EBF5',
        'quaternary-blue': '#7269EF',
        'quaternary-light-blue': '#E3E1FC',
        'quaternary-dark-blue': '#4F46E5',
        'sidebar-dark-primary': '#36404A',
        'sidebar-dark-btn': '#3E4A56',
        'contact-dark-primary': '#303841',
        "chat-dark-primary": "#262E35",
        'txt-gray': '#EFF2E1',
      },
      boxShadow: {
        'primary-web': '0 2px 4px rgba(15,34,58,.12)',
      },
      screens: {
        'lg': '992px',
      },
    },
  },
  plugins: [],
}