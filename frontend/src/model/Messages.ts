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
    }[]
  }
}

export interface MoveMessage extends BaseMessage {
  body: {
    sessionId: string,
    state: string,
  }
}