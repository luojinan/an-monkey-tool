/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    // https://daisyui.com/docs/config/#themeroot
    // Which element to attach the theme CSS variables to. In certain situations (such as embedding daisyUI in a shadow root)
    // it may be useful to set this to e.g. *, so all components will have access to the required CSS variables.
    themeRoot: "*",
  },
}

