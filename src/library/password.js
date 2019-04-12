const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.cryptPassword = (plaintextPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(plaintextPassword, saltRounds, function(err, hash){
            if(err)
                return reject(err);
            return resolve(hash);
        })
    })
}

exports.comparePassword = (plaintextPassword, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plaintextPassword.toString(), hash, function(err, result) {
            if(err)
                return reject(err);
            return resolve(result);
        })
    })
}