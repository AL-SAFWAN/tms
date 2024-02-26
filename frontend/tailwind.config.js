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
          error: '#cc1233',
          warning: '#ffb400',
        },
      },
    ],
    logs: false,
  },
};
