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
    // tarkistetaan onko viestin JSON validia
    let msg = this.checkMessageValidity(message);
    if(!msg) return false;

    let messageType = "type" in msg && msg["type"] != null ? msg["type"] : null;
    if(messageType == null) {
      console.log("Invalid JSON received.");
      return false;
    }

    if(messageType !== "ping") {
      const mongo = process.env.MONGODB_URI;
      mongoose.connect(mongo);
    }

    if(messageType == "addScore") {
      if(this.addScore(msg)) {
        console.log("Added score successfully.");
      } else {
        console.log("Adding score failed.");
      }
    }

    if(messageType == "showScores") {
      this.loadScoreboard(client);
    }

    if(messageType == "ping") {
      client.send(JSON.stringify({messageType: "pong"}));
    }

  }

  checkMessageValidity(message) {
    let msg;
    try {
      msg = JSON.parse(message);
    } catch(e) {
      console.log("Invalid JSON received.");
      return false;
    }

    if(msg === null) return false;
    if(!("type" in msg)) return false;
    if(msg["type"] == null) return false;

    return msg;
  }

  addScore(message) {
    const score = new Score({
      name: message["username"],
      score: message["score"]
    });

    score.save();

    return true;
  }

  loadScoreboard(client) {
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