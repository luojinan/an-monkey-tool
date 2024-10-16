import preact from '@preact/preset-vite';
import { defineConfig } from 'vite';
import monkey, { cdn } from 'vite-plugin-monkey';

// TODO: 支持多入口构建
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: false, // 设置打包时不清空 dist 目录
  },
  plugins: [
    preact(),
    monkey({
      entry: 'src/packages/douban/main.tsx',
      userscript: {
        name: '豆瓣小组增强',
        description: '过滤无效评论，优化PC网页样式',
        icon: 'https://img1.doubanio.com/favicon.ico',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.douban.com/group/*'],
      },
      build: {
        fileName: 'douban-group.user.js',
        externalGlobals: {
          preact: cdn.npmmirror('preact', 'dist/preact.min.js'),
          // preact: cdn.jsdelivr('preact', 'dist/preact.min.js'),
          // OSS: 'https://gosspublic.alicdn.com/aliyun-oss-sdk-6.18.0.min.js' // ?自定义全局库
        },
      },

      // entry: 'src/packages/xianbao/main.tsx',
      // userscript: {
      //   name: '线报增强',
      //   description: '过滤无效评论，移除广告，移除不感兴趣作业，优化跳转',
      //   icon: 'http://new.xianbao.fun/favicon.ico',
      //   namespace: 'npm/vite-plugin-monkey',
      //   match: ['http://new.xianbao.fun/douban-maizu/*','http://new.xianbao.fun/category-douban-maizu/*'],
      // },
      // build: {
      //   fileName: 'xianbao.user.js',
      //   externalGlobals: {
      //     preact: cdn.npmmirror('preact', 'dist/preact.min.js'),
      //   },
      // },

      // entry: 'src/packages/an-tools/main.tsx',
      // userscript: {
      //   name: 'an-tool-main',
      //   description: '工具插件集',
      //   icon: 'https://vitejs.dev/logo.svg',
      //   namespace: 'npm/vite-plugin-monkey',
      //   match: ['https://*/*'],
      // },
      // build: {
      //   fileName: 'an-tools.user.js',
      //   externalGlobals: {
      //     preact: cdn.npmmirror('preact', 'dist/preact.min.js'),
      //     // preact: cdn.jsdelivr('preact', 'dist/preact.min.js'),
      //     // OSS: 'https://gosspublic.alicdn.com/aliyun-oss-sdk-6.18.0.min.js' // ?自定义全局库
      //   },
      // },

      // entry: 'src/packages/api/main.tsx',
      // userscript: {
      //   name: '接口文档增强',
      //   description: '复制接口名称',
      //   icon: 'https://vitejs.dev/logo.svg',
      //   namespace: 'npm/vite-plugin-monkey',
      //   match: ['https://dsjedu.com.cn:8912/*'],
      // },
      // build: {
      //   fileName: 'an-tools-api.user.js',
      //   externalGlobals: {
      //     preact: cdn.npmmirror('preact', 'dist/preact.min.js'),
      //     // preact: cdn.jsdelivr('preact', 'dist/preact.min.js'),
      //     // OSS: 'https://gosspublic.alicdn.com/aliyun-oss-sdk-6.18.0.min.js' // ?自定义全局库
      //   },
      // },
    }),
  ]
});
