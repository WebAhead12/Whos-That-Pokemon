const http = require("http");
const port = "3000";


const router = require("./router.js");

const server = http.createServer(router);

server.listen(port, () => console.log(`listening on http://localhost:${port}....`));