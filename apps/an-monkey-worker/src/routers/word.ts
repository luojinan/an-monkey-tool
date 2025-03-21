import type { Context, Hono } from "hono";
import { usePrismaClient } from "../../prisma/utils/prismaClient";

export default (app: Hono, workspace: string) => {
  app.get(`${workspace}/`, async (c: Context) => {
    const { prismaClient } = await usePrismaClient(c);
    const words = await prismaClient.word.findMany();
    console.log("word", words);
    return c.json(words);
  });

  app.post(`${workspace}/`, async (c: Context) => {
    try {
      const { prismaClient } = await usePrismaClient(c);
      const body = await c.req.json();
      const data = Array.isArray(body) ? body : [body];

      const words = await prismaClient.word.createMany({
        data,
      });
      return c.json(words);
    } catch (error) {
      console.error("创建单词失败:", error);
      return c.json({ error: "创建单词失败" }, 500);
    }
  });

  // 优化后的匹配文章单词接口
  app.post(`${workspace}/match`, async (c: Context) => {
    try {
      const { prismaClient } = await usePrismaClient(c);
      const body = await c.req.json();

      // 验证请求体中是否包含单词列表
      if (!body.words || !Array.isArray(body.words)) {
        return c.json({ error: "请求格式错误，需要提供单词列表" }, 400);
      }

      // 获取文章中的所有单词并转为小写
      const articleWords = body.words.map((word: string) => word.toLowerCase());

      // 文章单词去重，减少数据库查询负担
      const uniqueArticleWords = [...new Set(articleWords)];

      // 使用 IN 查询，只查询文章中出现的单词
      // 这比获取所有单词更高效
      const knownWords = await prismaClient.word.findMany({
        where: {
          word: {
            in: uniqueArticleWords.map((w) => w.toLowerCase()),
            mode: "insensitive", // 不区分大小写
          },
        },
        select: { word: true },
      });

      // 将已知单词转换为Set以便快速查找
      const knownWordsSet = new Set(
        knownWords.map((item) => item.word.toLowerCase()),
      );

      // 找出未知单词（从去重后的单词列表中查找）
      const uniqueUnknownWords = uniqueArticleWords.filter(
        (word) => !knownWordsSet.has(word),
      );

      // 计算已知单词数量（需要在原始列表中计算）
      let knownWordsCount = 0;
      for (const word of articleWords) {
        if (knownWordsSet.has(word)) {
          knownWordsCount++;
        }
      }

      return c.json({
        knownWordsCount,
        totalWordsCount: articleWords.length,
        uniqueWordsCount: uniqueArticleWords.length,
        unknownWords: uniqueUnknownWords,
      });
    } catch (error) {
      console.error("匹配单词失败:", error);
      return c.json({ error: "匹配单词失败" }, 500);
    }
  });
};
