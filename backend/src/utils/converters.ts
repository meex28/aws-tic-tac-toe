import WebSocket from "ws";
import {GameSymbol, Player, Session} from "../model/session";
import {GameOverMessage, GameStartedMessage, MoveMessage, WaitingMessage} from "../model/message";

export const mapToPlayer = (ws: WebSocket, obj: { nickname: string, playerId: string }): Player => ({
  id: obj.playerId,
  nickname: obj.nickname,
  ws
})

export const buildGameStartedMessage = (session: Session, onMove: GameSymbol): GameStartedMessage => ({
  type: 'GAME_STARTED',
  body: {
    sessionId: session.id,
    players: session.players.map((player, index) => ({
      nickname: player.nickname,
      id: player.id,
      symbol: String(index + 1) as GameSymbol
    })),
    onMove: onMove
  }
})

export const buildWaitingMessage = (session: Session): WaitingMessage => ({
  type: 'WAITING',
  body: {
    sessionId: session.id
  }
})

export const buildGameOverMessage = (moveMessage: MoveMessage, winner: GameSymbol): GameOverMessage => ({
  type: 'GAME_OVER',
  body: {
    sessionId: moveMessage.body.sessionId,
    board: moveMessage.body.board,
    winner
  }
})

export const serializeMessage = (message: any) => JSON.stringify(message);