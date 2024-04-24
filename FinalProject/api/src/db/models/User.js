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
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.username = data.username;
        this.avatar = data.avatar;
        this.#salt = data.pwd_salt;
        this.#passwordHash = data.password;
    }

    validatePassword(password) {
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(password, this.#salt, 10000, 64, 'sha512', (err, derivedKey) => {
              if (err) { //problem computing digest, like hash function not available
               reject("Error: " +err);
              }
      
              const digest = derivedKey.toString('hex');
              //console.log(this.#passwordHash);
              //console.log(digest);
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