import { useToast } from "@an-monkey-tool/ui/ToastProvider";
import { useEffect } from "preact/hooks";
import { extractWordsFromElement, filterWords } from "./utils";

export function App() {
  const { showToast } = useToast();

  const onBtn = () => {
    showToast("🎉 toas 组件");
  };

  const getWords = async () => {
    // TODO: 支持通过交互的形式手动选择dom 元素
    const words = extractWordsFromElement("article");
    const afterFilteredWords = await filterWords(words);
    console.log(afterFilteredWords);
  };

  useEffect(() => {
    console.log("✨ douban-group 脚本 ✨");
  }, []);

  return (
    <div className="drawer drawer-end" style={{ zIndex: 1 }}>
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="fixed right-2 bottom-5">
        <label
          htmlFor="my-drawer"
          className="btn btn-primary drawer-button"
          onClick={onBtn}
        >
          ✨ 按钮
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <ul className="menu bg-base-200 text-base-content min-h-full w-4/5 p-4">
          <li>
            <button className="btn btn-primary" onClick={getWords}>
              获取单词
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
