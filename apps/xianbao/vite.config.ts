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
        name: "线报增强",
        description: "过滤无效评论，移除广告，移除不感兴趣作业，优化跳转",
        version: "1.1.0",
        icon: "http://new.xianbao.fun/favicon.ico",
        namespace: "npm/vite-plugin-monkey",
        match: [
          "*://new.xianbao.fun/douban-maizu/*",
          "*://new.xianbao.fun/category-douban-maizu/*",
        ],
      },
      build: {
        fileName: "xianbao.user.js",
        externalGlobals: {
          preact: cdn.npmmirror("preact", "dist/preact.min.js"),
        },
      },
    }),
  ],
});
