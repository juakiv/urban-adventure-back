const express = require("express");
const app = express();
const http = require("http");
const WebSocket = require("ws");

const WebSocketServer = require("./src/WebSocketServer");

const PORT = process.env.PORT || 3001;

app.use(express.static("build"));

const server = http.createServer(app);
server.listen(PORT);

console.log("Starting WebSocket server...");
let wsServer = new WebSocketServer(server);