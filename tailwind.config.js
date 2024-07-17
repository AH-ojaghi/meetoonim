/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {

    extend: {
      screens: {
        'xs': "420px",
        'xls':'920px',
        'lgs':'850px'
      },
    },
  },
  plugins: [

  ],
};
