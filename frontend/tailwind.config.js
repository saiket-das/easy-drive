/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#e24827",
        "primary-600": "#ce4224",
      },
    },
  },
  plugins: [],
};
