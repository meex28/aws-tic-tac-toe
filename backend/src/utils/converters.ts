import WebSocket from "ws";
import {GameSymbol, Player, Session} from "../model/session";
import {GameOverMessage, GameStartedMessage, MoveMessage, WaitingMessage} from "../model/message";
import {GameResult, GameResultResponse} from "../model/game_result";

export const mapToPlayer = (ws: WebSocket, obj: { nickname: string, playerId: string }, sub: string): Player => ({
  id: obj.playerId,
  nickname: obj.nickname,
  sub,
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

export const mapToGameResult = (session: Session, winner: GameSymbol): GameResult => ({
  id: session.id,
  host_player_sub: session.players[0].sub,
  host_player_nickname: session.players[0].nickname,
  guest_player_sub: session.players[1].sub,
  guest_player_nickname: session.players[1].nickname,
  winner: winner === '1' ? "HOST" : winner === '2' ? "GUEST" : "DRAW"
})

export const mapToGameResultResponse = (gameResult: GameResult, requestingPlayerSub: string): GameResultResponse => {
  const hasWon = (gameResult.host_player_sub == requestingPlayerSub && gameResult.winner == "HOST")
    || (gameResult.host_player_sub == requestingPlayerSub && gameResult.winner == "HOST");
  return {
    id: gameResult.id,
    host_player_nickname:
    gameResult.host_player_nickname,
    guest_player_nickname:
    gameResult.guest_player_nickname,
    result: hasWon
      ? "WIN"
      : gameResult.winner == "DRAW"
        ? "DRAW"
        : "LOOSE"
  }
}