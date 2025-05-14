import type { Context, Hono } from "hono";
import { usePrismaClient } from "../../prisma/utils/prismaClient";

export default (app: Hono, workspace: string) => {
  app.get(`${workspace}`, async (c: Context) => {
    try {
      const { prismaClient } = await usePrismaClient(c);
      const personnel = c.req.query('personnel') ?? "default";

      const partTimes = await prismaClient.partTime.findMany({
        where: {
          personnel: personnel
        },
        orderBy: {
          // 使用timestamp代替date排序，避免date字段格式问题导致的排序错误
          timestamp: 'desc'
        }
      });
      // 处理BigInt类型字段以便JSON序列化
      const serializedData = partTimes.map(item => ({
        ...item,
        timestamp: Number(item.timestamp) // 将BigInt转换为Number
      }));

      return c.json(serializedData);
    } catch (error) {
      console.error("查询工时数据失败, 详细错误:", error);
      return c.json({ error: "查询工时数据失败", message: error }, 500);
    }
  });
}; 