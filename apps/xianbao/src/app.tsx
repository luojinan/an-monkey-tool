// import { useToast } from "@an-monkey-tool/ui/ToastProvider";
import { removeDomByList } from "@an-monkey-tool/utils";
import { useEffect, useState } from "preact/hooks";
import Blacklist from "./components/BlackList";

interface QaItem {
  question?: string | null;
  answer?: string | null;
}
export function App() {
  const [count, setCount] = useState<number>(0);
  // const { showToast } = useToast();

  const todoubanWithAnswer = (): QaItem[] => {
    const questionList: QaItem[] = [];
    document.querySelectorAll(".g-biaoti").forEach((item) => {
      questionList.push({ question: item.textContent });
    });
    document.querySelectorAll(".g-neirong").forEach((nrDom, index) => {
      const text = nrDom.textContent
        .split("\n")
        .filter((item) => !!item.trim() && !item.includes("智能AI助手"))
        .join("");
      questionList[index].answer = text;
    });
    return questionList;
  };

  const clearWeb = () => {
    const strList = [
      ".nav2-ul",
      ".article-list.top",
      ".pop-hongbao-on",
      ".tishi",
      ".xiangguan",
      "aside",
      "#commentbox",
      ".footer",
    ];
    removeDomByList(strList);
    setTimeout(() => {
      removeDomByList(strList);
    }, 1000);
    document.querySelector(".copyright")?.parentElement?.remove();

    document.querySelector(".art-copyright a")?.setAttribute("target", "_self");
  };

  const refreshList = (filterList) => {
    const zoyeList = document.querySelectorAll(".article-list .title a");
    let num = count;
    if (zoyeList.length) {
      zoyeList.forEach((item) => {
        item.setAttribute("target", "_self");
        const isNoNeed = filterList.some(({ name }) =>
          item.textContent.includes(name),
        );
        if (isNoNeed) {
          num += 1;
          // console.log('过滤', item.textContent)
          item.closest(".article-list")?.remove();
        }
      });
    }
    setCount(num); // 没有set成功？ 不能在子组件中调用父组件的state修改吗？
  };

  useEffect(() => {
    console.log("✨ xb douban 脚本 ✨");
    clearWeb();

    const qaList = todoubanWithAnswer();
    const originA = document.querySelector(".art-copyright a");
    const originHref = originA?.getAttribute("href");
    console.log("设置新链接", originHref);
    if (originA && originHref) {
      originA.setAttribute(
        "href",
        `${originHref}?qa=${encodeURIComponent(JSON.stringify(qaList))}`,
      );
      window.location.replace(
        `${originHref}?qa=${encodeURIComponent(JSON.stringify(qaList))}`,
      );
    }
  }, []);

  return (
    <div className="drawer drawer-end z-[99]">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="fixed right-2 bottom-5">
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
          ✨ 已移除不感兴趣作业{count}条
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-4/5 p-4">
          <Blacklist onRefreshList={refreshList} />
        </ul>
      </div>
    </div>
  );
}
