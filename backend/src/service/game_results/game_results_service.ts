import {GameSymbol, Session} from "../../model/session";
import {GameResult, GameResultResponse} from "../../model/game_result";
import {DynamoDB} from "aws-sdk";
import {mapToGameResult, mapToGameResultResponse} from "../../utils/converters";

const dynamoDb = new DynamoDB.DocumentClient({
  region: 'us-east-1',
  endpoint: 'http://localhost:4566'
});

const GAMES_RESULTS_TABLE = 'GamesResultsTable';

export const saveGameResult = async (session: Session, winner: GameSymbol) => {
  const gameResult = mapToGameResult(session, winner);
  const params = {
    TableName: GAMES_RESULTS_TABLE,
    Item: gameResult,
  };
  try {
    await dynamoDb.put(params).promise();
    console.log('Game saved successfully:', gameResult);
  } catch (error) {
    console.error('Cannot save game in DynamoDB. Error:', error);
  }
}

export const getUserGamesResults = async (sub: string): Promise<GameResultResponse[]> => {
  const paramsHost = {
    TableName: GAMES_RESULTS_TABLE,
    IndexName: 'hostPlayerSub-index',
    KeyConditionExpression: 'hostPlayerSub = :sub',
    ExpressionAttributeValues: {
      ':sub': sub,
    },
  };
  const paramsGuest = {
    TableName: GAMES_RESULTS_TABLE,
    IndexName: 'guestPlayerSub-index',
    KeyConditionExpression: 'guestPlayerSub = :sub',
    ExpressionAttributeValues: {
      ':sub': sub,
    },
  };
  try {
    const [hostData, guestData] = await Promise.all([
      dynamoDb.query(paramsHost).promise(),
      dynamoDb.query(paramsGuest).promise()
    ]);
    const gamesResults = [...hostData.Items ?? [], ...guestData.Items ?? []] as GameResult[]
    return gamesResults.map((r) => mapToGameResultResponse(r, sub))
  } catch (error) {
    console.error('Error fetching user games:', error);
    throw new Error('Could not fetch user games');
  }
};
