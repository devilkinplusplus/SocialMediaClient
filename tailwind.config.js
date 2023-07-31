/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily:{
        gemunu:['Gemunu Libre', 'sans-serif'],
        opensans: ["Open Sans", "sans-serif"],
      },
      colors:{
        "bright-blue":"#007bff"
      },
      width:{
        '128':'512px',
        '256':'768px'
      }
    },
  },
  plugins: [],
}

