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
      entry: 'src/main.tsx',
      userscript: {
        name: "脚本名称",
        description: "脚本描述",
        icon: "https://img1.doubanio.com/favicon.ico",
        namespace: "npm/vite-plugin-monkey",
        match: ["https://www.douban.com/group/*"],
      },
      build: {
        fileName: "template.user.js",
        externalGlobals: {
          preact: cdn.npmmirror("preact", "dist/preact.min.js"),
        },
      },
    }),
  ],
});
