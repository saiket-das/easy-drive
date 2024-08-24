/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4ac760",
        "primary-600": "#24b43d",
      },
    },
  },
  plugins: [],
};
