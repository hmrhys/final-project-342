import api from './APIClient.js';

const recentReviews = document.querySelector('#game-reviews');

api.getGameReviews().then(gameReviews => {
    gameReviews.forEach(review => {
        const reviewItem = document.createElement('div');
        reviewItem.innerHTML = review.ruid;
        recentReviews.append(reviewItem);
    });
});

