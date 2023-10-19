/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors:{
        mainColor: '#FCF7E6'
      },
      padding: {
      '62px': '62px',
      '120px':'120px',
      '220px':'220px',
      '84px':'84px',
      '402px':'402px',
      },
      width: {
        '460px':'460px',
      },
      fontFamily:{
        sans: ['Space Grotesk'],
      },
      
    },
  },
  plugins: [],
}

