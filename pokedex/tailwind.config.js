/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
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
          }
        },
      },
    },
    plugins: [],
}