const ethers = require('ethers');
const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const lib_common = require(config.library_dir+'/common');
const User = require(config.models_dir + '/mongo/user');

module.exports = async (req, res) => {
    User.findOne({addressEthereum: req.params.address})
    .then(user => {
        if(!user){
            return response_express.exception(res, "User not exist!")
        }
        let wallet = new ethers.Wallet(user.privateKey, config.provider);
        let contractWithSigner = new ethers.Contract(config.userBehaviorAddress, config.userBehaviorABI, wallet)
        
        contractWithSigner.getUserDownload()
        .then(tx => {
            if(!tx){
                return response_express.exception(res, "Transaction failed, please try again!")
            }
            lib_common.ModifyMusicFile(tx)
            .then(result => {
                return response_express.success(res, result)  
            })
        })
        .catch(err => {response_express.exception(res, JSON.parse(err.responseText).error.message)});
    })
}