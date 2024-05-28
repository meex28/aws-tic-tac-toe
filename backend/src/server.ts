import express from "express";
import {createServer} from "node:http";
import cors from "cors";
import gameResult from './rest/game_result';
import {Server} from "ws";
import {onConnection} from "./websocket/ws";
import dotenv from "dotenv";
import healthCheck from "./rest/health_check";

dotenv.config();

// Rest API configuration
export const appRest = express()
const FRONTEND_URL = process.env.FRONTEND_URL;
if (!FRONTEND_URL) {
  console.error('FRONTEND_URL is not set');
}
const allowedOrigins = [FRONTEND_URL ?? ""];
const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins
};
appRest.use(cors(corsOptions))
appRest.use('/api/game', gameResult);
appRest.use('/api/health', healthCheck);
const restPort = process.env.API_PORT || 3001;
appRest.listen(restPort, () => console.log(`REST API Listening on port :${restPort}`))

// Websocket configuration
export const appWs = express()
appWs.get("/health", (req, res) => {
  res.status(200).send();
})
export const serverWs = createServer(appWs);
const wss = new Server({server: serverWs});
wss.on('connection', onConnection);
const port = process.env.PORT || 3000;
serverWs.listen(port, () => console.log(`WebSockets listening on port :${port}`))
