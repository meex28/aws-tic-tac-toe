import express from "express";
import {createServer} from "node:http";
import cors from "cors";
import gameResult from './rest/game_result';
import {Server} from "ws";
import {onConnection} from "./websocket/ws";
import dotenv from "dotenv";

dotenv.config();

// Rest API configuration
export const appRest = express()
const allowedOrigins = ['http://localhost:5173'];
const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins
};
appRest.use(cors(corsOptions))
appRest.use('/api/game', gameResult);
const restPort = process.env.API_PORT || 3001;
appRest.listen(restPort, () => console.log(`REST API Listening on port :${restPort}`))

// Websocket configuration
export const appWs = express()
export const serverWs = createServer(appWs);
const wss = new Server({server: serverWs});
wss.on('connection', onConnection);
const port = process.env.PORT || 3000;
serverWs.listen(port, () => console.log(`WebSockets listening on port :${port}`))
