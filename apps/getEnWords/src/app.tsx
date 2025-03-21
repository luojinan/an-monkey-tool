import { useToast } from "@an-monkey-tool/ui/ToastProvider";
import { useEffect, useState } from "preact/hooks";
import { matchWords, uploadWord } from "./api";
import { extractWordsFromElement, filterWords } from "./utils";

export function App() {
  const { showToast } = useToast();
  const [isopen, setIsopen] = useState(false);
  const [words, setWords] = useState<[string, number][]>([]);
  const [totalWords, setTotalWords] = useState(0);
  const [filteredWords, setFilteredWords] = useState(0);
  const [knownWordsCount, setKnownWordsCount] = useState(0);

  const getWords = async () => {
    try {
      // 从页面提取单词
      const extractedWords = extractWordsFromElement("");
      setTotalWords(extractedWords.length);

      // 第一次过滤（本地过滤）
      const afterLocalFiltered = await filterWords(extractedWords);
      const localFilteredCount =
        extractedWords.length - afterLocalFiltered.length;

      // 第二次过滤（数据库匹配）
      const wordsForMatching = afterLocalFiltered.map(([word]) => word);
      const matchResult = await matchWords(wordsForMatching);

      // 更新统计信息
      setKnownWordsCount(matchResult.knownWordsCount);
      setFilteredWords(localFilteredCount + matchResult.knownWordsCount);

      // 只保留未知单词
      const unknownWordsSet = new Set(matchResult.unknownWords);
      const finalWordList = afterLocalFiltered.filter(([word]) =>
        unknownWordsSet.has(word.toLowerCase()),
      );

      setWords(finalWordList);
      showToast("🎉 单词获取成功");
    } catch (error) {
      console.error("获取单词失败:", error);
      showToast("❌ 获取单词失败");
    }
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
                  <div className="stat-desc">
                    本地: {filteredWords - knownWordsCount} | 数据库:{" "}
                    {knownWordsCount}
                  </div>
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
                            onClick={async () => {
                              try {
                                await uploadWord(word);
                                setWords(words.filter(([w]) => w !== word));
                                setFilteredWords(filteredWords + 1);
                                showToast(`🎉 已删除单词: ${word}`);
                              } catch (error) {
                                showToast(`❌ 删除单词失败: ${word}`);
                                console.error(error);
                              }
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
