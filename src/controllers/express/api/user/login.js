const config = require('../../../../config');
const lib_password = require(config.library_dir + '/password');
const response_express = require(config.library_dir + '/response').response_express;
const User = require(config.models_dir + '/mongo/user');
const lib_common = require(config.library_dir+'/common');
module.exports = (req, res) => {
    let miss=lib_common.checkMissParams(res, req.body, ["username", "password"])
    let id;
    let username;
    let refreshToken;
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
        username = user.username
        let tokenPayload = {
            _id: user._id,
            username: username,
        }
        refreshToken = lib_common.createToken(tokenPayload, "30 days");
        user.refreshToken = refreshToken;
        user.save();
        return Promise.all([
            lib_password.comparePassword(req.body.password, user.password_hash),
            lib_common.createToken(tokenPayload, "3 days"),
        ])
    })
    .then(result => {
        let isMatchPassword = result[0];
        let accessToken = result[1];
        if(!isMatchPassword){
            return Promise.reject("Password not match")
        }
        console.log("login successful")
        response_express.success(res, {accessToken,refreshToken, id, username})
    })
    .catch(err=>{
        response_express.exception(res, err.message || err);
        console.log("login fail" + err);
    })
} 