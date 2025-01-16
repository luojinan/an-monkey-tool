import { render } from 'preact';
import '@an-monkey-tool/tailwind-config/style.css';
import { App } from './app';
render(
  <App />,
  (() => {
    const app = document.createElement('div');
    document.body.append(app);
    return app;
  })(),
);
