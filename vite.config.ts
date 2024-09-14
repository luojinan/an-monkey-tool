import preact from '@preact/preset-vite';
import { defineConfig } from 'vite';
import monkey, { cdn } from 'vite-plugin-monkey';

// TODO: 支持多入口构建
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    monkey({
      entry: 'src/packages/an-tools/main.tsx',
      userscript: {
        name: 'an-tool-main',
        description: '工具插件集',
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://*/*'],
      },
      build: {
        fileName: 'an-tools.user.js',
        externalGlobals: {
          preact: cdn.npmmirror('preact', 'dist/preact.min.js'),
          // preact: cdn.jsdelivr('preact', 'dist/preact.min.js'),
          // OSS: 'https://gosspublic.alicdn.com/aliyun-oss-sdk-6.18.0.min.js' // ?自定义全局库
        },
      },

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
