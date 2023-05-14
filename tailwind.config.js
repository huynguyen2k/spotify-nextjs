/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        'sidebar-width': '300px',
      },
      animation: {
        loading: 'spin 1.2s cubic-bezier(0.5,0,0.5,1) infinite',
      },
    },
  },
  plugins: [],
}
