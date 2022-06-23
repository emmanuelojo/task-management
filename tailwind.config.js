module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        "n-bg": "#2c2c38",
        "n-bg-sec": "#21212d",
        "n-bg-ter":"#23232f",
        "n-blue": "#645fc6",
        "n-bold-blue": "#017EFA",
        "n-dark-blue": "#1B2B65",
        "n-darker-blue": "#081A51",
        "n-blue-sec": "#655fc4",
        "n-grey": "#777d8d",
        "n-grey-text": "#6f7384",
        "n-red": "#CF3A59",
        "n-black": "#1C1F37",
        "n-white":"#484852",
        "n-green":"#6ae1b2",
        "n-green-sec":"#45bede",
        "n-purple":"#8470f4",
        "n-purple-sec": "#4d478c"
      },
      gridTemplateColumns: {
        "auto-1fr": "auto 1fr",
        "1-auto": "1fr auto",
        "n-auto-1fr": "repeat(auto, auto 1fr)",
        "2auto": "repeat(2, auto)",
        "3auto": "repeat(3, auto)",
        "4auto": "repeat(4, auto)",
        "5auto": "repeat(5, auto)",
        "2fr-1fr": "2fr 1fr",
        "md-fr": "repeat(auto-fill, minmax(200px,1fr))",
      },
      gridTemplateRows: {
        "2auto": "auto 1fr auto",
      },
      width: {
        50: "200px",
        75: "300px",
      },
      minWidth: {
        64: "256px",
      },
    },
  },
  plugins: [],
};