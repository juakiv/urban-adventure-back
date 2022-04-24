const WebSocketServer = require("../src/WebSocketServer");
const http = require("http");
const express = require("express");

describe("server tests", () => {
  let server, wsServer;
  beforeAll(() => {
    server = http.createServer(express());
    wsServer = new WebSocketServer(server);
  });

  test("it handles invalid JSON", () => {
    expect(wsServer.checkMessageValidity(null)).toBeFalsy();
    expect(wsServer.checkMessageValidity(JSON.stringify({}))).toBeFalsy();
    expect(wsServer.checkMessageValidity(JSON.stringify({type: null}))).toBeFalsy();
    expect(wsServer.checkMessageValidity(JSON.stringify({type: "scores"}))).toBeTruthy();
  });
});