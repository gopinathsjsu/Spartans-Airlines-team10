const http = require('http');
const app = require('./app');

const port = process.env.PORT || process.PORT;

const server = http.createServer(app);
console.log("The server is running on port 3000");
server.listen(port);