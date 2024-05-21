// entity saved in the database
export interface GameResult {
  id: string;
  hostPlayerSub: string;
  hostPlayerNickname: string;
  guestPlayerSub: string;
  guestPlayerNickname: string;
  winner: "HOST" | "GUEST" | "DRAW";
}

export interface GameResultResponse {
  id: string;
  hostNickname: string;
  guestNickname: string;
  result: "WIN" | "DRAW" | "LOOSE";
}