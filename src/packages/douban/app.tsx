import { useEffect, useState } from "preact/hooks";
import { getUrlParams, removeDomByList } from '../../common/utils';
import styles from "../../style.css?inline";
import type { MenuItem } from "../an-tools/app";
import { filterCommentText } from "./const";

function removeQueryParam(url: string, paramToRemove: string) {
  // 创建一个 URL 对象
  const urlObj = new URL(url);

  // 获取查询参数对象
  const params = new URLSearchParams(urlObj.search);

  // 检查并移除指定的查询参数
  if (params.has(paramToRemove)) {
    params.delete(paramToRemove);
  }

  // 重新构建 URL
  urlObj.search = params.toString();

  // 返回处理后的 URL
  return urlObj.href;
}

function extractRichTextContent(element: Element): string {
  let content = '';

  // 遍历所有子节点
  element.childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      // 如果是文本节点，直接添加其内容
      content += node.textContent.replace(/\s+/g, ' ').trim() + '\n';
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const tagName = node.tagName.toLowerCase();

      if (tagName === 'p') {
        // 如果是 <br> 元素，添加换行
        content += '\n';
        content += extractRichTextContent(node as Element);
      } else if (tagName === 'img') {
        // 如果是 <img> 元素，添加图片 URL
        const src = node.getAttribute('src');
        if (src) {
          content += `[图片](${src})\n`;
        }
      } else if (tagName === 'a') {
        // 如果是 <a> 元素，处理链接
        const href: string = node.getAttribute('href');
        const innerText = node.textContent.trim();
        if (href && innerText && !href.startsWith('https://www.douban.com/link2')) {
          content += `[${innerText}](${href})`;
        } else {
          content += innerText
        }
      } else {
        // 对其他元素进行递归处理
        content += extractRichTextContent(node as Element);
      }
    }
  });

  return content.replace(/\n+$/, '');;
}

export function App() {
  const [count, setCount] = useState<number>(0);
  const [qaList, setQaList] = useState<{ question: string; answer: string }[]>([]);
  const [showToast, setShowToast] = useState(false);

  const menuList: MenuItem[] = [
    {
      title: '🔵 复制作业内容',
      onClick: () => {
        // 从className为topic-content的dom中提取文本内容，注意不需要js等内容，只要文本和图片和换行，添加到剪贴板

        // 使用示例
        const richTextElement = document.querySelector('.topic-richtext');
        if (richTextElement) {
          const richTextContent = extractRichTextContent(richTextElement);

          const title = document.querySelector('.article h1')?.textContent?.trim();
          console.log('提取的富文本内容：', richTextContent);
          navigator.clipboard.writeText(`${removeQueryParam(location.href, '_i')}\n\n${title}${richTextContent}`)

          setShowToast(true)
          setTimeout(() => {
            setShowToast(false)
          }, 3000);
        }
      }
    }, // 填写oss 信息，后存储到本地，支持上传
    {
      title: '🟢 打开豆瓣APP',
      onClick: () => {
        const { host, pathname } = location
        const newUrl = `douban://${host.replace('www.', '')}${pathname}`
        window.open(newUrl);
      }
    },
  ]
  const fixPhone = () => {
    const body = document.querySelector('body');
    if (body) {
      body.style.boxSizing = 'border-box';
      body.style.width = '100vw';
      body.style.maxWidth = '800px';
      body.style.padding = '10px 10px 0 10px';
    }

    const topicContent = document.querySelector('.topic-content') as HTMLElement | null;
    if (topicContent) {
      topicContent.style.display = 'flex';
      topicContent.style.flexDirection = 'column';
    }

    const wrapper = document.getElementById('wrapper');
    if (wrapper) {
      wrapper.style.width = '100%';
    }

    const doc = document.querySelector('.topic-doc') as HTMLElement | null;
    if (doc) {
      doc.style.width = '100%';
      doc.style.padding = '10px';
      doc.style.boxSizing = 'border-box';
    }

    // 获取 className 为 topic-doc 的元素
    const topicDoc = document.querySelector('.topic-doc');

    // 获取 topic-doc 内的 h3 元素
    const h3Element = topicDoc?.querySelector('h3');

    // 获取 className 为 user-face 的 div 元素
    const userFaceDiv = document.querySelector('.user-face');

    // 检查 h3 元素是否存在
    if (h3Element) {
      // 将 h3 元素从当前父元素中移除
      topicDoc?.removeChild(h3Element);

      // 将 h3 元素添加到 user-face 的 div 元素内部
      userFaceDiv?.appendChild(h3Element);
    } else {
      console.log('没有找到 h3 元素');
    }
  };

  const removeAd = () => {
    const contentDiv = document.getElementById('content');
    const articleDiv = document.querySelector('.article');

    if (articleDiv && contentDiv) {
      contentDiv.appendChild(articleDiv);
    }

    const strList = ['.grid-16-8', '.sns-bar', '#db-nav-group', '#db-global-nav', '.comment-form', '#footer', '#landing-bar', '.txd', '.topic-opt', '#link-report_group'];
    removeDomByList(strList);
  };

  const removeComment = () => {
    let localCount = 0;
    document.querySelectorAll('.reply-content').forEach((item) => {
      const dom = item as HTMLElement;
      const content = dom.innerText.replace(filterCommentText, '');
      if (!content || ['d', 'D', '牛', '，', ','].includes(content)) {
        localCount++;
        dom.parentElement?.parentElement?.remove();
      } else {
        dom.innerText = content;
      }
    });
    return localCount;
  };

  const insertElementBeforeFirstRendered = (className: string, newElement: HTMLElement) => {
    const firstRenderedElement = document.querySelector(`.${className}`);
    if (firstRenderedElement && firstRenderedElement.parentElement) {
      firstRenderedElement.parentElement.insertBefore(newElement, firstRenderedElement);
    }
  };

  const str2atag = (str: string) => {
    const regex = /https?:\/\/\S+/gi;
    return str.replace(regex, (match) => `<a href="${match}" target="_blank">${match}</a>`);
  };

  const setQa = () => {
    const qaData = getUrlParams('qa') as string | null;
    if (qaData) {
      const res = JSON.parse(qaData) as { question: string; answer: string }[];
      setQaList(res);

      setTimeout(() => {
        const qaHtml = res
          .map((item) => `
            <div style="padding: 10px;margin-bottom: 10px;border: 1px solid #ccc;border-radius: 5px;">
              <div style="user-select: text;margin-bottom:10px;color: #333">🔮: ${item.question}</div>
              <div style="user-select: text; font-size: 16px;">🎉 : ${str2atag(item.answer)}</div>
            </div>
          `)
          .join('');

        const newElement = document.createElement('div');
        newElement.innerHTML = qaHtml;
        insertElementBeforeFirstRendered('rendered', newElement);

        const strList = ['.question-wrapper', '.poll-wrapper'];
        removeDomByList(strList);
      }, 300);
    }
  };

  useEffect(() => {
    console.log('✨ douban-group 脚本 ✨');
    fixPhone();
    removeAd();
    setQa();
    const removedComments = removeComment();
    setCount(removedComments);
  }, []); // Empty dependency array to run once on mount

  return (
    <>
      <style>{styles}</style>
      <div className="drawer drawer-end" style={{ 'zIndex': 1 }}>
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="fixed right-2 bottom-5">
          <label htmlFor="my-drawer" className="btn btn-primary drawer-button">✨ 已移除无效评论{count}条</label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-4/5 p-4">
            {
              menuList.map(item => <button key={item.title} className="btn btn-primary w-full mb-2" onClick={item?.onClick}>{item.title}</button>)
            }
          </ul>
        </div>
      </div >

      <div className="toast toast-center z-10">
        <div className={`alert alert-success text-white ${showToast ? '' : 'hidden'}`}>
          <span>🎉 复制成功，去粘贴吧～</span>
        </div>
      </div>
    </>
  );
};