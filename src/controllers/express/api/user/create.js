const config = require('../../../../config');
const lib_password = require(config.library_dir + '/password');
const response_express = require(config.library_dir + '/response').response_express;
const User = require(config.models_dir + '/mongo/user');
const lib_common = require(config.library_dir+'/common');
const sha256 = require('sha256')
const ethers = require('ethers');

module.exports = (req, res) => {
    let miss = lib_common.checkMissParams(res, req.body, ["user"])
    if (miss){
        console.log("Miss param at Create");
        return;
    }
    let missField = lib_common.checkMissParams(res, req.body.user, ["email", "password", "phone", "nickName", "genre"])
    if (missField){
        console.log("Miss param at Create Field");
        return;
    } 

    lib_password.cryptPassword(req.body.user.password)
    .then(passwordHash => {
        delete req.body.user.password;
        req.body.user.password_hash = passwordHash;
        req.body.user.privateKey = sha256(config.secret + req.body.user.email)
        let wallet = new ethers.Wallet(req.body.user.privateKey)
        req.body.user.addressEthereum = wallet.address
        console.log(req.body.user)
        return User.create(req.body.user);
    })
    .then(() => {
        response_express.success(res);
    })
    .catch(err => {
        response_express.exception(res, err);
    })
} 