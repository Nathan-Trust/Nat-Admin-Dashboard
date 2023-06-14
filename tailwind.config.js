module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    fontFamily: {
      display: ["Open Sans", "sans-serif"],
      body: ["Open Sans", "sans-serif"],
    },
    extend: {
      backgroundColor: {
        "main-bg": "#FAFBFB",
        "nat":"#1a202c",
        "secondary-dark-bg": "#364153",
        "light-gray": "#F7F7F7",
        "test": "rgba(0, 0, 0, 0.5)",
        "light-mode":"#f1f4fa",
        "white":"#ffffff"
      },
      width: {
        270:'270px',
        400: "400px",
        760: "760px",
        780: "780px",
        800: "800px",
        1000: "1000px",
        1200: "1200px",
        1400: "1400px",
      },
       height: {
        80: "80px",
        680:"600px",
      },
      border:{
        borderDark:"border-bottom: 2px solid black;"
      },
      backgroundImage: {
        "hero-pattern":
          "url('https://leapswitch.com/img/banner/coder.png')",
        "login-pattern":
          "url('https://www.freepik.com/free-vector/female-designer-working-late-room-flat-illustration-cartoon-student-using-laptop-computer-night-sitting-desk_12290996.htm')",
      },
    },
  },
  plugins: [],
};
