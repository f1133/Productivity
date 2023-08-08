/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg_img1': "url('/img1.jpg')",
        'bg_img2': "url('/img2.jpg')",
        'bg_img3': "url('/img3.jpg')",
      },
    },
  },
  plugins: [],
}
