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
            console.log(results);
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
    return db.query('INSERT INTO review (`user_id`,`game_id`, `score`, `hoursPlayed`, `content`, `date` ) VALUES (?, ?, ?, ?, ?, ?)',
    [review.user_id, review.game_id, review.score, review.hoursPlayed, review.content, review.date]).then(({results}) => {
        reviewId = results.insertId;
        return db.query('INSERT INTO game_review (`gr_review_id`, `gr_game_id`) VALUES (?, ?)', [reviewId, review.game_id]);
    })
    .then(() => {
        return getReviewById(reviewId);
    })
    .catch(error => {
        console.error('Error creating review:', error);
        throw error;
    });
}

module.exports = {
    getReviews: getReviews,
    getReviewById: getReviewById,
    getReviewsByUserId: getReviewsByUserId,
    getReviewsByGameId: getReviewsByGameId,
    createReview: createReview,
  };