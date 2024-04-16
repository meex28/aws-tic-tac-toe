import {GameSymbol} from "./session";

export type MessageType = 'MOVE' | 'GAME_OVER' | 'GAME_STARTED' | 'WAITING' | 'START_REQUEST';

export interface BaseMessage {
  type: MessageType
}

// received when player joins an application and wants to start a game
export interface StartRequestMessage extends BaseMessage {
  body: {
    nickname: string
    playerId: string
  }
}

// sent when player joins a session and wait for an opponent
export interface WaitingMessage extends BaseMessage {
  body: {
    sessionId: string
  }
}

// sent to both players when game starts
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

// sent to both players on every move
export interface MoveMessage extends BaseMessage {
  body: {
    sessionId: string,
    board: string,
    onMove: GameSymbol
  }
}

// sent to both players on game over
export interface GameOverMessage extends BaseMessage {
  body: {
    sessionId: string,
    board: string,
    winner: GameSymbol
  }
}
