const WebSocket = require("ws");
const mongoose = require("mongoose");
const Score = require("./Score");

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

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
    
    let messageType = "type" in msg && msg["type"] != null ? msg["type"] : null;
    if(messageType == null) {
      console.log("Invalid JSON received.");
      client.close();
      return false;
    }

    const mongo = process.env.MONGODB_URI;
    mongoose.connect(mongo);
    if(messageType == "addScore") {
      const score = new Score({
        name: msg["username"],
        score: msg["score"]
      });

      score.save();

      return true;
    }

    if(messageType == "showScores") {
      Score
        .find({})
        .sort({ score: "descending" })
        .then(scores => scores.map((score, i) => {
          return {
            name: score.name,
            score: score.score,
            index: i + 1
          }})
        )
        .then(scores => {
          client.send(JSON.stringify({messageType: "scores", scores}));
        });

      return true;
    }



  }
}