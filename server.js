const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./Json-server/db.json');
const middlewares = jsonServer.defaults({
  static: './dist/hw-angular'
});
const PORT = process.env.PORT || 3000;
server.use(middlewares);
server.use(jsonServer.rewriter({
  '/api/*': '/$1',
}))
server.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/hw-angular/'}),
);
server.use(router);
server.listen(PORT, () => {
  console.log('Server is running');
});

