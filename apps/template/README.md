# 油猴脚本项目模板

配置好了 tailwindcss 和 daisyui，并封装了 Toast 组件，通过 Hooks 调用

编写好通过 shadowdom 的方式加载脚本交互面板，避免 tailwindcss 样式污染，因此如果需要修改被寄生页面的样式无法使用脚本相关的 className

## 使用方式

复制项目目录后：

1. 修改 package.json 文件的 name
2. 修改 vite.config.ts 文件的 userscript 内的脚本相关配置，如作用于哪些域名、产物名称 (xx.use.js)
3. 在 app.tsx 中编写脚本逻辑
4. 编写相关的 README.md

## 理解模板原理（可略）

1. 使用 vite-plugin-monkey 插件搭建

```bash
pnpm create monkey
```

选择 preact + ts

和 vite 脚手架提供的项目类似，只是多了些预设的 plugin config

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

    // [兼容性差] 使用 Constructable Stylesheets API 将 Tailwind CSS 样式应用到 Shadow DOM
    // if ("CSSStyleSheet" in window && "replaceSync" in CSSStyleSheet.prototype)
    // const sheet = new CSSStyleSheet();
    // sheet.replaceSync(tailwindStyles);
    // shadowDom.adoptedStyleSheets = [sheet];

    // 创建 style 标签并注入 Tailwind 样式
    const styleTag = document.createElement("style");
    styleTag.textContent = tailwindStyles; // 直接使用导入的 CSS 字符串
    shadowDom.appendChild(styleTag);

    //把 dom 附加到 body 去
    document.body.appendChild(container);
    return root;
  })(),
)
```

✨ 重点： 在 `shadowDOM` 中使用 css(`tailwindcss`) 隔离，不能直接引入，而是通过 `vite` 的 `inline` 方式获得 css 字符，再手动塞入需要的地方

如可以在 `App.tsx` 内（即 `shadowDOM` 内部元素）使用，也可以直接在创建 `shadowDOM` 时设置上

4. React provide toast 组件

## Turborepo + TS

```bash
├── tsconfig.json            # 基础配置
├── tsconfig.app.json        # 应用代码配置
├── tsconfig.node.json       # 工具链配置
├── vite.config.ts           # 构建配置
└── src/
    ├── app.tsx              # TSX 组件
    └── vite-env.d.ts        # 环境类型声明
```

[tsconfig 配置讲解笔记](https://note.5675675.xyz/articles/01-%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0/typescript/%E5%AE%9E%E9%99%85%E5%BA%94%E7%94%A8.html)

[Turborepo 官方文档 - Sharing TypeScript configuration](https://turbo.build/repo/docs/guides/tools/typescript)

`pnpm dlx create-turbo@latest`

dlx（download and execute）

## references or expends

[turborepo about ts references](https://turbo.build/repo/docs/guides/tools/typescript#you-likely-dont-need-typescript-project-references)

[ts Project references](https://www.typescriptlang.org/docs/handbook/project-references.html)
