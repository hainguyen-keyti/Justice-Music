const ethers = require('ethers');
const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const User = require(config.models_dir + '/mongo/user');
const lib_common = require(config.library_dir+'/common');

module.exports = (req, res) => {
    User.findOne({email: req.token_info.email})
    .then(async user => {
        if(!user){
            return response_express.exception(res, "User not exist!")
        }
        let wallet = new ethers.Wallet(user.privateKey, config.provider);
        let contractWithSigner = new ethers.Contract(config.userBehaviorAddress, config.userBehaviorABI, wallet)
        let balance = await lib_common.getBlance(user.addressEthereum)
        if(balance.HAK < req.body.investAmount){
            return response_express.exception(res, "Your HAK balance is not enough!")
        }
        config.provider.estimateGas(
                contractWithSigner.investISO(req.body.idFile, req.body.investAmount)
                .then(tx => {
                    if(!tx)
                        return response_express.exception(res, "Field to excute transaction! Tx is not found!")
                    return response_express.success(res, tx.hash)
                })
                .catch(err => {
                    return response_express.exception(res, JSON.parse(err.responseText).error.message)
                })
            ).then(gas=>{
                if(balance.ETH < ethers.utils.formatEther(gas)){
                    return response_express.exception(res, "Your ETH balance is not enough!")
                }
        })
        .catch(err => {
            return response_express.exception(res, "Gas of this transaction can not estimate!")
        })
    })
    .catch(err => {
        return response_express.exception(res, "Something wrong with user at mongoose!")
    })
}