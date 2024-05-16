import WebSocket, {Server} from 'ws';
import express from 'express';
import {createServer} from "node:http";
import {onMove, onStartRequest} from "./message_processing";
import {authorizeCognitoJwtToken} from "./auth";

const app = express()
const server = createServer(app);

const wss = new Server({server: server});

const processMessage = (ws: WebSocket, ms: WebSocket.RawData) => {
  const parsedMessage = JSON.parse(ms.toString());
  console.log(`Processing message: ${parsedMessage}`);

  switch (parsedMessage.type) {
    case 'START_REQUEST':
      onStartRequest(ws, parsedMessage);
      break;
    case 'MOVE':
      onMove(ws, parsedMessage);
      break;
    default:
      console.log(`Unknown message type: ${parsedMessage.type}`);
  }
}

wss.on('connection', function connection(ws, request) {
  console.log('A new connection is established!');
  const token = request.headers.authorization ?? "";
  authorizeCognitoJwtToken(token).then((payload) => {
    console.log(`User ${payload.username} is authorized! Payload: ${JSON.stringify(payload)}`);
    ws.on('message', (ms) => processMessage(ws, ms));
  }).catch((err) => {
    console.log(`Unauthorized: ${err}`);
    ws.close(1008, 'Unauthorized');
  })
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port :${port}`))