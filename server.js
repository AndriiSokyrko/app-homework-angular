const jsonServer = require("json-server");
// const {PORT} = require("./src/app/env.ts");
const server = jsonServer.create();
const router = jsonServer.router("./Json-server/db.json");
const middlewares = jsonServer.defaults({ static: "./dist/hw-angular" });
const port = 8080;

server.use(middlewares);
server.use(jsonServer.rewriter({
  '/api/*': '/$1',
}))
server.use(router);
server.listen(port, () => {
  console.log('Server is running');
});
