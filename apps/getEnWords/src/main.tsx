import tailwindStyles from "@an-monkey-tool/tailwind-config/style.css?inline";
import ToastProvider from "@an-monkey-tool/ui/ToastProvider";
import { render } from "preact";
import { App } from "./app";

render(
  <ToastProvider>
    <App />
  </ToastProvider>,
  (() => {
    const container = document.createElement("div");
    container.id = "shadowContainer-template";

    //创建shadowdom
    const shadowDom = container.attachShadow({ mode: "open" });
    const root = document.createElement("div");
    shadowDom.appendChild(root);

    // 使用 Constructable Stylesheets API 将 Tailwind CSS 样式应用到 Shadow DOM
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(tailwindStyles);
    shadowDom.adoptedStyleSheets = [sheet];

    //把dom附加到body去
    document.body.appendChild(container);
    return root;
  })(),
);
