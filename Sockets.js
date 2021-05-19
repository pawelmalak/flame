class Sockets {
  constructor() {
    this.sockets = [];
  }

  registerSocket(name, socket) {
    this.sockets.push({ name, socket });
  }

  getAllSockets() {
    return this.sockets;
  }

  getSocket(name) {
    const socket = this.sockets.find(socket => socket.name === name);
    return socket;
  }
}

module.exports = new Sockets();