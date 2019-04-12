const config = require('../../../../config');
const lib_password = require(config.library_dir + '/password');
const response_express = require(config.library_dir + '/response').response_express;
const User = require(config.models_dir + '/mongo/user');
const lib_common = require(config.library_dir+'/common');

module.exports = (req, res) => {
    let miss=lib_common.checkMissParams(res, req.body, ["username", "password"])
    let id;
    if (miss){
        console.log("Miss param at Login");
        return;
    }

    User.findOne({username: req.body.username})
    .then(user => {
        if(!user){
            return Promise.reject("User not exist")
        }
        id = user._id;
        let tokenPayload = {
            _id: user._id,
            username: user.username,
        }

        return Promise.all([
            lib_password.comparePassword(req.body.password, user.password_hash),
            lib_common.createToken(tokenPayload, "3 days"),
            lib_common.createToken(tokenPayload, "30 days")
        ])
    })
    .then(result => {
        let isMatchPassword = result[0];
        let accessToken = result[1];
        let refreshToken = result[2];
        if(!isMatchPassword){
            return Promise.reject("Password not match")
        }

        response_express.success(res, {accessToken,refreshToken, id})
    })
    .catch(err=>{
        response_express.exception(res, err.message || err);
        console.log(err);
    })
} 