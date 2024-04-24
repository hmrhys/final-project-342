const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');

// let userList = require('./data/users.json');
// let reviewsList = require('./data/reviews.json');
// let gameList = require('./data/games.json');

const UserDAO = require('./db/UserDAO');
const ReviewDAO = require('./db/ReviewDAO');
const GameDAO = require('./db/GameDAO');

router.use(bodyParser.json());

const {TokenMiddleware, generateToken, removeToken} = require('../middleware/TokenMiddleware');

const API_KEY = ''; // TODO: set up api key in env

// router.get('/userlist', TokenMiddleware, (req, res) => {
//     res.json(userList);
// });

// router.get('/reviewlist', TokenMiddleware, (req, res) => {
//     res.json(reviewsList);
// });

// GAMES 

router.get('/gamelist', TokenMiddleware, (req, res) => {
    // res.json(gameList);
    GameDAO.getGames().then(games => {
        res.json(games);
    })
    .catch(err => {
        res.status(400).json({error: err});
    });
});

// Search for a game
router.get('/search/:query', TokenMiddleware, async (req, res) => {
    // try {
    //     const { query } = req.params;

    //     // const response = await axios.get('https://www.giantbomb.com/api/search/', {
    //     //     params: {
    //     //         api_key: API_KEY,
    //     //         format: 'json',
    //     //         limit: 10,
    //     //         page: 1,
    //     //         query,
    //     //         resources: 'game'
    //     //     }
    //     // });

    //     // const games = response.data.results.map(result => ({
    //     //     title: result.name,
    //     //     uid: result.guid
    //     // }));

    //     res.json( Object.values(gameList).find(game => game.name === query) );
    // } catch (error) {
    //     console.error('Error:', error.message);
    //     res.status(500).json({ error: 'Internal Server Error' });
    // }
    const { query } = req.params.query;
    GameDAO.getGameByName(query).then(game => {
        if (game) {
            res.json(game);
        } else {
            res.status(404).json({error: 'Game not found'});
        }
    })
    .catch(err => {
        res.status(500).json({error:err});
    })
});

router.get('/games/:guid', TokenMiddleware, async (req, res) => {
    // try {
    //     const { guid } = req.params;

    //     // const response = await axios.get('https://www.giantbomb.com/api/game/' + guid, {
    //     //     params: {
    //     //         api_key: API_KEY,
    //     //         format: 'json'
    //     //     }
    //     // });

    //     // const gameData = response.data.results;

    //     // res.json({ gameData });
    //     const game = Object.values(gameList).find(game => game.id === guid);

    //     if (game) {
    //         res.json(game);
    //     } else {
    //         res.status(404).json({error: 'Game not found'});
    //     }
        
    // } catch (error) {
    //     console.error('Error:', error.message);
    //     res.status(500).json({ error: 'Internal Server Error' });
    // }

    const { guid } = req.params.guid;
    GameDAO.getGameById(guid).then(game => {
        if (game) {
            res.json(game);
        } else {
            res.status(404).json({error: 'Game not found'});
        }
    })
    .catch(err => {
        res.status(500).json({error:err});
    })
});

// REVIEWS

// Create a new review
router.post('/reviews', TokenMiddleware, (req, res) => {
    //authUserId = req.user;
    const { review } = req.body;
    // console.log("api called: " + content);
    // if (content) { // TODO: Update once authentication is implemented
    //     date = req.body.date; //new Date().toISOString().split('.')[0]+"Z";
    //     console.log(date);
    //     text = req.body.text;
    //     console.log(text);
    //     const newPost = { id: reviewsList.length + 1, userId: parseInt(authUserId.id), datetime: date, text: text };
    //     reviewsList.push(newPost);
    //     console.log(newPost);
    //     console.log(reviewsList);
    //     res.send(reviewsList);
    // } else {
    //     res.send("ya dingus");
    // }
    ReviewDAO.createReview(review).then(newReview => {
        res.json(newReview);
    });
});

// get all reviews
router.get('/reviewlist', TokenMiddleware, (req, res) => {
    // res.json(gameList);
    ReviewDAO.getReviews().then(reviews => {
        res.json(reviews);
    })
    .catch(err => {
        res.status(400).json({error: err});
    });
});

// get review by id
router.get('/reviews/:ruid', TokenMiddleware, (req, res) => {
    const reviewId = req.params.ruid;
    ReviewDAO.getReviewById(reviewId).then(review => {
        res.json(review);
    })
});

// Get specific users reviews
router.get('/users/:id/reviews', TokenMiddleware, (req, res) => {
    const userId = req.params.id;
    // const reviews = reviewsList.filter(review => review.uid === parseInt(userId));
    // res.json(reviews);
    ReviewDAO.getReviewsByUserId(userId).then(reviews => {
        res.json(reviews);
    })
});

// get reviews for specified game
router.get('/reviews/:guid', TokenMiddleware, (req, res) => {
    const gameId = req.params.guid;
    ReviewDAO.getReviewsByGameId(gameId).then(reviews => {
        res.json(reviews);
    })
});


// USER

// Authenticate user
router.post('/login', (req, res) => {
    // Temporary for testing
    // TODO: Update once authentication is implemented
    // const { username } = req.body.username;
    if(req.body.username && req.body.password) {
        UserDAO.getUserByCredentials(req.body.username, req.body.password).then(user => {
            let result = {
                user: user
            }
            generateToken(req, res, user);
            res.json(result);
        }).catch(err => {
            res.status(401).json({error: err});
        })
    } else {
        res.status(401).json({error: 'Not authenticated'});
    }
    // const user = Object.values(userList).find(user => user.username === username);
    // if (user) {
    //     // console.log("hello");
    //     // req.session.user = user.id;
    //     // res.redirect('/home');
        
    //     res.json(user);
        
    // } else {
    //     res.send("Login failed");
    // }
});

router.post('/logout', TokenMiddleware, (req, res) => {
    removeToken(req, res);
    res.json({success: true});
})

// Get current user
router.get('/users/current', TokenMiddleware, (req, res) => {
    res.json(req.user);
});

// Get current user reviews
router.get('/users/reviews', TokenMiddleware, (req, res) => {
    const userId = req.user.id;
    ReviewDAO.getReviewsByUserId(userId).then(reviews => {
        res.json(reviews);
    });
});

// Get specific user
router.get('/users/:id', TokenMiddleware, (req, res) => {
    const userId = req.params.id;
    // res.json(userList[userId]);
    UserDAO.getUserById(userId).then(user => {
        res.json(user);
    });
});

module.exports = router;