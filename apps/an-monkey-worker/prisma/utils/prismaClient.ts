import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "@prisma/client";
import type { Context } from "hono";

export const usePrismaClient = async (c: Context) => {
  const env = c.env as Env; // 确保正确类型
  const adapter = new PrismaD1(env.DB);
  return {
    prismaClient: await new PrismaClient({ adapter })
  }
}