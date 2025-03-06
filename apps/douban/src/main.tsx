import tailwindStyles from "@an-monkey-tool/tailwind-config/style.css?inline";
import ToastProvider from "@an-monkey-tool/ui/ToastProvider";
import { render } from "preact";
import { App } from "./app";
import "./reset.css";

render(
  <ToastProvider>
    <App />
  </ToastProvider>,
  (() => {
    const container = document.createElement("div");
    container.id = "shadowContainer-an";

    //创建shadowdom
    const shadowDom = container.attachShadow({ mode: "open" });
    const root = document.createElement("div");
    shadowDom.appendChild(root);

    // [兼容性差]使用 Constructable Stylesheets API 将 Tailwind CSS 样式应用到 Shadow DOM
    // if ("CSSStyleSheet" in window && "replaceSync" in CSSStyleSheet.prototype)
    // const sheet = new CSSStyleSheet();
    // sheet.replaceSync(tailwindStyles);
    // shadowDom.adoptedStyleSheets = [sheet];

    // 创建style标签并注入Tailwind样式
    const styleTag = document.createElement("style");
    styleTag.textContent = tailwindStyles; // 直接使用导入的CSS字符串
    shadowDom.appendChild(styleTag);

    //把dom附加到body去
    document.body.appendChild(container);
    return root;
  })(),
);
