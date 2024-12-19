/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './storyblok/**/*.{html,js,ts,vue}'
  ],
  theme: {
    extend: {
      fontSize: {
        '11px': '11px',
      },
    },
    screens: {
      'tablet': '832px',
    },
  },
  plugins: [],
}

