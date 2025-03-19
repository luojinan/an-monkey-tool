import { Hono } from 'hono'
import { cors } from "hono/cors";
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
    origin: "*",
    headers: ["Content-Type", "Access-Control-Allow-Origin"],
    methods: ["GET", "POST", "OPTIONS"]
  })
);

app.get('/', (c) => c.text('GET /'))
app.post('/', (c) => c.text('POST /'))
app.put('/', (c) => c.text('PUT /'))
app.delete('/', (c) => c.text('DELETE /'))

// routes
word(app, '/word')

app.notFound((c) => {
  return c.text('Custom 404 Message', 404)
})

app.onError((err, c) => {
  console.error(`${err}`)
  return c.text('Custom Error Message', 500)
})

export default app