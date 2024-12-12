/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    extend: {
      fontFamily:{
        sans:['Roboto', 'sans-serif'] ,
        rale:['Raleway', 'sans-serif']
      } ,
      boxShadow: {
        'custom': '0px 10px 60px 0px rgba(0, 0, 0, 0.2)', // X=0, Y=10px, Blur=60px, Spread=0px, Color=#000000 with opacity 0.2
      },
    },

  },
  plugins: [require("daisyui")],

  daisyui:{
    themes:["cupcake", "light"] ,
  } ,
}

