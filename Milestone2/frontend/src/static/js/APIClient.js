import HTTPClient from "./HTTPClient";
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
const login = (username, password) => {
    const data = {
        username: username,
        password: password
    }
    return HTTPClient.post(`${API_BASE}/login`, data);
}
// logout
const logout = () => {
    return HTTPClient.post(`${API_BASE}/logout`, {});
}
// create user

// get current user
const getCurrentUser = () => {
    return HTTPClient.get(`${API_BASE}/users/current`);
}

// get user by id
const getUserById = (id) => {
    return HTTPClient.get(`${API_BASE}/users/${id}`);
};

// get user reviews
const getUserReviews = (id) => {
    return HTTPClient.get(`${API_BASE}/users/${id}/reviews`);
};

// get all games
const getGames = () => {
    return HTTPClient.get(`${API_BASE}/gamelist`);
};

// get game by id
const getGameById = (guid) => {
    return HTTPClient.get(`${API_BASE}/games/${guid}`);
};

//search for game by title
const gameSearch = (title) => {
    return HTTPClient.get(`${API_BASE}/search/${title}`);
}

// get all game reviews
const getGameReviews = () => {
    return HTTPClient.get(`${API_BASE}/reviewlist`);
};

// create new review
const createReview = (gameId, score, hoursPlayed, date, text) => {
    const data = {
        gameId: gameId,
        score: score,
        hoursPlayed, hoursPlayed,
        content: text,
        date: date
    }

    return HTTPClient.post(`${API_BASE}/reviews`, data);
}

export default {
    login,
    logout,
    //createUser,
    getCurrentUser,
    getUserById,
    getUserReviews,
    getGames,
    getGameById,
    gameSearch,
    getGameReviews,
    createReview
};