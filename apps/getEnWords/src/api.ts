// const API_BASE_URL = "https://monkey.5675675.xyz/api";
const API_BASE_URL = "http://localhost:8787/api";


export interface Word {
  word: string;
  origin?: string;
}

export async function uploadWord(word: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/word/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ word, origin: location.origin }]),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("上传单词失败:", error);
    throw error;
  }
}

export async function matchWords(words: string[]) {
  try {
    const response = await fetch('/api/word/match', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ words }),
    });
    
    if (!response.ok) {
      throw new Error(`匹配单词失败: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('匹配单词失败:', error);
    throw error;
  }
}