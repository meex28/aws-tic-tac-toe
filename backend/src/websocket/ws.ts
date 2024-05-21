import WebSocket from "ws";
import {CognitoAccessTokenPayload} from "aws-jwt-verify/jwt-model";
import {onMove, onStartRequest} from "../service/session/message_processing";
import {authorizeCognitoJwtToken} from "../security/auth";
import {IncomingMessage} from "node:http";


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

export const onConnection = async (ws: InstanceType<any>, request: IncomingMessage) => {
  const urlToken = new URLSearchParams(request.url?.split('?')[1]).get('token');
  await authorizeCognitoJwtToken(urlToken ?? "").then((token) => {
    console.log(`A new connection is established! Player: ${token.username}`);
    ws.on('message', (ms: WebSocket.RawData) => processMessage(ws, ms, token));
  }).catch((err) => {
    console.log(`Unauthorized: ${err}`);
    ws.close(1008, 'Unauthorized');
  })
}
