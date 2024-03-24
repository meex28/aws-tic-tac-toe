const express = require('express')
const app = express()
const server = require('http').createServer(app);
const WebSocket = require('ws');
const {v4: uuid} = require('uuid');
const {joinSession, removeSession, findSession} = require("./sessions");

const wss = new WebSocket.Server({server: server});

function processStartRequest(message, ws) {
    console.log(message)
    const session = joinSession(ws, message.body.nickname, message.body.playerId)

    if (session.players.length === 2) {
        session.players.forEach(player => {
            player.ws.send(JSON.stringify({
                type: 'GAME_STARTED',
                body: {
                    sessionId: session.id,
                    players: session.players.map((player, index) => ({
                        nickname: player.nickname,
                        id: player.id,
                        symbol: index + 1
                    })),
                    onTurn: '1'
                }
            }));
        });
    } else {
        ws.send(JSON.stringify({
            type: 'WAITING',
            body: {
                sessionId: session.id
            }
        }));
    }
}

// state - string with 012 symbols, like '012000221'
function checkWinner(stateString) {
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
    const state = stateString.split('');
    for (let i = 0; i < winningFieldsCombinations.length; i++) {
        const [a, b, c] = winningFieldsCombinations[i];
        if (state[a] !== '0' && state[a] === state[b] && state[a] === state[c]) {
            return state[a];
        }
    }
    if (state.some(e => e === '0'))
        return undefined;
    return '0';
}

function processMoveRequest(message, ws) {
    const session = findSession(message.body.sessionId);
    if (!session) {
        return;
    }
    const winner = checkWinner(message.body.state)
    const messageType = !winner ? 'MOVE' : 'GAME_OVER';
    const messageBody = !winner ? message.body : {...message.body, winner: winner};
    session.players.forEach(player => {
        player.ws.send(JSON.stringify({
            type: messageType,
            body: {...messageBody, onTurn: Number(messageBody.onTurn) % 2 + 1},
        }));
    });
    if (winner)
        removeSession(message.body.sessionId);
}

const processMessage = (message, ws) => {
    if (message.type === 'START_REQUEST') {
        processStartRequest(message, ws);
    } else if (message.type === 'MOVE') {
        processMoveRequest(message, ws);
    }
}

wss.on('connection', function connection(ws) {
    console.log('A new connection is established!');

    ws.on('message', (ms) => {
        console.log(`Get message: ${ms}`)
        const message = JSON.parse(ms);
        processMessage(message, ws);
    });
});

server.listen(3000, () => console.log(`Listening on port :3000`))