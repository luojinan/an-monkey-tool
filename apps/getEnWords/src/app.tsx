import { useToast } from "@an-monkey-tool/ui/ToastProvider";
import { useEffect, useState } from "preact/hooks";
import { extractWordsFromElement, filterWords } from "./utils";

export function App() {
  const { showToast } = useToast();
  const [isopen, setIsopen] = useState(false);
  const [words, setWords] = useState<[string, number][]>([]);
  const [totalWords, setTotalWords] = useState(0);
  const [filteredWords, setFilteredWords] = useState(0);

  const getWords = async () => {
    const words = extractWordsFromElement("");
    setTotalWords(words.length);
    const afterFilteredWords = await filterWords(words);
    setFilteredWords(words.length - afterFilteredWords.length);
    setWords(afterFilteredWords);
    console.log(afterFilteredWords);
    showToast("🎉 单词获取成功");
  };

  const exportWords = () => {
    const formattedWords = words
      .map(([word, count]) => `${word}: ${count}次`)
      .join("\n");
    navigator.clipboard.writeText(formattedWords);
    showToast("🎉 单词列表已复制到剪贴板");
  };

  useEffect(() => {
    console.log("✨ get-en-words 脚本 ✨");
  }, []);

  return (
    <div className="drawer drawer-end" style={{ zIndex: 9999 }}>
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
          ✨ 单词
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
          {words.length > 0 && (
            <li className="mt-4">
              <div className="stats shadow w-full">
                <div className="stat">
                  <div className="stat-title">单词数</div>
                  <div className="stat-value">
                    {words.length}/{totalWords}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title">已认识</div>
                  <div className="stat-value">{filteredWords}</div>
                </div>
                <div className="stat">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={exportWords}
                  >
                    导出单词
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto w-full">
                <table
                  className="table table-zebra w-full"
                  style={{ tableLayout: "fixed" }}
                >
                  <thead>
                    <tr>
                      <th className="w-2/5 break-words">单词</th>
                      <th className="w-1/5 break-words">出现次数</th>
                      <th className="w-2/5 break-words">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {words.map(([word, count]) => (
                      <tr key={word}>
                        <td className="break-words">{word}</td>
                        <td className="break-words">{count}</td>
                        <td>
                          <button
                            className="btn btn-error btn-sm"
                            onClick={() => {
                              setWords(words.filter(([w]) => w !== word));
                              setFilteredWords(filteredWords + 1);
                              showToast(`🎉 已删除单词: ${word}`);
                            }}
                          >
                            删除
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
