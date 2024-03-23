const {v4: uuid} = require("uuid");
// stores id and players objects: {
//  nickname, id, symbol
// }
const activeSessions = [];

function createSession(ws, nickname, playerId) {
    console.log(`Creating new session with nickname: ${nickname} and id: ${playerId}`);
    const newSession = {
        id: uuid(),
        players: [{
            nickname: nickname,
            id: playerId,
            ws: ws
        }]
    };
    activeSessions.push(newSession);
    return newSession;
}

module.exports.joinSession = (ws, nickname, playerId) => {
    const waitingSessions = activeSessions.filter(session => session.players.length < 2);
    if (waitingSessions.length) {
        console.log(`Adding ${nickname} to session ${waitingSessions[0].id}`);
        waitingSessions[0].players.push({
            nickname: nickname,
            id: playerId,
            ws: ws
        });
        return waitingSessions[0];
    }
    return createSession(ws, nickname, playerId);
}


module.exports.removeSession = (id) => {
    const index = activeSessions.findIndex(session => session.id === id);
    if (index !== -1) {
        activeSessions.splice(index, 1);
    }
}

module.exports.findSession = (id) => (
    activeSessions.find(session => session.id === id)
)