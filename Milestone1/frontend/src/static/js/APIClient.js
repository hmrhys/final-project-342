const API_BASE = '/api/routes';

function checkResponse(res) {
    if(!res.ok) {
        throw new Error("There was an error in fetch");
    }
    return res;
}

function handleError(error) {
    console.log("ERROR", error);
    throw error;
}

// login

// get user by id
const getUserById = (id) => {
    return fetch(API_BASE+`/users/${id}`)
    .then(checkResponse)
    .then(res => {
        return res.json();
    })
    .then(user => {
        return user;
    })
    .catch(handleError);
};

// get user reviews
const getUserReviews = (id) => {
    return fetch(API_BASE+`/users/${id}/reviews`)
    .then(checkResponse)
    .then(res => {
        return res.json();
    })
    .then(reviews => {
        return reviews;
    })
    .catch(handleError);
};

// get all games
const getGames = () => {
    return fetch(API_BASE+'/gamelist')
    .then(checkResponse)
    .then(res => {
        return res.json();
    })
    .then(gameReviews => {
        return gameList;
    })
    .catch(handleError);
};

// get game by id
const getGameById = (guid) => {
    return fetch(API_BASE+`/games/${guid}`)
    .then(checkResponse)
    .then(res => {
        return res.json();
    })
    .then(game => {
        return game;
    })
    .catch(handleError);
};

// get all game reviews

const getGameReviews = () => {
    return fetch(API_BASE+'/reviewlist')
    .then(checkResponse)
    .then(res => {
        return res.json();
    })
    .then(gameReviews => {
        return gameReviews;
    })
    .catch(handleError);
};

export default {
    getUserById,
    getUserReviews,
    getGames,
    getGameById,
    getGameReviews
};