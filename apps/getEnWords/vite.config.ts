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
        name: "新单词+1",
        description: "获取当前页面的单词，并过滤已会的单词",
        icon: "https://img1.doubanio.com/favicon.ico",
        namespace: "npm/vite-plugin-monkey",
        match: ["*://*/*"],
      },
      build: {
        fileName: "get-en-words.user.js",
        externalGlobals: {
          preact: cdn.npmmirror("preact", "dist/preact.min.js"),
        },
      },
    }),
  ],
});
