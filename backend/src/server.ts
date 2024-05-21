import WebSocket, {Server} from 'ws';
import express from 'express';
import {createServer} from "node:http";
import {onMove, onStartRequest} from "./message_processing";
import {authorizeCognitoJwtToken} from "./auth";
import {CognitoAccessTokenPayload} from "aws-jwt-verify/jwt-model";

const app = express()
const server = createServer(app);

const wss = new Server({server: server});

const processMessage = (ws: WebSocket, ms: WebSocket.RawData, token: CognitoAccessTokenPayload) => {
  const parsedMessage = JSON.parse(ms.toString());
  console.log(`Processing message: ${JSON.stringify(parsedMessage)}`);

  switch (parsedMessage.type) {
    case 'START_REQUEST':
      onStartRequest(ws, parsedMessage, token);
      break;
    case 'MOVE':
      onMove(ws, parsedMessage);
      break;
    default:
      console.log(`Unknown message type: ${parsedMessage.type}`);
  }
}

wss.on('connection', async function connection(ws, request) {
  const urlToken = new URLSearchParams(request.url?.split('?')[1]).get('token');
  await authorizeCognitoJwtToken(urlToken ?? "").then((token) => {
    console.log(`A new connection is established! Player: ${token.username}`);
    ws.on('message', (ms) => processMessage(ws, ms, token));
  }).catch((err) => {
    console.log(`Unauthorized: ${err}`);
    ws.close(1008, 'Unauthorized');
  })
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port :${port}`))