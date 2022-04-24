const WebSocketServer = require("../src/WebSocketServer");
const http = require("http");
const express = require("express");
const WebSocket = require("ws");

// odottaa websocket-yhteyden tilan muutosta
function webSocketState(socket, state) {
  return new Promise(resolve => {
    setTimeout(() => {
      if (socket.readyState === state) resolve();
      else webSocketState(socket, state).then(resolve);
    }, 100);
  });
}

describe("server tests", () => {
  let server, wsServer;
  const PORT = process.env.PORT || 3002;

  // käynnistetään websocket-palvelin ennen jokaista testiä
  beforeEach(() => {
    server = http.createServer(express());
    server.listen(PORT);

    wsServer = new WebSocketServer(server);
  });


  // suljetaan websocket-palvelin testien jälkeen
  afterEach(() => {
    server.close(PORT);
  });

  test("it handles invalid JSON", () => {
    expect(wsServer.checkMessageValidity(null)).toBeFalsy();
    expect(wsServer.checkMessageValidity(JSON.stringify({}))).toBeFalsy();
    expect(wsServer.checkMessageValidity(JSON.stringify({type: null}))).toBeFalsy();
    expect(wsServer.checkMessageValidity(JSON.stringify({type: "scores"}))).toBeTruthy();
  });

  test("it responds with pong to a ping", async () => {
    let client = new WebSocket(`ws://localhost:${PORT}`);
    await webSocketState(client, client.OPEN);

    let socketResponse;
    client.on("message", message => {
      socketResponse = JSON.parse(message);
      
      client.close();
    });

    client.send(JSON.stringify({ type: "ping" }));
    
    
    await webSocketState(client, client.CLOSED);
    expect(socketResponse).toStrictEqual({messageType: "pong"});
  });

});