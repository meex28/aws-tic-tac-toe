import {GameSymbol, Session} from "./model/session";
import {Game} from "./model/game";
import {DynamoDB} from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient({
  region: 'us-east-1',
  endpoint: 'http://localhost:4566'
});

const buildGameEntity = (session: Session, winner: GameSymbol): Game => ({
  id: session.id,
  host_player_sub: session.players[0].sub,
  guest_player_sub: session.players[1].sub,
  winner: winner === '1' ? "HOST" : winner === '2' ? "GUEST" : "DRAW"
})

export const saveSessionResults = async (session: Session, winner: GameSymbol) => {
  const game = buildGameEntity(session, winner);
  const params = {
    TableName: 'GamesTable',
    Item: game,
  };
  try {
    await dynamoDb.put(params).promise();
    console.log('Game saved successfully:', game);
  } catch (error) {
    console.error('Cannot save game in DynamoDB. Error:', error);
  }
}