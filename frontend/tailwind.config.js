/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['dracula'], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
};
