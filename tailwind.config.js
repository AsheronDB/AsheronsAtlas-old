/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "media",
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      zIndex: {
        50000: "50000",
      },
    },
  },
  plugins: [require("flowbite/plugin"), function({ addBase, theme }) {
    function extractColorVars(colorObj, colorGroup = '') {
      return Object.keys(colorObj).reduce((vars, colorKey) => {
        const value = colorObj[colorKey];

        const newVars =
          typeof value === 'string'
            ? { [`--tw-color${colorGroup}-${colorKey}`]: value }
            : extractColorVars(value, `-${colorKey}`);

        return { ...vars, ...newVars };
      }, {});
    }

    addBase({
      ':root': extractColorVars(theme('colors')),
    });
  },],
};
