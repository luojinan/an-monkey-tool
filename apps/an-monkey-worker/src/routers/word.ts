import type { Context, Hono } from 'hono'
import { usePrismaClient } from '../../prisma/utils/prismaClient'

export default (app: Hono, workspace: string) => {
  app.get(`${workspace}/`, async (c: Context) => {
    const { prismaClient } = await usePrismaClient(c)
    const words = await prismaClient.word.findMany()
    console.log('word', words)
    return c.json(words)
  })

  app.post(`${workspace}/`, async (c: Context) => {
    try {
      const { prismaClient } = await usePrismaClient(c)
      const body = await c.req.json()
      const data = Array.isArray(body) ? body : [body]

      const words = await prismaClient.word.createMany({
        data,
      })
      return c.json(words)
    } catch (error) {
      console.error('创建单词失败:', error)
      return c.json({ error: '创建单词失败' }, 500)
    }
  })
}
