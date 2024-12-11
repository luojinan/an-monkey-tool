import { render } from 'preact';
import { App } from './app';
render(
  <App />,
  (() => {
    const container = document.createElement("div");
    container.id = "shadowContainer";

    //创建shadowdom
    const shadowDom = container.attachShadow({ mode: "open" });
    const root = document.createElement("div");
    shadowDom.appendChild(root);
    //把dom附加到body去
    document.body.appendChild(container);
    return root
  })(),
);
