const ethers = require('ethers');
const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;

module.exports = async (req, res) => {
    let privateKey = config.ownerSecretKey;
    let wallet = new ethers.Wallet(privateKey, config.provider);
    let contractWithSigner = new ethers.Contract(config.userBehaviorAddress, config.userBehaviorABI, wallet)
    contractWithSigner.dowloadFile(Number(req.body.idFile))
    .then(tx => {
        if(!tx)
            return Promise.reject("Fail to excute transaction");
        response_express.success(res, tx.hash)
    })
    .catch(err => response_express.exception(res, err));
}