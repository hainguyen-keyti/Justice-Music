const config = require('../../../../config');
const lib_password = require(config.library_dir + '/password');
const response_express = require(config.library_dir + '/response').response_express;
const User = require(config.models_dir + '/mongo/user');
const lib_common = require(config.library_dir+'/common');
module.exports = (req, res) => {
    let miss=lib_common.checkMissParams(res, req.body, ["email", "password"])
    let userData;
    if (miss){
        console.log("Miss param at Login");
        return response_express.exception(res, `Miss param at ${miss}`)
    }

    User.findOne({email: req.body.email})
    .then(user => {
        if(!user){
            return Promise.reject("User not exist")
        }
        let tokenPayload = {
            _id: user._id,
            email: user.email,
        }
        refreshToken = lib_common.createToken(tokenPayload, "30 days");
        user.refreshToken = refreshToken;
        userData = user
        user.save();
        return Promise.all([
            lib_password.comparePassword(req.body.password, user.password_hash),
            lib_common.createToken(tokenPayload, "30 days"),
        ])
    })
    .then(result => {
        let isMatchPassword = result[0];
        let accessToken = result[1];
        let {refreshToken, id, email, addressEthereum, userName, avatar} = userData;
        if(!isMatchPassword){
            return Promise.reject("Password not match")
        }
        lib_common.getBalance(addressEthereum).then( balance => {
            response_express.success(res, {accessToken, refreshToken, avatar, id, email, userName, addressEthereum, HAK: balance.HAK})
            console.log("login successfull")
        })
    })
    .catch(err=>{
        response_express.exception(res, err.message || err);
        console.log("login fail " + err);
    })
} 