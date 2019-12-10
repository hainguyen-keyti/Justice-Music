const ethers = require('ethers');
const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const lib_common = require(config.library_dir+'/common');
const User = require(config.models_dir + '/mongo/user');

module.exports = async (req, res) => {
    User.findOne({email: req.token_info.email})
    .then(user => {
        if(!user){
            return response_express.exception(res, "User not exist!")
        }
        let wallet = new ethers.Wallet(user.privateKey, config.provider);
        let contractWithSigner = new ethers.Contract(config.userBehaviorAddress, config.userBehaviorABI, wallet)
        contractWithSigner.getISOList()
        .then(tx => {
            if(!tx){
                return response_express.exception(res, "Transaction failed, please try again!")
            }
            lib_common.ModifyFileISO(tx, req.token_info._id)
            .then(result => {
                return response_express.success(res, result)  
            })
        })
        .catch(err => response_express.exception(res, err));
    })
}