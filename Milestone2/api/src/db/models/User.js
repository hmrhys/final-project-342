const crypto = require('crypto');

module.exports = class User {
    id = null;
    first_name = null;
    last_name = null;
    username = null;
    avatar = null;
    #passwordHash = null;
    #salt = null;

    constructor(data) {
        this.id = data.user_id;
        this.first_name = data.user_fname;
        this.last_name = data.user_lname;
        this.username = data.username;
        this.avatar = data.user_avatar;
        this.#salt = data.user_salt;
        this.#passwordHash = data.user_password;
    }

    validatePassword(password) {
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(password, this.#salt, 100000, 64, 'sha512', (err, derivedKey) => {
              if (err) { //problem computing digest, like hash function not available
               reject("Error: " +err);
              }
      
              const digest = derivedKey.toString('hex');
              if (this.#passwordHash == digest) {
                resolve(this);
              }
              else {
                reject("Invalid username or password");
              }
            });
          });
    }

    toJSON() {
        return {
            id: this.id,
            first_name: this.first_name,
            last_name: this.last_name,
            username: this.username,
            avatar: this.avatar
        }
    }
};