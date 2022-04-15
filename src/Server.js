const WebSocket = require("ws");

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

class Server {
  #socket;
  constructor() {
    // luodaan websocket server instanssi
    this.#socket = new WebSocket.Server({ port: process.env.WS_PORT });

    // kuunnellaan websocket-yhteyksiä
    this.#socket.on("connection", client => {

      // kuunnellaan yhteydeltä saapuvia viestejä
      client.on("message", message => {
        this.handleMessage(message);
      });

    });
    
  }

  handleMessage(message) {
    console.log(message);
  }
}

module.exports = Server;