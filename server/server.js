const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static("public"));

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    console.log("Received video data");
    console.log(data);
  });
});

server.listen(4242, () => {
  console.log("Server is running on port 4242");
});
