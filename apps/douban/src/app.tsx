import { useToast } from "@an-monkey-tool/ui/ToastProvider";
import { getUrlParams, removeDomByList } from "@an-monkey-tool/utils";
import { useEffect, useState } from "preact/hooks";
import { afterFilterTextNoNeed, filterCommentText, sbCodeMap } from "./const";
import { fixPhone, removeAd, resetOutsideDoubanLink } from "./utils";

type MenuItem = {
  title: string;
  onClick?: () => void;
};

const replaceSbWord = (dom) => {
  // 遍历字典中的每个键值对
  for (const key of Object.keys(sbCodeMap)) {
    // 检查p标签的内容中是否包含字典的键
    if (
      !dom.textContent?.includes("http") &&
      !dom.textContent?.includes(".com") &&
      dom.textContent?.includes(key)
    ) {
      // 使用字典的值替换掉匹配的文本
      dom.textContent = dom.textContent.replace(
        new RegExp(key, "g"),
        `${key}(${sbCodeMap[key]})`,
      );
    }
  }
};

function extractRichTextContent(element: Element): string {
  let content = "";

  for (const key in element.childNodes) {
    if (Object.prototype.hasOwnProperty.call(element.childNodes, key)) {
      const node = element.childNodes[key];
      if (node.nodeType === Node.TEXT_NODE) {
        // 如果是文本节点，直接添加其内容
        content += node.textContent.replace(/\s+/g, " ").trim() + "\n";
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const tagName = node.tagName.toLowerCase();

        if (tagName === "p") {
          // 如果是 <br> 元素，添加换行
          content += "\n";
          content += extractRichTextContent(node as Element);
        } else if (tagName === "img") {
          // 如果是 <img> 元素，添加图片 URL
          content += "";
          // const src = node.getAttribute('src');
          // if (src) {
          // content += `[图片](${src})\n`;
          // }
        } else if (tagName === "a") {
          // 如果是 <a> 元素，处理链接
          const href: string = node.getAttribute("href");
          const innerText = node.textContent.trim();
          if (
            href &&
            innerText &&
            !href.startsWith("https://www.douban.com/link2") &&
            innerText !== href
          ) {
            content += `[${innerText}](${href})`;
          } else {
            content += innerText;
          }
        } else {
          // 对其他元素进行递归处理
          content += extractRichTextContent(node as Element);
        }
      }
    }
  }

  return content.replace(/\n+$/, "");
}

// 使用正则表达式匹配6位或更多的纯数字货号
const jdCodeRegex = /\b10\d{10,}(?!\.html)\b/g;

export function App() {
  const [count, setCount] = useState<number>(0);
  const [qaList, setQaList] = useState<{ question: string; answer: string }[]>(
    [],
  );
  const [content, setContent] = useState("");

  const { showToast } = useToast();

  const menuList: MenuItem[] = [
    {
      title: "🔴 复制作业标题(链接)",
      onClick: () => {
        const title = document
          .querySelector(".article h1")
          ?.textContent?.trim();
        navigator.clipboard.writeText(
          `${title?.replace("作业｜【作业】", "")}（${location.host}${location.pathname}）`,
        );

        showToast("🎉 复制成功，去粘贴吧～");
      },
    },
    {
      title: "🔵 复制作业内容",
      onClick: () => {
        navigator.clipboard.writeText(content);

        showToast("🎉 复制成功，去粘贴吧～");
      },
    },
    {
      title: "🟢 打开豆瓣APP",
      onClick: () => {
        const { host, pathname } = location;
        const newUrl = `douban://${host.replace("www.", "")}${pathname}`;
        window.open(newUrl);
      },
    },
  ];

  const removeComment = () => {
    let localCount = 0;

    for (const item of document.querySelectorAll(".reply-content")) {
      const dom = item as HTMLElement;
      let content = dom.innerText.replace(filterCommentText, "");
      // TODO: 优化使用正则匹配

      // 定义用于移除首字符为标点符号的正则表达式
      const removeLeadingPunctuation = /^[.,!?;:“”‘’"…—，]+/;
      // 定义用于移除尾字符为标点符号的正则表达式
      const removeTrailingPunctuation = /[.,!?;:“”‘’"…—，]+$/;
      // 移除首字符为标点符号的部分
      content = content.replace(removeLeadingPunctuation, "");
      // 移除尾字符为标点符号的部分
      content = content.replace(removeTrailingPunctuation, "");

      // 移除后，剩下的文字仍然无效则也属于无效评论
      if (!content || afterFilterTextNoNeed.includes(content)) {
        localCount++;
        dom.parentElement?.parentElement?.remove();
      } else {
        dom.innerText = content;
      }
    }
    return localCount;
  };

  const insertElementBeforeFirstRendered = (
    selectorStr: string,
    newElement: HTMLElement,
  ) => {
    const firstRenderedElement = document.querySelector(selectorStr);
    if (firstRenderedElement && firstRenderedElement.parentElement) {
      firstRenderedElement.parentElement.insertBefore(
        newElement,
        firstRenderedElement,
      );
    }
  };
  const str2atag = (str: string) => {
    const regex = /\b\d{6,}\b/g;

    for (const key of Object.keys(sbCodeMap)) {
      // 检查p标签的内容中是否包含字典的键
      if (!str.includes("http") && str.includes(key)) {
        // 使用字典的值替换掉匹配的文本
        str = str.replace(new RegExp(key, "g"), `${key}(${sbCodeMap[key]})`);
      }
      // TODO: 答案中的返利链接提醒-插入a标签，提供清理和提取货号
    }
    return str.replace(
      regex,
      (match) =>
        `${match}<a href="https://item.jd.com/${match}.html" target="_blank"> ✨京东链接</a>`,
    );
  };

  const setQa = () => {
    const qaData = getUrlParams("qa") as string | null;
    if (qaData) {
      const res = JSON.parse(qaData) as { question: string; answer: string }[];
      const list = res.filter(
        (item) => !["dd", "d", "1"].includes(item.answer.toLowerCase()),
      );
      setQaList(list);

      const qaHtml = list
        .map(
          (item) => `
            <div style="padding: 10px;margin-bottom: 10px;border: 1px solid #ccc;border-radius: 5px;">
              <div style="user-select: text;margin-bottom:10px;color: #333">🔮: ${item.question}</div>
              <div style="user-select: text; font-size: 16px;">🎉 : ${str2atag(item.answer)}</div>
            </div>
          `,
        )
        .join("");

      const newElement = document.createElement("div");
      newElement.innerHTML = qaHtml;
      insertElementBeforeFirstRendered(
        '[data-entity-type="question"]',
        newElement,
      );

      const strList = ['[data-entity-type="question"]'];
      removeDomByList(strList);
    }
  };

  const replaceJdNum2Link = () => {
    const contentDiv = document.querySelector(".rich-content");
    if (contentDiv) {
      // 获取所有的p标签
      const paragraphs = contentDiv.querySelectorAll("p");

      for (const p of paragraphs) {
        // 替换货号为a标签
        p.innerHTML = p.innerHTML.replace(
          jdCodeRegex,
          (match) =>
            `${match}<a href="https://item.jd.com/${match}.html" target="_blank"> ✨京东链接</a>`,
        );

        // 遍历字典中的每个键值对
        replaceSbWord(p);
      }
    }
  };

  const onBtn = () => {
    const richTextElement = document.querySelector(".topic-richtext");
    if (richTextElement) {
      const richTextContent = extractRichTextContent(richTextElement);

      const title = document.querySelector(".article h1")?.textContent?.trim();
      console.log("提取的富文本内容：", richTextContent);
      const text = `${location.host}${location.pathname}\n\n${title?.replace("作业｜【作业】", "")}${richTextContent}`;
      setContent(text);
    }
  };

  useEffect(() => {
    console.log("✨ douban-group 脚本 ✨");
    fixPhone();
    removeAd();
    setQa();

    const removedComments = removeComment();
    setCount(removedComments);
    resetOutsideDoubanLink();
    replaceSbWord(document.querySelector("h1"));
    replaceJdNum2Link(); // 正文内容使用替换 sbword
  }, []);

  return (
    <>
      <div className="drawer drawer-end" style={{ zIndex: 1 }}>
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="fixed right-2 bottom-5">
          <label
            htmlFor="my-drawer"
            className="btn btn-primary drawer-button"
            onClick={onBtn}
          >
            ✨ 已移除无效评论{count}条
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          />
          <ul className="menu bg-base-200 text-base-content min-h-full w-4/5 p-4">
            <div class="card py-2 mb-4 shadow-md rounded-box whitespace-pre-wrap">
              {content}
            </div>
            {menuList.map((item) => (
              <button
                key={item.title}
                className="btn btn-primary w-full mb-2"
                onClick={item?.onClick}
              >
                {item.title}
              </button>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
