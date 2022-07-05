const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/pages/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  extend: {
    keyframes: {
      wiggle: {
        '0%': { transform: 'translateY(-180px) opacity(0)' },
        '100%': { transform: 'translateY(0) opacity(1)' }
      }
    },
    animation: {
      wiggle: 'wiggle 2s ease-in-out initial'
    }
  },
  theme: {
    colors: {
      slate: colors.slate,
      red: colors.red,
      blue: colors.blue,
      cyan: colors.cyan,
      sky: colors.sky,
      gray: colors.gray,
      zinc: colors.zinc,
      white: colors.white,
      green: colors.green,
      primary: '#034ea1',
      secondary: '#0095db',
      blueOpacity: 'rgba(0, 149, 219, 0.23)',
      neutral: {
        200: '#F3FAFD',
        300: '#D9EFF9'
      },
      primaryDark: '#033165'
    }
  },
  plugins: []
};
