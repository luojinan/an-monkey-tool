import preact from "@preact/preset-vite";
import { defineConfig } from "vite";
import type { MonkeyOption } from "vite-plugin-monkey";
import monkey, { cdn } from "vite-plugin-monkey";

// TODO: 支持多入口构建
// https://vitejs.dev/config/

// 豆瓣小组增强配置
const doubanConfig = {
  entry: "src/packages/douban/main.tsx",
  userscript: {
    name: "豆瓣小组增强",
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
};

// 线报增强配置
const xianbaoConfig = {
  entry: "src/packages/xianbao/main.tsx",
  userscript: {
    name: "线报增强",
    description: "过滤无效评论，移除广告，移除不感兴趣作业，优化跳转",
    icon: "http://new.xianbao.fun/favicon.ico",
    namespace: "npm/vite-plugin-monkey",
    match: [
      "http://new.xianbao.fun/douban-maizu/*",
      "http://new.xianbao.fun/category-douban-maizu/*",
    ],
  },
  build: {
    fileName: "xianbao.user.js",
    externalGlobals: {
      preact: cdn.npmmirror("preact", "dist/preact.min.js"),
    },
  },
};

// an-tool-main 配置
const anToolsConfig = {
  entry: "src/packages/an-tools/main.tsx",
  userscript: {
    name: "an-tool-main",
    description: "工具插件集",
    icon: "https://vitejs.dev/logo.svg",
    namespace: "npm/vite-plugin-monkey",
    match: ["https://*/*"],
  },
  build: {
    fileName: "an-tools.user.js",
    externalGlobals: {
      preact: cdn.npmmirror("preact", "dist/preact.min.js"),
    },
  },
};

// 接口文档增强配置
const apiConfig = {
  entry: "src/packages/api/main.tsx",
  userscript: {
    name: "接口文档增强",
    description: "复制接口名称",
    icon: "https://vitejs.dev/logo.svg",
    namespace: "npm/vite-plugin-monkey",
    match: ["https://dsjedu.com.cn:8912/*"],
  },
  build: {
    fileName: "an-tools-api.user.js",
    externalGlobals: {
      preact: cdn.npmmirror("preact", "dist/preact.min.js"),
    },
  },
};

// HTML内容提取器配置
const htmlExtractorConfig: MonkeyOption = {
  entry: "src/packages/html-extractor/main.tsx",
  userscript: {
    name: "HTML内容提取器",
    description: "提取网页中的HTML内容",
    icon: "https://vitejs.dev/logo.svg",
    namespace: "npm/vite-plugin-monkey",
    version: "1.0.0",
    match: ["https://it.yusys.com.cn/*"],
    // require: [
    //   "https://code.jquery.com/jquery-2.1.4.min.js",
    //   "https://gosspublic.alicdn.com/aliyun-oss-sdk-6.18.0.min.js",
    // ], // ?FIXME: 没生效 自定义全局库
  },
  build: {
    fileName: "html-extractor.user.js",
    externalGlobals: {
      preact: cdn.npmmirror("preact", "dist/preact.min.js"),
    },
  },
};

export default defineConfig({
  build: {
    emptyOutDir: false, // 设置打包时不清空 dist 目录
  },
  plugins: [
    preact(),
    // monkey(doubanConfig),
    // monkey(xianbaoConfig), // 取消注释以启用线报增强
    // monkey(anToolsConfig), // 取消注释以启用an-tool-main
    // monkey(apiConfig), // 取消注释以启用接口文档增强
    monkey(htmlExtractorConfig), // 取消注释以启用HTML内容提取器
  ],
});
