const jsonServer = require('json-server')
const {PORT} = require("./src/app/env");
const server = jsonServer.create()
const router = jsonServer.router('./Json-server/db.json')

const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)

const port = PORT || 3000

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`)
})
