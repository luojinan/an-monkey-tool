
export function App() {

  function generateMethodName(url, method) {
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

  const menuList = [
    {
      title: '功能入口',
      onClick: () => {
        // 获取所有 div 元素
        const allDivs = document.querySelectorAll('main');
        // 筛选出 aria-hidden 为 false 的 div 元素
        const filteredDivs = Array.from(allDivs).filter(div => div?.parentElement?.getAttribute('aria-hidden') === 'false');

        // 查找 class 为 knife4j-api-summary 的元素
        const targetElements = filteredDivs.reduce((acc, div) => {
          const found = div.querySelectorAll('.knife4j-api-summary');
          return acc.concat(Array.from(found));
        }, []);

        targetElements.forEach(item => {
          const [methodKey, pathKey] = item.innerText.split('\n')
          const res = generateMethodName(pathKey.slice(1), methodKey.slice(1).toLowerCase())
          console.log(res)
        })
      }
    }, // 填写oss 信息，后存储到本地，支持上传
    { title: '功能入口' },
    { title: '功能入口' },
  ]

  return (
    <>
      <div className="drawer drawer-end" style={{ 'zIndex': 999 }}>
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="fixed right-2 bottom-5">
          <label htmlFor="my-drawer" className="btn btn-primary drawer-button">✨🤖✨</label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-4/5 p-4 flex flex-row">
            {menuList.map((item, index) => (
              <li class="w-full sm:w-1/2" key={index} onClick={() => item.onClick()}>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div >
    </>
  );
}
