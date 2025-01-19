import { useToast } from "@an-monkey-tool/ui/ToastProvider";
import { useEffect, useState } from "preact/hooks";
import { extractWordsFromElement, filterWords } from "./utils";

type HighlightedElement = {
  element: HTMLElement;
  overlay: HTMLDivElement;
};

function createHighlightOverlay(element: HTMLElement): HTMLDivElement {
  const overlay = document.createElement("div");
  overlay.style.position = "absolute";
  overlay.style.border = "2px solid blue";
  overlay.style.pointerEvents = "none";
  overlay.style.zIndex = "9999";

  const rect = element.getBoundingClientRect();
  overlay.style.left = `${rect.left}px`;
  overlay.style.top = `${rect.top}px`;
  overlay.style.width = `${rect.width}px`;
  overlay.style.height = `${rect.height}px`;

  return overlay;
}

function highlightElement(element: HTMLElement): HighlightedElement {
  const overlay = createHighlightOverlay(element);
  document.body.appendChild(overlay);
  return { element, overlay };
}

function removeHighlight(highlighted: HighlightedElement): void {
  document.body.removeChild(highlighted.overlay);
}

const throttle = <T extends (e: MouseEvent) => void>(fn: T, delay: number) => {
  let lastCall = 0;
  return (e: MouseEvent) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) return;
    lastCall = now;
    return fn(e);
  };
};

export function App() {
  const { showToast } = useToast();
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [isopen, setIsopen] = useState(false);
  const [selectedPath, setSelectedPath] = useState<string | null>("article");

  useEffect(() => {
    let highlightedElement: HighlightedElement | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      console.log("鼠标悬浮", e);
      if (isSelectMode) {
        const element = document.elementFromPoint(
          e.clientX,
          e.clientY,
        ) as HTMLElement | null;

        if (highlightedElement) {
          removeHighlight(highlightedElement);
          highlightedElement = null;
        }

        if (element) {
          highlightedElement = highlightElement(element);
          console.log("鼠标悬浮dom", element);
        }
      }
    };

    if (isSelectMode) {
      const throttledHandler = throttle(handleMouseMove, 1000);
      document.addEventListener("mousemove", throttledHandler);
      document.addEventListener("click", handleClick);
    } else {
      // FIXME: 无法清除
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClick);
      if (highlightedElement) {
        removeHighlight(highlightedElement);
      }
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClick);
      if (highlightedElement) {
        removeHighlight(highlightedElement);
      }
    };
  }, [isSelectMode]);

  const getElementPath = (element: HTMLElement): string => {
    const path = [];
    let current: HTMLElement | null = element;

    while (current && current !== document.body) {
      const index = Array.from(current.parentNode?.children || []).indexOf(
        current,
      );
      path.unshift(`${current.tagName.toLowerCase()}:nth-child(${index + 1})`);
      current = current.parentElement;
    }

    return path.join(" > ");
  };

  const handleClick = (e: MouseEvent) => {
    if (isSelectMode) {
      const element = e.target as HTMLElement;
      const path = getElementPath(element);
      setSelectedPath(path);
      setIsSelectMode(false);
      showToast(`Selected: ${path}`);
    }
  };

  const getWords = async () => {
    if (!selectedPath) {
      showToast("请先选择一个元素");
      return;
    }
    const words = extractWordsFromElement(selectedPath);
    const afterFilteredWords = await filterWords(words);
    console.log(afterFilteredWords);
  };

  useEffect(() => {
    console.log("✨ douban-group 脚本 ✨");
  }, []);

  return (
    <div className="drawer drawer-end" style={{ zIndex: 999 }}>
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isopen}
        onChange={(e: Event) => {
          const target = e.target as HTMLInputElement;
          setIsopen(target.checked);
        }}
      />
      <div className="fixed right-2 bottom-5">
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
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
          <li>
            <label className={isSelectMode ? "swap swap-active" : "swap"}>
              <input
                type="checkbox"
                checked={isSelectMode}
                onChange={(e: Event) => {
                  const target = e.target as HTMLInputElement;
                  setIsSelectMode(target.checked);
                  if (target.checked) {
                    setIsopen(false);
                  }
                }}
              />
              <div className="swap-on">ON</div>
              <div className="swap-off">OFF</div>
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
}
