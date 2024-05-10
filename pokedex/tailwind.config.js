/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./node_modules/flowbite/**/*.js"
    ],
    theme: {
      screens: {
        'xxs': '280px',
        'xs': '375px',
        'ss': '425px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '1xl': '1440px',
        '2xl': '1536px',
        '3xl': '1920px',
        '4xl': '2560px',
      },
      fontFamily: {
        'nunito': ['nunito', 'sans-serif'],
        'MyFont': ['"My Font"', 'serif']
      },
      extend: {
        colors: {
          blue: {
            1: '#5db9ff',
            2: '#363b81'
          },
          yellow:{
            1: "#fbd743"
          },
          red:{
            1: "#ff1f1f"
          }
        },
      },
    },
    plugins: [  require('flowbite/plugin')],
}