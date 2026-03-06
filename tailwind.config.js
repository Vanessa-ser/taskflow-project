/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/*.js"],
  theme: {
    extend: {
//fuentes
      fontFamily: {
        trebuchet: ["'Trebuchet MS'", "sans-serif"],
      },

// colores
      colors: {
        principal: "#855f43",
        secundario: "#c39d80",
        fondo: "#EFE7DD",
        blancoweb: "#FDF6F0",
      },
    },

  plugins: [],
}
