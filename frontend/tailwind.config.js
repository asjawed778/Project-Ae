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
      backgroundImage: {
        'custom-gradient': 'linear-gradient(241.96deg, #E69CC1 0%, #8C6BED 39.09%, #426BE1 67.42%, #4896EC 100%)',
      },
    },

  },
  plugins: [require("daisyui")],

  daisyui:{
    themes:["cupcake", "light"] ,
  } ,
}

