const db = require('./DBConnection');
const Game = require('./models/Game');

// get all games
function getGames() {
    return db.query('SELECT * FROM game').then(({results}) => {
        return results.map(game => new Game(game));
    })
}
// get game by id
function getGameById(gameId) {
    return db.query('SELECT * FROM game WHERE game_id=?', [gameId]).then(({results}) => {
        if(results[0]) {
            return new Game(results[0]);
        }
    })
}

function getGameByName(gameName) {
    return db.query('SELECT * FROM game WHERE game_name=?', [gameName]).then(({results}) => {
        if(results[0]) {
            return new Game(results[0]);
        }
    })
}

module.exports = {
    getGames: getGames,
    getGameById: getGameById,
    getGameByName: getGameByName,
};