module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      display: ["Open Sans", "sans-serif"],
      body: ["Open Sans", "sans-serif"],
    },
    extend: {
      gridTemplateColumns: {
        "1/5": "1fr 5fr",
      },
      backgroundColor: {
        "main-bg": "#FAFBFB",
        "nat": "#1f1b32",
        "secondary-dark-bg": "#2a2442",
        "light-gray": "#F7F7F7",
        "test": "rgba(0, 0, 0, 0.5)",
        "light-mode": "#f0eef6",
        "white": "#fafafa",
      },
      width: {
        270: "270px",
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
        680: "600px",
      },
      border: {
        borderDark: "border-bottom: 2px solid black;",
      },
      backgroundImage: {
        "hero-pattern": "url('https://leapswitch.com/img/banner/coder.png')",
        "hero-pattern2":
          "url('https://www.bing.com/images/create/where-to-have-an-illustration-of-a-woman-putting-o/64c13aee4e5b4700adfe136ce779cb62?id=2o8CNef9OafP1Kd3NHDxmQ%3d%3d&view=detailv2&idpp=genimg&FORM=GCRIDP&mode=overlay')",

        "login-pattern":
          "url('https://www.freepik.com/free-vector/female-designer-working-late-room-flat-illustration-cartoon-student-using-laptop-computer-night-sitting-desk_12290996.htm')",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
