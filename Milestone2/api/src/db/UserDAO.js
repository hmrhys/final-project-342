const db = require('./DBConnection');
const User = require('./models/User');
const crypto = require('crypto');

function getUserByCredentials( username, password) {
    return db.query('SELECT * FROM user WHERE username=?', [username]).then(({results}) => {
        const user = new User(results[0]);
        if (user) {
            return user.validatePassword(password);
        } else {
            throw new Error("User does not exist");
        }
    });
}

// get all users
function getUsers() {
    return db.query('SELECT * FROM user').then(({results}) => {
        return results.map(user => new User(user));
    })
}

// get user by id
function getUserById(userId) {
    return db.query('SELECT * FROM user WHERE user_id=?', [userId]).then(({results}) => {
        if(results[0]) {
            return new User(results[0]);
        }
    })
}

// create user
function createUser(user) {
    let salt = crypto.randomBytes(128).toString('base64');
    let hashPW = crypto('sha256').update(user.password).digest('base64');
    let avatar = "https://robohash.org/"+user.username+"/?set=set4]";
    return db.query('INSERT INTO user ( `user_id`, `first_name`,`last_name`, `username`, `password`, `pwd_salt`, `avatar` ) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [user.id, user.first_name, user.last_name, user.username, hashPW, salt, avatar]).then(({results}) => {
        getUserById(results.insertId);
    });
}

module.exports = {
    getUserByCredentials: getUserByCredentials,
    getUsers: getUsers,
    getUserById: getUserById,
    createUser: createUser,
};