const ethers = require('ethers');
const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const lib_common = require(config.library_dir+'/common');

module.exports = async (req, res) => {
    let privateKey = config.ownerSecretKey;
    let wallet = new ethers.Wallet(privateKey, config.provider);
    let contractWithSigner = new ethers.Contract(config.userBehaviorAddress, config.userBehaviorABI, wallet)
    contractWithSigner.getUserUpload()
    .then(tx => {
        if(!tx){
            return response_express.exception(res, "Transaction failed, please try again!")
        }
        lib_common.ModifyFile(tx, req.query.page)
        .then(result => {
            return response_express.success(res, result)  
        })
    })
    .catch(err => response_express.exception(res, err));
}