import {v4 as uuid} from "uuid";
import {Player, Session} from "../../model/session";

const activeSessions: Session[] = [];

const createSession = (player: Player) => {
  console.log(`Creating new session for player: {nickname=${player.nickname} and id=${player.id}`);
  const session = {
    id: uuid(),
    players: [player]
  };
  activeSessions.push(session);
  return session;
}

// Join player to an existing session or create a new one
export const joinSession = (player: Player) => {
  const openSession = activeSessions.find(session => session.players.length < 2);
  if (openSession) {
    console.log(`Adding ${player.nickname} to session ${openSession.id}`);
    openSession.players.push(player);
    return openSession;
  }
  return createSession(player);
}

export const deleteSession = (id: string) => {
  console.log(`Removing session with id: ${id}`)
  const index = activeSessions.findIndex(session => session.id === id);
  if (index !== -1) {
    activeSessions.splice(index, 1);
  }
}

export const findSession = (id: string) => (activeSessions.find(session => session.id === id))
