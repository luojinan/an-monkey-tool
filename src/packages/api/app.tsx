import { useEffect, useState } from "preact/hooks";
import { copyToClipboard } from "../../utils";

export function App() {
  const [showToast, setShowToast] = useState(false);
  const [name, setName] = useState('');

  function generateMethodName(url: string, method: string) {
    // 移除 URL 中的斜杠并替换为驼峰命名法
    const segments = url
      .replace(/\//g, '-')
      .replace(/\{(\w+)\}/g, 'By$1') // 替换 {xx} 为 Byxx
      .split('-')
      .map(seg => seg.charAt(0).toUpperCase() + seg.slice(1).toLowerCase())

    // 拼接成最终的方法名
    const methodName = `${method}${segments.join('')}`

    return methodName
  }

  const getApiName = () => {
    // 获取所有 div 元素
    const allDivs = document.querySelectorAll('main');
    // 筛选出 aria-hidden 为 false 的 div 元素
    const filteredDivs = Array.from(allDivs).filter(div => div?.parentElement?.getAttribute('aria-hidden') === 'false');

    // 查找 class 为 knife4j-api-summary 的元素
    const targetElements = filteredDivs.reduce((acc, div) => {
      const found = div.querySelectorAll('.knife4j-api-summary');
      return acc.concat(Array.from(found));
    }, []);

    const res: string[] = []
    targetElements.forEach(item => {
      const [methodKey, pathKey] = item.innerText.split('\n')
      const name = generateMethodName(pathKey.slice(1), methodKey.slice(1).toLowerCase())
      res.push(name)
    })
    return res
  }

  const copyApiName = () => {
    const name = getApiName().join('')

    copyToClipboard(name)
    setName(name)

    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
      setName('')
    }, 3000);
  }
  // 定义一个回调函数来处理 DOM 变化
  function handleMutations(mutationsList) {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        const elements = document.querySelectorAll('.knife4j-api-copy-address');
        const elementsArray = Array.from(elements);
        const matchingElements = elementsArray.filter(element => element.textContent.trim() === '复制接口');
        if (!matchingElements.length) return

        const node = matchingElements[0] as HTMLElement;
        // 修改元素内容
        node.innerHTML = '✨ 复制接口';
        node.style.color = 'blue'
        node.style.fontWeight = 'bold'

        // 绑定自定义点击事件
        node.addEventListener('click', (event) => {
          event.stopPropagation()
          copyApiName()
        });
      }
    }
  }

  useEffect(() => {
    // 创建 MutationObserver 实例
    const observer = new MutationObserver(handleMutations);
    // 配置观察选项
    const config = { childList: true, subtree: true };
    // 开始观察目标元素的变化
    observer.observe(document.body, config);
  }, [])

  return (
    <>
      <div className="toast toast-center">
        <div className={`alert alert-success text-white ${showToast ? '' : 'hidden'}`}>
          <span>🎉 copy success <em className="underline">{name}</em></span>
        </div>
      </div>
    </>
  );
}
