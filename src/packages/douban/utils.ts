import { removeDomByList } from "../../common/utils";

/**
 * 修改样式以让PC样式适应移动端
 */
export const fixPhone = () => {
  const body = document.querySelector("body");
  if (body) {
    body.style.boxSizing = "border-box";
    body.style.width = "100vw";
    body.style.maxWidth = "800px";
    body.style.padding = "10px 10px 0 10px";
  }

  const topicContent = document.querySelector(
    ".topic-content"
  ) as HTMLElement | null;
  if (topicContent) {
    topicContent.style.display = "flex";
    topicContent.style.flexDirection = "column";
  }

  const wrapper = document.getElementById("wrapper");
  if (wrapper) {
    wrapper.style.width = "100%";
  }

  const doc = document.querySelector(".topic-doc") as HTMLElement | null;
  if (doc) {
    doc.style.width = "100%";
    doc.style.padding = "10px";
    doc.style.boxSizing = "border-box";
  }

  // 获取 className 为 topic-doc 的元素
  const topicDoc = document.querySelector(".topic-doc");

  // 获取 topic-doc 内的 h3 元素
  const h3Element = topicDoc?.querySelector("h3");

  // 获取 className 为 user-face 的 div 元素
  const userFaceDiv = document.querySelector(".user-face");

  // 检查 h3 元素是否存在
  if (h3Element) {
    // 将 h3 元素从当前父元素中移除
    topicDoc?.removeChild(h3Element);

    // 将 h3 元素添加到 user-face 的 div 元素内部
    userFaceDiv?.appendChild(h3Element);
  } else {
    console.log("没有找到 h3 元素");
  }
};

/**
 * 移除广告/无用元素
 */
export const removeAd = () => {
  const contentDiv = document.getElementById("content");
  const articleDiv = document.querySelector(".article");

  if (articleDiv && contentDiv) {
    contentDiv.appendChild(articleDiv);
  }

  const strList = [
    ".grid-16-8",
    ".sns-bar",
    "#db-nav-group",
    "#db-global-nav",
    ".comment-form",
    "#footer",
    "#landing-bar",
    ".txd",
    ".topic-opt",
    "#link-report_group",
  ];
  removeDomByList(strList);
};

/**
 * 重置外部链接实现直达，移除douban防盗链中转页
 *
 */
export function resetOutsideDoubanLink() {
  const links = document.querySelectorAll("a");
  links.forEach(function (link) {
    if (link.href.startsWith("https://www.douban.com/link2/?url=")) {
      const url = new URL(link.href);
      const urlParams = new URLSearchParams(url.search);
      const encodedUrl = urlParams.get("url"); // 取出url参数
      if (encodedUrl) {
        const decodedUrl = decodeURIComponent(encodedUrl);
        link.href = decodedUrl;
        console.log("Updated link:", link.href);
      }
    }
  });
}
