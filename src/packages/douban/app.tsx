import { useEffect, useState } from "preact/hooks";
import { useToast } from "../../common/components/ToastProvider";
import { getUrlParams, removeDomByList } from '../../common/utils';
import type { MenuItem } from "../an-tools/app";
import { filterCommentText, sbCodeMap } from "./const";
import { fixPhone, removeAd, resetOutsideDoubanLink } from "./utils";

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
        content += ''
        // const src = node.getAttribute('src');
        // if (src) {
        // content += `[图片](${src})\n`;
        // }
      } else if (tagName === 'a') {
        // 如果是 <a> 元素，处理链接
        const href: string = node.getAttribute('href');
        const innerText = node.textContent.trim();
        if (href && innerText && !href.startsWith('https://www.douban.com/link2') && innerText !== href) {
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
  const [content, setContent] = useState('');

  const { showToast } = useToast();

  const menuList: MenuItem[] = [
    {
      title: '🔴 复制作业标题(链接)',
      onClick: () => {
        const title = document.querySelector('.article h1')?.textContent?.trim();
        navigator.clipboard.writeText(`${title?.replace('作业｜【作业】', '')}（${location.host}${location.pathname}）`)

        showToast('🎉 复制成功，去粘贴吧～');
      }
    },
    {
      title: '🔵 复制作业内容',
      onClick: () => {
        navigator.clipboard.writeText(content)

        showToast('🎉 复制成功，去粘贴吧～');
      }
    },
    {
      title: '🟢 打开豆瓣APP',
      onClick: () => {
        const { host, pathname } = location
        const newUrl = `douban://${host.replace('www.', '')}${pathname}`
        window.open(newUrl);
      }
    },
  ]

  const removeComment = () => {
    let localCount = 0;
    document.querySelectorAll('.reply-content').forEach((item) => {
      const dom = item as HTMLElement;
      let content = dom.innerText.replace(filterCommentText, '');
      // 定义用于移除首字符为标点符号的正则表达式
      const removeLeadingPunctuation = /^[.,!?;:“”‘’"…—，]+/;
      // 定义用于移除尾字符为标点符号的正则表达式
      const removeTrailingPunctuation = /[.,!?;:“”‘’"…—，]+$/;
      // 移除首字符为标点符号的部分
      content = content.replace(removeLeadingPunctuation, '');
      // 移除尾字符为标点符号的部分
      content = content.replace(removeTrailingPunctuation, '');

      if (!content || ['d', 'D', '牛', '，', ',', '。', '马', '天才', '🐎', '码'].includes(content)) {
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
    var regex = /\b\d{6,}\b/g;
    Object.keys(sbCodeMap).forEach(function (key) {
      // 检查p标签的内容中是否包含字典的键
      if (!str.includes('http') && str.includes(key)) {
        // 使用字典的值替换掉匹配的文本
        str = str.replace(new RegExp(key, 'g'), `${key}(${sbCodeMap[key]})`);
      }
      // TODO: 答案中的返利链接提醒-插入a标签，提供清理和提取货号
    });
    return str.replace(regex, (match) => `${match}<a href="https://item.jd.com/${match}.html" target="_blank"> ✨京东链接</a>`);
  };

  const setQa = () => {
    const qaData = getUrlParams('qa') as string | null;
    if (qaData) {
      const res = JSON.parse(qaData) as { question: string; answer: string }[];
      const list = res.filter(item => !['dd'].includes(item.answer.toLowerCase()))
      setQaList(list);

      setTimeout(() => {
        const qaHtml = list
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

  const replaceJdNum2Link = () => {
    const contentDiv = document.querySelector('.rich-content');
    if (contentDiv) {
      // 获取所有的p标签
      var paragraphs = contentDiv.querySelectorAll('p');
      paragraphs.forEach(function (p) {
        // 使用正则表达式匹配6位或更多的纯数字货号
        var regex = /\b10\d{10,}(?!\.html)\b/g;
        // 替换货号为a标签
        p.innerHTML = p.innerHTML.replace(regex, function (match) {
          return `${match}<a href="https://item.jd.com/${match}.html" target="_blank"> ✨京东链接</a>`
        });

        // 遍历字典中的每个键值对
        Object.keys(sbCodeMap).forEach(function (key) {
          // 检查p标签的内容中是否包含字典的键
          if (!p.textContent?.includes('http') && !p.textContent?.includes('.com') && p.textContent?.includes(key)) {
            // 使用字典的值替换掉匹配的文本
            p.textContent = p.textContent.replace(new RegExp(key, 'g'), `${key}(${sbCodeMap[key]})`);
          }
        });
      });
    }
  }

  const onBtn = () => {
    const richTextElement = document.querySelector('.topic-richtext');
    if (richTextElement) {
      const richTextContent = extractRichTextContent(richTextElement);

      const title = document.querySelector('.article h1')?.textContent?.trim();
      console.log('提取的富文本内容：', richTextContent);
      const text = `${location.host}${location.pathname}\n\n${title?.replace('作业｜【作业】', '')}${richTextContent}`
      setContent(text)
    }
  }

  useEffect(() => {
    console.log('✨ douban-group 脚本 ✨');
    fixPhone();
    removeAd();
    setQa();

    const removedComments = removeComment();
    setCount(removedComments);
    resetOutsideDoubanLink()
    replaceJdNum2Link()
  }, []);

  return (
    <>
      <div className="drawer drawer-end" style={{ 'zIndex': 1 }}>
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="fixed right-2 bottom-5">
          <label htmlFor="my-drawer" className="btn btn-primary drawer-button" onClick={onBtn}>✨ 已移除无效评论{count}条</label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-4/5 p-4">
            <div class="card py-2 mb-4 shadow-md rounded-box whitespace-pre-wrap">{content}</div>
            {
              menuList.map(item => <button key={item.title} className="btn btn-primary w-full mb-2" onClick={item?.onClick}>{item.title}</button>)
            }
          </ul>
        </div>
      </div >
    </>
  );
};