/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFDFD6",
        secondary: "#E3A5C7",
        accent: "#B692C2",
        darkAccent: "#694F8E",
      },
      backgroundImage: {
        "custom-bg": "url('../images/bgImage.jpg')",
      },
    },
    plugins: [],
  },
};
