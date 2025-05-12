import preact from '@preact/preset-vite';
import { defineConfig } from 'vite';
import monkey, { cdn } from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "../../dist",
    emptyOutDir: false,
  },
  plugins: [
    preact(),
    monkey({
      entry: "src/main.tsx",
      userscript: {
        name: "接口文档增强",
        version: "1.0.0",
        description: "复制接口名称",
        icon: "https://vitejs.dev/logo.svg",
        namespace: "npm/vite-plugin-monkey",
        match: ["https://dsjedu.com.cn/prod-api/doc.html", "https://tenvia.cn/prod-api/doc.html"],
      },
      build: {
        fileName: "an-tools-api.user.js",
        externalGlobals: {
          preact: cdn.npmmirror("preact", "dist/preact.min.js"),
        },
      }
    })
  ],
});
