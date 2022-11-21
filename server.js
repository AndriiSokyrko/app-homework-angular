const jsonServer = require("json-server");
// const {PORT} = require("./src/app/env.ts");
const server = jsonServer.create();
const router = jsonServer.router("./Json-server/db.json");
const middlewares = jsonServer.defaults({ static: "./dist" });
const port = 5000 || 8000 || 8080 || 3000;

server.use(middlewares);
server.use(jsonServer.rewriter({
  '/api/*': '/$1',
}))
server.use(router);
server.listen(port,'0.0.0.0', () => {
  console.log('Server is running');
});
