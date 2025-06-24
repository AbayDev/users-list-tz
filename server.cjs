const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

// 👉 Настраиваем заголовки CORS для видимости X-Total-Count
server.use((req, res, next) => {
  res.header('Access-Control-Expose-Headers', 'X-Total-Count')
  next()
})

// Используем пагинацию json-server
server.use(router)

server.listen(3000, () => {
  console.log('JSON Server is running on port 3000')
})
