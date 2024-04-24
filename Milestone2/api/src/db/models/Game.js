module.exports = class Game {
    id = null;
    name = null;
    year = null;

    constructor(data) {
        this.id = data.game_id;
        this.name = data.game_title;
        this.year = data.game_year;
    }
};