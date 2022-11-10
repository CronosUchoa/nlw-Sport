/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html',
  ],
  theme: {
    fontFamily:{
      sans:['Inter', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        galaxy : "url('/background-galaxy.png')",
        duoGradient: 'linear-gradient(89.86deg,#9572FC 33%, #43e7ad 70%, #E1D55D  20%)',
        gameGradient: 'linear-gradient(100deg,rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.9) 67.08%)',
      }
    },
  },
  plugins: [],
}
