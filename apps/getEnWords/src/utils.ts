function getWordStem(word: string) {
  // Validate input
  if (typeof word !== 'string' || word.trim() === '') {
    return null;
  }

  // Create regex pattern to capture stem
  const regex = /^(.+?)(es|s)$/;

  // Execute regex
  const match = word.match(regex);

  // Return the stem if found, otherwise return original word
  return match ? match[1] : word;
}



export function extractWordsFromElement(elementId: string): [string, number][] {
  const element = document.querySelector(elementId);
  if (!element) {
    console.error(`Element with ID "${elementId}" not found.`);
    return [];
  }

  // 创建副本并移除所有 <code> 标签
  const elementClone = element.cloneNode(true) as Element;
  const codeElements = elementClone.querySelectorAll('code');
  for (const code of codeElements) {
    code.remove();
  }

  const text = elementClone.textContent || '';
  const regex = /[\w'-]+/g;
  const words = text.match(regex) || [];

  const wordCounts = new Map();
  for (const word of words) {
    if (word.length > 4) {
      const normalizedWord = word.charAt(0).toLowerCase() + word.slice(1);
      // 当单词的结尾是es或者是s时去取这个结尾，使用正则
      const withoutSWord = getWordStem(normalizedWord)

      // TODO: 当单词使用 - 分割时，拆成多个单词
      // TODO: 修改输出结果的结构，现在是[test,1]改为[good, {times: 1, origin: goods}]，次数使用times，如果有去掉结尾则使用origin
      wordCounts.set(withoutSWord, (wordCounts.get(withoutSWord) || 0) + 1);
    }
  }

  const sortedWords = [...wordCounts.entries()].sort((a, b) => b[1] - a[1]);

  return sortedWords;
}

// 发起 fetch 请求获取 json https://kingan-md-img.oss-cn-guangzhou.aliyuncs.com/data/dicts/noneed.json
export const filterWords = (wordCounts: [string, number][]) => {
  return fetch('https://kingan-md-img.oss-cn-guangzhou.aliyuncs.com/data/dicts/noneed.json')
    .then(response => response.json())
    .then(data => {
      // data 是字符串数组，wordCounts 则是二维数组，请过滤 data
      const afterNoneed = wordCounts.filter(word => !data.includes(word[0]))
      return afterNoneed
    })
};
