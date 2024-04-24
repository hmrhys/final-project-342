module.exports = class Game {
    game_id = null;
    game_name = null;
    year_released = null;
    description = null;
    cover_art = null;

    constructor(data) {
        this.game_id = data.game_id;
        this.game_name = data.game_name;
        this.year_released = data.year_released;
        this.description = data.description;
        this.cover_art = data.cover_art;
    }
};