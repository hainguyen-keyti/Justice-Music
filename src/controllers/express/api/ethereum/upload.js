const ethers = require('ethers');
const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const User = require(config.models_dir + '/mongo/user');
const Music = require(config.models_dir + '/mongo/music');

module.exports = async (req, res) => {
    console.log(req.token_info.email)
    let privateKey;
    User.findOne({email: req.token_info.email})
    .then(user => {
        if(!user){
            return response_express.exception(res, "User not exist!")
        }
        privateKey = user.privateKey;
        console.log(req.body)
        return Music.create(req.body.server)
    })
    .then(music => {
        console.log(music)
        let wallet = new ethers.Wallet(privateKey, config.provider);
        let contractWithSigner = new ethers.Contract(config.userBehaviorAddress, config.userBehaviorABI, wallet)
        return contractWithSigner.uploadFile(req.body.ether.hash, req.body.ether.price, 2, music._id.toString())
    })
    .then(tx => {
        console.log(tx)
        if(!tx)
            return Promise.reject("Field to excute transaction");
        response_express.success(res, tx.hash)
    })
    .catch(err => {response_express.exception(res, JSON.parse(err.responseText).error.message)
    })
}