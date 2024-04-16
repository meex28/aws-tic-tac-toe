export type GameSymbol = '0' | '1' | '2';

export interface Player {
  id: string;
  nickname: string;
  symbol: GameSymbol;
}

export interface GameSession {
  id: string,
  player?: Player,
  opponent?: Player,
  board?: GameSymbol[],
  winner?: GameSymbol,
  isPlayerOnMove?: boolean
}