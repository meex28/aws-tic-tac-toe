import type {MessageTypes} from "@/model/MessageTypes";

export interface BaseMessage {
  type: MessageTypes
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
      symbol: string
    }[],
    onTurn: string
  }
}

export interface MoveMessage extends BaseMessage {
  body: {
    sessionId: string,
    state: string,
    onTurn: string // symbol which has made a move
  }
}

export interface GameOverMessage extends BaseMessage {
  body: {
    sessionId: string,
    state: string,
    winner: string
  }
}