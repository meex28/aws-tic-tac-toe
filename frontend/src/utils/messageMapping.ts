import type {GameOverMessage, GameStartedMessage, MoveMessage, WaitingMessage} from "@/model/message";
import type {GameSession, GameSymbol, Player} from "@/model/game";

export const mapWaiting = (message: WaitingMessage): GameSession => {
  return {
    id: message.body.sessionId
  };
}

export const mapGameStarted = (message: GameStartedMessage, playerId: string): GameSession => {
  const body = message.body;
  const player: Player = body.players.find(p => p.id === playerId)!!;
  const opponent: Player = body.players.find(p => p.id !== playerId)!!;
  return {
    id: body.sessionId,
    player,
    opponent,
    board: Array(9).fill('0'),
    isPlayerOnMove: body.onMove == player.symbol
  };
}

export const mapMove = (message: MoveMessage, currentGame: GameSession): GameSession => {
  return {
    ...currentGame,
    board: message.body.board.split('') as GameSymbol[],
    isPlayerOnMove: message.body.onMove === currentGame.player!!.symbol
  };
}

export const mapGameOver = (message: GameOverMessage, currentGame: GameSession): GameSession => {
  return {
    ...currentGame,
    board: message.body.board.split('') as GameSymbol[],
    isPlayerOnMove: undefined,
    winner: message.body.winner
  };
}