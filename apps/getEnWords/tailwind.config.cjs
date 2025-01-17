/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // 使用第三方组件，tailwindcss在第三方组件中只有className而没有具体的样式内容，需要把这些组件添加进编译入口(tailwindcss依赖编译时按需生成className对应的样式内容)
    // https://kingan-md-img.oss-cn-guangzhou.aliyuncs.com/blog/20250117151442811.png?x-oss-process=image/format,webp/resize,w_640
    // warn Your‘ content conf igurat ion includes a pattemn which Looks Like it's accidentally matching all of node modules' and can cause serious performance issues.
    // Pattern: ../../packages/ui/**/*.js
    // See our documentation for recommendat ions: https://tailwindcss.com/docs/content-configuration#pattern-recommendations
    // "./node_modules/@an-monkey-tool/ui/**/*.{vue,js,ts,jsx,tsx}",
    "../../packages/ui/**/*.{vue,js,ts,jsx,tsx}",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    // 在shadowdom中daisyui组件样式生效了，但是都没有颜色，查看浏览器发现缺少主题变量相关信息
    // https://daisyui.com/docs/config/#themeroot
    // Which element to attach the theme CSS variables to. In certain situations (such as embedding daisyUI in a shadow root)
    // it may be useful to set this to e.g. *, so all components will have access to the required CSS variables.
    themeRoot: "*",
  },
};
