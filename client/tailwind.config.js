/**
 * Defaults: https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 * Flowbite: https://flowbite.com/docs/components/buttons/
 * Button animation: https://daisyui.com/components/button/
 * IDEA: alt+j - Shift+Alt+J
 */

module.exports = {
  content: [
      './src/**/*.{js,jsx,ts,tsx}',
      './public/index.html',
  ],
  theme: {
    screens: {
      'sm': '480px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  // corePlugins: [
  //     'margin',
  //     'padding',
  //     'backgroundColor',
  // ]
}
