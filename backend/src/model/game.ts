// entity saved in the database
export interface Game {
  id: string;
  host_player_sub: string;
  guest_player_sub: string;
  winner: "HOST" | "GUEST" | "DRAW";
}