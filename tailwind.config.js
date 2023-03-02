/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'open-sans': ['Open Sans', 'sans-serif'],
      },
      colors: {
        'z12-gray': '#8B8686',
      },
      height: {
        '10%': '10vh',
        '40%': '40%',
        '90%': '90vh',
      },
      width: {
        '35%': '35vw',
        '45%': '45vw',
        '55%': '55vw',
        '60%': '60vw',
        '65%': '65vw',
      },
      boxShadow: {
        standard: '0 5px 30px -5px rgba(0, 0, 0, 0.6)',
        shallow: '0 5px 10px -5px rgba(0, 0, 0, 0.6)',
      },
      backgroundImage: {
        z12: 'url(./images/rowing-background.png)',
      },
    },
  },
  plugins: [],
};
