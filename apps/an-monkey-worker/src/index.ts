import { Hono } from 'hono'
import word from './routers/word'

// type Bindings = {
//   MY_KV: KVNamespace
//   DB: D1Database
// }
const app = new Hono().basePath('/api')

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