const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');

let userList = require('./data/users.json');
let reviewsList = require('./data/reviews.json');
let gameList = require('./data/games.json');

router.use(bodyParser.json());

const API_KEY = ''; // TODO: set up api key in env

router.get('/userlist', (req, res) => {
    res.json(userList);
});

router.get('/reviewlist', (req, res) => {
    res.json(reviewsList);
});

router.get('/gamelist', (req, res) => {
    res.json(gameList);
});

// Authenticate user
router.post('/login', (req, res) => {
    // Temporary for testing
    // TODO: Update once authentication is implemented
    const { username } = req.body;

    const user = Object.values(userList).find(user => user.username === username);
    if (user) {
        console.log("hello");
        req.session.user = user.id;
        res.redirect('/home');
    } else {
        res.send("Login failed");
    }
});

// Get current user
router.get('/users', (req, res) => {
    // Temporary for testing
    // TODO: Update once authentication is implemented
    res.json(userList[req.session.user]);
});

// Get current user reviews
router.get('/users/reviews', (req, res) => {
    const userId = req.session.user;
    const reviews = reviewsList.filter(howl => howl.userId === parseInt(userId));
    res.json(Object.values(reviews));
});

// Create a new review
router.post('/reviews', (req, res) => {
    authUserId = req.session.user;
    const { content } = req.body;
    console.log("api called: " + content);
    if (content) { // TODO: Update once authentication is implemented
        date = new Date().toISOString().split('.')[0]+"Z";
        console.log(date);
        const newPost = { id: reviewsList.length + 1, userId: parseInt(authUserId), datetime: date, text: content };
        reviewsList.push(newPost);
        console.log(newPost);
        console.log(reviewsList);
        res.send(reviewsList);
    } else {
        res.send("ya dingus");
    }
});

// Get specific users reviews
router.get('/users/:id/reviews', (req, res) => {
    const userId = req.params.id;
    const reviews = reviewsList.filter(review => review.uid === parseInt(userId));
    res.json(reviews);
});


// Get specific user
router.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.json(userList[userId]);
});

// Search for a game
router.get('/search/:query', async (req, res) => {
    try {
        const { query } = req.params;

        // const response = await axios.get('https://www.giantbomb.com/api/search/', {
        //     params: {
        //         api_key: API_KEY,
        //         format: 'json',
        //         limit: 10,
        //         page: 1,
        //         query,
        //         resources: 'game'
        //     }
        // });

        // const games = response.data.results.map(result => ({
        //     title: result.name,
        //     uid: result.guid
        // }));

        res.json( Object.values(gameList).find(game => game.name === query) );
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/games/:guid', async (req, res) => {
    try {
        const { guid } = req.params;

        // const response = await axios.get('https://www.giantbomb.com/api/game/' + guid, {
        //     params: {
        //         api_key: API_KEY,
        //         format: 'json'
        //     }
        // });

        // const gameData = response.data.results;

        // res.json({ gameData });
        const game = Object.values(gameList).find(game => game.id === guid);

        if (game) {
            res.json(game);
        } else {
            res.status(404).json({error: 'Game not found'});
        }
        
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;