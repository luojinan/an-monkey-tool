import type { Context, Hono } from "hono";
import { usePrismaClient } from "../../prisma/utils/prismaClient";

export default (app: Hono, workspace: string) => {
  app.get(`${workspace}/`, async (c: Context) => {
    try {
      const { prismaClient } = await usePrismaClient(c);
      const owner = c.req.query('owner');

      if (!owner) {
        return c.json({ error: "Owner parameter is required" }, 400);
      }

      const incomes = await prismaClient.income.findMany({
        where: {
          owner: owner
        },
        orderBy: {
          time: 'desc'
        }
      });

      return c.json(incomes);
    } catch (error) {
      console.error("查询收入数据失败:", error);
      return c.json({ error: "查询收入数据失败" }, 500);
    }
  });
}; 