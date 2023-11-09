/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      scrollbar: {
        width: "20px",
        track: "inset 0 0 5px grey",
        thumb: "red",
        thumbHover: "#b30000",
      },
    },
  },

  plugins: [require("daisyui"), require("tailwind-scrollbar-hide")],
};
