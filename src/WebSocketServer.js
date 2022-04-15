const WebSocket = require("ws");

module.exports = class WebSocketServer {
  #socket;

  constructor(server) {
    this.#socket = new WebSocket.Server({ server: server });
    this.#socket.on("connection", client => {

      client.on("message", message => {
        this.handleMessage(client, message);
      });

    });
  }

  handleMessage(client, message) {
    let msg;
    try {
      msg = JSON.parse(message);
    } catch(e) {
      console.log("Invalid JSON received.");
      client.close();

      return false;
    }

    console.log(msg);

  }
}