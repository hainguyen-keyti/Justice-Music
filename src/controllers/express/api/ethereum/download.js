const ethers = require('ethers');
const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const User = require(config.models_dir + '/mongo/user');

module.exports = async (req, res) => {
    User.findOne({email: req.token_info.email})
    .then(user => {
        if(!user){
            return response_express.exception(res, "User not exist!")
        }
        let wallet = new ethers.Wallet(user.privateKey, config.provider);
        let contractWithSigner = new ethers.Contract(config.userBehaviorAddress, config.userBehaviorABI, wallet)
        return contractWithSigner.dowloadFile(req.body._idFile)
    })
    .then(tx => {
        if(!tx)
            return Promise.reject("Field to excute transaction");
        response_express.success(res, tx.hash)
    })
    .catch(err => {response_express.exception(res, JSON.parse(err.responseText).error.message)
    })
}