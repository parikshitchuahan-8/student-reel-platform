/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["DM Sans", "sans-serif"]
      },
      colors: {
        ink: "#161616",
        canvas: "#f5efe4",
        panel: "#fffaf2",
        moss: "#2f5d50",
        amber: "#df8e33",
        coral: "#c75c3c"
      },
      boxShadow: {
        float: "0 24px 60px rgba(32, 33, 36, 0.10)"
      }
    }
  },
  plugins: []
};
