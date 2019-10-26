const ethers = require('ethers');
const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const lib_common = require(config.library_dir+'/common');
const User = require(config.models_dir + '/mongo/user');

module.exports = async (req, res) => {
    console.log(req.token_info.email)
    User.findOne({email: req.token_info.email})
    .then(user => {
        if(!user){
            return response_express.exception(res, "User not exist!")
        }
        let privateKey = user.privateKey;
        let wallet = new ethers.Wallet(privateKey, config.provider);
        let contractWithSigner = new ethers.Contract(config.userBehaviorAddress, config.userBehaviorABI, wallet)
        contractWithSigner.getISOInfo(req.query.page)
        .then(tx => {
            if(!tx){
                return response_express.exception(res, "Transaction failed, please try again!")
            }
            console.log(tx)
        })
        .catch(err => response_express.exception(res, err));
    })
}