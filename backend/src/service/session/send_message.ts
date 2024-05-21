import {Session} from "../../model/session";
import {serializeMessage} from "../../utils/converters";

export const sendMessageToPlayers = (session: Session, message: any) => {
  session.players.forEach(player => {
    player.ws.send(serializeMessage(message))
  });
}