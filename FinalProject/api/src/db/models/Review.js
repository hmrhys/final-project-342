module.exports = class Review {
    id = null;
    user_id = null;
    game_id = null;
    score = null;
    hoursPlayed = null;
    content = null;
    date = null;

    constructor(data) {
        this.id = data.id;
        this.user_id = data.user_id;
        this.game_id = data.game_id;
        this.score = data.score;
        this.hoursPlayed = data.hoursPlayed;
        this.content = data.content;
        this.date = data.date;
    }
};