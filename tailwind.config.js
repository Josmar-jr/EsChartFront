const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/pages/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    colors: {
      slate: colors.slate,
      red: colors.red,
      gray: colors.gray,
      zinc: colors.zinc,
      primary: '#034ea1',
      secondary: '#0095db',
      neutral: '#F3FAFD',
      primaryDark: '#033165'
    }
  },
  plugins: []
};
