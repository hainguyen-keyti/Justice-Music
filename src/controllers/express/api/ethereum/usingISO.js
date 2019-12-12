const ethers = require('ethers');
const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const User = require(config.models_dir + '/mongo/user');
// const ISO = require(config.models_dir + '/mongo/iso');
const lib_common = require(config.library_dir+'/common');

module.exports = async (req, res) => {
    const {idFile, offerPercent, offerAmount, maintain } = req.body
    if(idFile !== 0) {
        let missField = lib_common.checkMissParams(res, req.body, ["idFile", "offerPercent", "offerAmount", "maintain"])
        if (missField){
            console.log("Miss param at Using IOS in server");
        }
    } 

    User.findById(req.token_info._id)
    .then(user => {
        if(!user){
            return response_express.exception(res, "User not exist!")
        }
        let privateKey = user.privateKey;
        let wallet = new ethers.Wallet(privateKey, config.provider);
        let contractWithSigner = new ethers.Contract(config.userBehaviorAddress, config.userBehaviorABI, wallet)
        contractWithSigner.usingISO(idFile, offerPercent, offerAmount, maintain) //Nên kiểm tra input chổ này 
        .then(tx => {
            if(!tx)
                return Promise.reject("Field to excute transaction");
            response_express.success(res, tx.hash)
            // Create a model about ISO to storage some field like, imageMusic, time, ....
            // ISO.create(req.body.server)
        })
        .catch(err => {response_express.exception(res, err)})
    })
}