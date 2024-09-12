
## init project

[vite-plugin-monkey](https://github.com/lisonge/vite-plugin-monkey)

[tailwind react vite instaill](https://tailwindcss.com/docs/guides/vite)

[daisyUI tailwind instaill](https://daisyui.com/docs/install/)

```bash
pnpm create monkey

pnpm i
pnpm add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

pnpm add -D daisyui@latest
```

👇 set tailwind config.js plugin to daisyui

```js
module.exports = {
  //...
  plugins: [
    require('daisyui'),
  ],
}
```

👇 set tailwind global style.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  box-sizing: border-box;
  background-color: unset;
  /* color-scheme: 'auto'; */
  color-scheme: unset;
  color: unset;
}
```

set viteconfig for more packages

```ts
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    monkey({
      entry: 'src/packages/an-tools/main.tsx', // ✨
      userscript: {
        // name
        // description
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.google.com/'],
      },
      build: {
        fileName: 'douban-group.user.js',
        externalGlobals: {
          preact: cdn.npmmirror('preact', 'dist/preact.min.js'), // ✨
          // preact: cdn.jsdelivr('preact', 'dist/preact.min.js'),
        },
      },
    }),
  ]
});
```

## functions

- 基建: 响应式支持移动端、PC端
- 编辑oss的json文件上传覆盖

## publish

[auto build actions](https://blog.yunyuyuan.net/articles/2064)
