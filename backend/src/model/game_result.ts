// entity saved in the database
export interface GameResult {
  id: string;
  host_player_sub: string;
  host_player_nickname: string;
  guest_player_sub: string;
  guest_player_nickname: string;
  winner: "HOST" | "GUEST" | "DRAW";
}

export interface GameResultResponse {
  id: string;
  host_player_nickname: string;
  guest_player_nickname: string;
  result: "WIN" | "DRAW" | "LOOSE";
}