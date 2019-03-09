const http = require('http');
const app = require('../app');
const port = process.env.PORT || 3001;
console.log("Server started at localhost:"+port);
const server = http.createServer(app);

server.listen(port);