const http = require("http");
const port = "3001";

const router = require("./router.js");

const server = http.createServer(router);

server.listen(port, () =>
  console.log(`listening on http://localhost:${port}....`)
);
