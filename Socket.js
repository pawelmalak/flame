const WebSocket = require('ws');
const Logger = require('./utils/Logger');
const logger = new Logger();

class Socket {
  constructor(server) {
    this.webSocketServer = new WebSocket.Server({ server })

    this.webSocketServer.on('listening', () => {
      logger.log('Socket: listen');
    })

    this.webSocketServer.on('connection', (webSocketClient) => {
      // console.log('Socket: new connection');
    })
  }

  send(msg) {
    this.webSocketServer.clients.forEach(client => client.send(msg));
  }
}

module.exports = Socket;