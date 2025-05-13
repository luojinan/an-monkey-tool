import { Hono } from 'hono'
import { cors } from "hono/cors";
import income from './routers/income'
import partTime from './routers/part-time'
import word from './routers/word'

// type Bindings = {
//   MY_KV: KVNamespace
//   DB: D1Database
// }
const app = new Hono().basePath('/api')

// 全局启用CORS中间件（或按路径选择性应用）
app.use(
  "*",
  cors({
    origin: "*"
  })
);

app.get('/', (c) => c.text('GET /'))
app.post('/', (c) => c.text('POST /'))
app.put('/', (c) => c.text('PUT /'))
app.delete('/', (c) => c.text('DELETE /'))

// routes
word(app, '/word')
income(app, '/income')
partTime(app, '/part-time')

app.notFound((c) => {
  return c.text('Custom 404 Message', 404)
})

app.onError((err, c) => {
  console.error(`${err}`)
  return c.text('Custom Error Message', 500)
})

export default app