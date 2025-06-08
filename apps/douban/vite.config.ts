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
        name: "豆瓣小组增强",
        version: "1.1.1",
        description: "过滤无效评论，优化PC网页样式",
        icon: "https://img1.doubanio.com/favicon.ico",
        namespace: "npm/vite-plugin-monkey",
        match: ["https://www.douban.com/group/*"],
      },
      build: {
        fileName: "douban-group.user.js",
        externalGlobals: {
          preact: cdn.npmmirror("preact", "dist/preact.min.js"),
        },
      },
    }),
  ],
});
