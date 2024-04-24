const db = require('./DBConnection');
const Review = require('./models/Review');

// get all reviews
function getReviews() {
    return db.query('SELECT * FROM review').then(({results}) => {
        return results.map(review => new Review(review));
    })
}

// get review by id
function getReviewById(reviewId) {
    return db.query('SELECT * FROM review WHERE review_id=?', [reviewId]).then(({results}) => {
        if(results[0])
          return new Review(results[0]);
      });
}

// get reviews belonging to user
function getReviewsByUserId(userId) {
    return db.query('SELECT * FROM review JOIN user_review ON ur_review_id=review_id WHERE ur_user_id=?', [userId]).then(({results}) => {
            return results.map(review => new Review(review));
    });
}

// get all reviews for specific game
function getReviewsByGameId(gameId) {
    return db.query('SELECT * FROM review JOIN game_review ON gr_review_id=review_id WHERE gr_game_id=?', [gameId]).then(({results}) => {
        return results.map(review => new Review(review));
    });
}

// create new review
function createReview(review) {
    return db.query('INSERT INTO review ( `review_id`, `user_id`,`game_id`, `score`, `hoursPlayed`, `content`, `date` ) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [review.id, review.user_id, review.game_id, review.score, review.hoursPlayed, review.content, review.date]).then(({results}) => {
        getReviewById(results.insertId)
    });
}

module.exports = {
    getReviews: getReviews,
    getReviewById: getReviewById,
    getReviewsByUserId: getReviewsByUserId,
    getReviewsByGameId: getReviewsByGameId,
    createReview: createReview,
    addParkToCounty: addParkToCounty,
    recordParkVisit: recordParkVisit
  };