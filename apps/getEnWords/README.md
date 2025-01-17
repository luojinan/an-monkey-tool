# 新单词 + 1

获取当前页面的单词，并过滤长度小于等于 4 个字符的单词，并过滤已会的单词

## 使用方式

域名是**全匹配**，因此平时要保持关闭状态，并在需要使用时在油猴界面由用户**手动开启**，用完记得**手动关闭**

## 核心实现

提取网页中的单词并统计出现次数

```js
function extractWordsFromElement(elementId) {
  const element = document.querySelector(elementId);
  if (!element) {
    console.error(`Element with ID "${elementId}" not found.`);
    return [];
  }

  // 移除所有 <code> 标签
  const codeElements = element.querySelectorAll('code');
  codeElements.forEach(code => code.remove());

  const text = element.textContent;
  const regex = /[\w'-]+/g;
  let words = text.match(regex) || [];

  const wordCounts = new Map();
  words.forEach(word => {
    if (word.length > 4) {
      word = word.charAt(0).toLowerCase() + word.slice(1);
      wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
    }
  });

  const sortedWords = [...wordCounts.entries()].sort((a, b) => b[1] - a[1]);

  return sortedWords;
}

// 示例用法 （记得替换 "main" 为你实际的元素 ID)
const wordCounts = extractWordsFromElement("main"); // article
fetch('https://kingan-md-img.oss-cn-guangzhou.aliyuncs.com/data/dicts/noneed.json')
  .then(response => response.json())
  .then(data => {
    // data 是字符串数组，wordCounts 则是二维数组，过滤 data
    const afterNoneed = wordCounts.filter(word => !data.includes(word[0]))
    console.log(afterNoneed)
  })
```
