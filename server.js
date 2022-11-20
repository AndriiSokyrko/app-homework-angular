const jsonServer = require("json-server");
const {PORT} = require("./src/app/env");
const server = jsonServer.create();
const router = jsonServer.router("Json-server/db.json");
const middlewares = jsonServer.defaults({ static: "./dist/hw-angular" });
const port = PORT || 3000;

server.use(middlewares);
server.use(router);

server.listen(port);
