# 新单词 + 1

一个油猴脚本，用于提取网页中的英文单词，帮助学习英语。它能自动识别页面中的单词，统计词频，并过滤掉已掌握的单词，让你专注于学习新的词汇。

## 功能特点

- 自动提取网页中的英文单词
- 过滤长度小于等于 4 个字符的简单单词
- 统计单词出现频率，按频率排序展示
- 过滤用户已掌握的单词（通过远程词库）
- 移除代码块中的单词，避免技术术语干扰
- 支持任意网页使用（全域名匹配）

## 技术栈

- Preact - 轻量级的 React 替代方案
- TypeScript - 提供类型安全
- TailwindCSS + DaisyUI - 样式解决方案
- Vite - 构建工具
- vite-plugin-monkey - 油猴脚本打包插件

## 使用方式

1. 安装油猴插件（Tampermonkey）到你的浏览器
2. 安装此脚本
3. 由于脚本是全域名匹配，建议平时保持关闭状态
4. 在需要提取单词的页面，在油猴插件界面手动开启此脚本
5. 使用完毕后记得手动关闭，避免影响其他页面浏览

## 技术实现

### 界面组件

项目使用 DaisyUI 组件库构建界面，主要包含以下部分：

1. 抽屉式布局（Drawer）
   - 使用 DaisyUI 的 drawer 组件实现侧边抽屉效果
   - 通过 useState 控制抽屉的开关状态
   - 固定在页面右下角的触发按钮

2. 统计面板（Stats）
   - 展示单词总数、已过滤单词数等统计信息
   - 使用 DaisyUI 的 stats 组件构建
   - 包含导出单词列表功能

3. 单词列表（Table）
   - 使用响应式表格展示单词及出现次数
   - 支持删除已掌握的单词
   - 表格布局采用 fixed 以优化长单词显示

### 核心功能

1. 单词提取与处理

```js
// 从页面提取单词
function extractWordsFromElement(elementId) {
  const element = document.querySelector(elementId);
  if (!element) return [];

  // 移除代码块中的单词
  const codeElements = element.querySelectorAll('code');
  codeElements.forEach(code => code.remove());

  const text = element.textContent;
  const regex = /[\w'-]+/g;
  let words = text.match(regex) || [];

  // 统计词频
  const wordCounts = new Map();
  words.forEach(word => {
    if (word.length > 4) {
      word = word.charAt(0).toLowerCase() + word.slice(1);
      wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
    }
  });

  return [...wordCounts.entries()].sort((a, b) => b[1] - a[1]);
}
```

2. 单词导出

```js
const exportWords = () => {
  const formattedWords = words
    .map(([word, count]) => `${word}: ${count}次`)
    .join("\n");
  navigator.clipboard.writeText(formattedWords);
};
```

### API 交互

与后端 API 交互主要用于管理已掌握的单词：

1. 过滤已掌握单词

```js
const filterWords = async (words) => {
  const response = await fetch('API_URL/known-words');
  const knownWords = await response.json();
  return words.filter(word => !knownWords.includes(word));
};
```

2. 标记单词为已掌握

```js
const uploadWord = async (word) => {
  await fetch('API_URL/mark-known', {
    method: 'POST',
    body: JSON.stringify({ word })
  });
};
```

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build
```

构建后的脚本文件位于项目根目录的 `dist/get-en-words.user.js`。
