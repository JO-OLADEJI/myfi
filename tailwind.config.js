/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        myfi: {
          primary: "#2542da",

          secondary: "#070D18",

          accent: "#6E00FA",

          neutral: "#ffffff",

          "base-100": "#f2f3f3",

          info: "#f3f4fd",

          success: "#61BC51",

          warning: "#ffffff",

          error: "#E6264E",
        },
      },
    ],
  },

  plugins: [require("daisyui")],
};
