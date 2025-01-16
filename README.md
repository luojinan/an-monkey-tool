# 🐵 脚本

1. 提取网页中的单词并统计出现次数

```js
const noneed = ['turbopack','react','javascript','typescript','value','build','gitHub'];

function extractWordsFromElement(elementId) {
  const element = document.querySelector(elementId);
  if (!element) {
    console.error(`Element with ID "${elementId}" not found.`);
    return [];
  }

  // 移除所有 <code> 标签
  const codeElements = element.querySelectorAll('code');
  codeElements.forEach(code => code.remove());

  const text = element.textContent;
  const regex = /[\w'-]+/g;
  let words = text.match(regex) || [];

  const wordCounts = new Map();
  words.forEach(word => {
    if (word.length > 4 && !noneed.includes(word.toLowerCase())) {
      word = word.charAt(0).toLowerCase() + word.slice(1);
      wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
    }
  });

  const sortedWords = [...wordCounts.entries()].sort((a, b) => b[1] - a[1]);

  return sortedWords;
}

// 示例用法 （记得替换 "main" 为你实际的元素 ID)
const wordCounts = extractWordsFromElement("main"); // article
console.log(wordCounts);
```

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

- 基建：响应式支持移动端、PC 端
- 编辑 oss 的 json 文件上传覆盖

## publish

[auto build actions](https://blog.yunyuyuan.net/articles/2064)

## 脚本

### xianbao

[发布站](https://www.xianbaoku.net/)

```text
线报酷发布页！
自己复制新链接打开，http://new.xianbao.fun/ 或 http://news.xianbao.fun/
无法打开时可以使用这个：http://new.ixbk.net/ 或 http://news.ixbk.net/
无法使用也可以可以使用这个：http://new.ixbk.fun/ 或 http://news.ixbk.fun/
微信：xianbao_fun 微博：线报酷官方
当前网址域名即将失效，请保存最新网址！
```
