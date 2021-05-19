const http = require('http');
const { connectDB } = require('./db');
const api = require('./api');
const jobs = require('./utils/jobs');
const Socket = require('./Socket');
const Sockets = require('./Sockets');

require('dotenv').config();
const PORT = process.env.PORT || 5005;

connectDB();

// Create server for Express API and WebSockets
const server = http.createServer();
server.on('request', api);

// Register weatherSocket
const weatherSocket = new Socket(server);
Sockets.registerSocket('weather', weatherSocket);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`.yellow.bold);
})