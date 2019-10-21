const ethers = require('ethers');
const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const lib_common = require(config.library_dir+'/common');

module.exports = async (req, res) => {
    let privateKey = config.ownerSecretKey;
    let wallet = new ethers.Wallet(privateKey, config.provider);
    let contractWithSigner = new ethers.Contract(config.tokenAddress, config.tokenABI, wallet)
    contractWithSigner.transfer(req.body.address, req.body.amount)
    .then(tx => {
        if(!tx)
            return Promise.reject("Fail to excute transaction");
        response_express.success(res, tx.hash)
    })
    .catch(err => response_express.exception(res, err));
}