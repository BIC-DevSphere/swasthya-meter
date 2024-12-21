/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  	   colors:{
		'primary': '#89CFF0',
  	   	'secondary': '#C2E9A5',
		'accents': '#64FEE2',
	   },
     fontFamily: {
      primary: ['poppins', 'sans-serif'], 
    },
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
