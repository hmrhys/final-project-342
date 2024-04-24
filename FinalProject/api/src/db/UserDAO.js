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

// get user by username (used for checking duplicate username creation in account creation)
function getUserByUsername(username) {
    return db.query('SELECT * FROM user WHERE username=?', [username]).then(({results}) => {
        if (results.length > 0) {
            return new User(results[0]);
        } else {
            return null;
        }
    })
}

// create user
function createUser(user) {
    // checking for duplicate usernames
    return getUserByUsername(user.username).then(userExists => {
        if (userExists) {
            // throw error if username already exists
            throw new Error("Username is already taken.");
        } else {
            let salt = crypto.randomBytes(32).toString('hex');
            let hashPW = crypto.pbkdf2Sync(user.password, salt, 10000, 64, 'sha512').toString('hex');
            let avatar = "https://robohash.org/"+user.username+"/?set=set4]";
            return db.query('INSERT INTO user ( `user_id`, `first_name`,`last_name`, `username`, `password`, `pwd_salt`, `avatar` ) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [user.id, user.first_name, user.last_name, user.username, hashPW, salt, avatar]).then(({results}) => {
                getUserById(results.insertId);
            });
        }
    })
}

module.exports = {
    getUserByCredentials: getUserByCredentials,
    getUsers: getUsers,
    getUserById: getUserById,
    getUserByUsername: getUserByUsername,
    createUser: createUser,
};