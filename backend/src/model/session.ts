import WebSocket from "ws";

export type GameSymbol = '0' | '1' | '2';

export interface Session {
  id: string;
  players: Player[];
}

export interface Player {
  id: string;
  nickname: string;
  ws: WebSocket;
}