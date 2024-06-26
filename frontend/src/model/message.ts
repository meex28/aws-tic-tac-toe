import type {GameSymbol} from "@/model/game";

export type MessageType = 'MOVE' | 'GAME_OVER' | 'GAME_STARTED' | 'WAITING' | 'START_REQUEST';

export interface BaseMessage {
  type: MessageType
}

export interface StartRequestMessage extends BaseMessage {
  body: {
    nickname: string
    playerId: string
  }
}

export interface WaitingMessage extends BaseMessage {
  body: {
    sessionId: string
  }
}

export interface GameStartedMessage extends BaseMessage {
  body: {
    sessionId: string,
    players: {
      nickname: string,
      id: string,
      symbol: GameSymbol
    }[],
    onMove: GameSymbol
  }
}

export interface MoveMessage extends BaseMessage {
  body: {
    sessionId: string,
    board: string,
    onMove: GameSymbol
  }
}

export interface GameOverMessage extends BaseMessage {
  body: {
    sessionId: string,
    board: string,
    winner: GameSymbol
  }
}
