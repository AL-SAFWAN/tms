/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      'night',
      {
        nord: {
          ...require('daisyui/src/theming/themes')['nord'],
          error: '#f93e3e',
          warning: '#fca12f',
          info: '#61affe',
        },
      },
    ],
    logs: false,
  },
};
