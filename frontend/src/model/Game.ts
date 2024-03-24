export interface Game {
  id: string,
  player?: {
    nickname: string,
    id: string,
    symbol: string
  },
  opponent?: {
    nickname: string,
    id: string,
    symbol: string
  },
  state?: string[],
  winner?: string,
  isPlayerTurn?: boolean
}