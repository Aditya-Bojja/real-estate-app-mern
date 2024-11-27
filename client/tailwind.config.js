/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        custom: {
          bg: "#F4F8FB",
          primary: "#0080FF",
          secondary: "#3333FF",
          accent: "#67C6E3",
        },
      },
    },
  },
  plugins: [],
};
