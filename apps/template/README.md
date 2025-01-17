# 油猴脚本项目模板

配置好了 tailwindcss 和 daisyui，并封装了 Toast 组件，通过 Hooks 调用

编写好通过 shadowdom 的方式加载脚本交互面板，避免 tailwindcss 样式污染，因此如果需要修改被寄生页面的样式无法使用脚本相关的 className

## 使用方式

复制项目目录后：

1. 修改 package.json 文件的 name
2. 修改 vite.config.ts 文件的 userscript 内的脚本相关配置，如作用于哪些域名、产物名称 (xx.use.js)
3. 在 app.tsx 中编写脚本逻辑
4. 编写相关的 README.md

## 原理

1. 使用 vite-plugin-monkey 插件搭建

```bash
pnpm create monkey
```

选择 preact + ts

2. 手动搭建 tailwindcss 和 daisyui

```bash
pnpm add -D tailwindcss postcss autoprefixer daisyui
```

```bash
npx tailwindcss init -p
```

配置 daisyui 插件，参考官方文档

3. 创建 shadowDOM

```tsx
import tailwindStyles from "@an-monkey-tool/tailwind-config/style.css?inline"; // ✨ ?inline
import { render } from "preact";
import { App } from "./app";

render(
 <App />
  (() => {
    const container = document.createElement("div");
    container.id = "shadowContainer-template";

    //创建 shadowdom
    const shadowDom = container.attachShadow({ mode: "open" });
    const root = document.createElement("div");
    shadowDom.appendChild(root);

    // ✨ 使用 Constructable Stylesheets API 将 Tailwind CSS 样式应用到 Shadow DOM
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(tailwindStyles);
    shadowDom.adoptedStyleSheets = [sheet];

    //把 dom 附加到 body 去
    document.body.appendChild(container);
    return root;
  })(),
)
```

✨ 重点： 在 `shadowDOM` 中使用 `tailwindcss` ，只能通过 `vite` 的 `inline` 方式实现

可以在 `App.tsx` 内使用，也可以直接在 `shadowDOM` 创建时就设置上
