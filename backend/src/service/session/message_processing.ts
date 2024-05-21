import WebSocket from "ws";
import {MoveMessage, StartRequestMessage} from "../../model/message";
import {deleteSession, findSession, joinSession} from "./session_service";
import {buildGameOverMessage, buildGameStartedMessage, buildWaitingMessage, mapToPlayer} from "../../utils/converters";
import {sendMessageToPlayers} from "./send_message";
import {GameSymbol} from "../../model/session";
import {CognitoAccessTokenPayload} from "aws-jwt-verify/jwt-model";
import {saveGameResult} from "../game_results/game_results_service";

export const onStartRequest = (ws: WebSocket, message: StartRequestMessage, token: CognitoAccessTokenPayload) => {
  const session = joinSession(mapToPlayer(ws, message.body, token.sub));
  const isSessionFull = session.players.length === 2;

  if (isSessionFull) {
    const startingPlayer: GameSymbol = Math.floor(Math.random() * 2) === 0 ? '1' : '2';
    sendMessageToPlayers(session, buildGameStartedMessage(session, startingPlayer))
  } else {
    sendMessageToPlayers(session, buildWaitingMessage(session))
  }
}

// boardStr - string built with '0', '1' and '2' symbols, like '012000221'. Represents the state of the game board.
const checkWinner = (boardStr: string): GameSymbol | undefined => {
  const winningFieldsCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  const board = boardStr.split('');
  for (let i = 0; i < winningFieldsCombinations.length; i++) {
    const [a, b, c] = winningFieldsCombinations[i];
    if (board[a] !== '0' && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as GameSymbol;
    }
  }
  return board.some(field => field === '0') ? undefined : '0';
}

export const onMove = (ws: WebSocket, message: MoveMessage) => {
  const session = findSession(message.body.sessionId);
  if (!session) {
    console.log(`Session with id=${message.body.sessionId} not found!`)
    return;
  }
  const winner = checkWinner(message.body.board)

  if (winner === undefined) {
    // set next player to move
    message.body.onMove = String(Number(message.body.onMove) % 2 + 1) as GameSymbol;
    sendMessageToPlayers(session, message)
  } else {
    sendMessageToPlayers(session, buildGameOverMessage(message, winner))
    saveGameResult(session, winner);
    deleteSession(message.body.sessionId);
  }
}