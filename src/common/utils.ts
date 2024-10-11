/**
 * 获取URL查询参数。
 * @param targetKey 如果提供了targetKey，则返回对应键值的参数值；否则返回所有参数组成的对象。
 * @returns 如果提供了targetKey，则返回字符串类型的参数值；否则返回一个记录所有参数及对应值的对象。
 */
export const getUrlParams = (targetKey?: string, url?: string): string | Record<string, string> => {
  const searchParams = new URLSearchParams(url || window.location.search); // 创建一个URLSearchParams实例，用于解析当前URL的查询字符串。
  if (targetKey) {
    // 如果提供了targetKey，尝试获取对应参数值并返回，如果不存在则返回空字符串。
    return searchParams.get(targetKey) || '';
  }
  const paramsObject: Record<string, string> = {}; // 用于存储所有参数的对象。
  // 遍历所有参数，将它们存入paramsObject对象中。
  searchParams.forEach((value, key) => {
    paramsObject[key] = value;
  });
  return paramsObject // 返回包含所有参数及对应值的对象。
};

// 怎么移除都排除不了自身，自身内容也会被移除，因为vue是通过js操作dom的，自身内容就是空的，需要还原得用js还原
export function cleanHtml() {
  // 选择要保留的元素的 ID
  const elementToKeepId = 'clean-flurl';

  // 获取 body 元素
  const bodyElement = document.body;

  if (bodyElement) {
    // 遍历 body 的直接子元素，并移除除了指定 ID 之外的所有元素
    const childElements = Array.from(bodyElement.children);

    childElements.forEach(child => {
      if (child.id !== elementToKeepId) {
        // 如果子元素的 ID 不是要保留的 ID，则移除该子元素
        child.remove();
      }
    });
  }
}


/**
 * 根据提供的元素选择器列表，移除文档中的对应DOM元素。
 * @param list 包含元素选择器字符串的数组，如['.class', '#id']。
 */
export function removeDomByList(list: string[]) {
  // 遍历提供的选择器列表，并尝试移除每个匹配的元素
  list.forEach((item) => {
    document.querySelectorAll(item)?.forEach(item=>item.remove())
  });
};