const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');

const UserDAO = require('./db/UserDAO');
const ReviewDAO = require('./db/ReviewDAO');
const GameDAO = require('./db/GameDAO');

router.use(bodyParser.json());

const {TokenMiddleware, generateToken, removeToken} = require('./middleware/TokenMiddleware');

const API_KEY = ''; // TODO: set up api key in env

// GAMES 

router.get('/gamelist', (req, res) => {
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
    const query = req.params.query;
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
    const guid = req.params.guid;
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
    const review = req.body;
    ReviewDAO.createReview(review).then(newReview => {
        console.log(newReview);
        res.json(newReview);
    }).catch(err => {
        res.status(500).json({error:err});
    });
});

// get all reviews
router.get('/reviewlist', (req, res) => {
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
    ReviewDAO.getReviewsByUserId(userId).then(reviews => {
        console.log(reviews);
        res.json(reviews);
    })
});

// get reviews for specified game
router.get('/games/:guid/reviews', TokenMiddleware, (req, res) => {
    const gameId = req.params.guid;
    ReviewDAO.getReviewsByGameId(gameId).then(reviews => {
        res.json(reviews);
    })
});


// USER

// Authenticate user
router.post('/login', (req, res) => {
    if(req.body.username && req.body.password) {
        UserDAO.getUserByCredentials(req.body.username, req.body.password).then(user => {
            let result = {
                user: user
            }
            generateToken(req, res, user);
            console.log("We made it here's the user: ", user);
            res.json(result);
        }).catch(err => {
            console.log("failed");
            res.status(401).json({error: err});
        })
    } else {
        res.status(401).json({error: 'Not authenticated'});
    }
});

router.post('/logout', TokenMiddleware, (req, res) => {
    removeToken(req, res);
    res.json({success: true});
})

// create user
router.post('/users', async (req, res) => {
    const { first_name, last_name, username, password } = req.body;

    try {
        const userExists = await UserDAO.getUserByUsername(username);
        if (userExists) {
            return res.status(400).json({error: 'Username is already taken.'});
        }

        const newUser = await UserDAO.createUser( {
            first_name,
            last_name,
            username,
            password
        });

        res.status(201).json(newUser);

    } catch (error) {
        console("Miss!");
        console.error('Error creating user:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
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
    UserDAO.getUserById(userId).then(user => {
        res.json(user);
    });
});

// Get all users
router.get('/userlist', (req, res) => {
    // res.json(gameList);
    UserDAO.getUsers().then(users => {
        res.json(users);
    })
    .catch(err => {
        res.status(400).json({error: err});
    });
});

module.exports = router;