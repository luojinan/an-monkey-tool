import type { Context, Hono } from "hono";
import { usePrismaClient } from "../../prisma/utils/prismaClient";

export default (app: Hono, workspace: string) => {
  app.get(`${workspace}/`, async (c: Context) => {
    try {
      const { prismaClient } = await usePrismaClient(c);
      const personnel = c.req.query('personnel');

      if (!personnel) {
        return c.json({ error: "Personnel parameter is required" }, 400);
      }

      const partTimes = await prismaClient.partTime.findMany({
        where: {
          personnel: personnel
        },
        orderBy: {
          // 使用timestamp代替date排序，避免date字段格式问题导致的排序错误
          timestamp: 'desc'
        }
      });

      return c.json(partTimes);
    } catch (error) {
      console.error("查询工时数据失败:", error);
      return c.json({ error: "查询工时数据失败" }, 500);
    }
  });
}; 