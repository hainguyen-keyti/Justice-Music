const ethers = require('ethers');
const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const lib_common = require(config.library_dir+'/common');

module.exports = async (req, res) => {
    let privateKey = config.ownerSecretKey;
    let wallet = new ethers.Wallet(privateKey, config.provider);
    let contractWithSigner = new ethers.Contract(config.rankingAddress, config.rankingABI, wallet)
    let overrides = {

        // The maximum units of gas for the transaction to use
        gasLimit: 9999999,

    // The price (in wei) per unit of gas
    gasPrice: ethers.utils.parseUnits('9.0', 'gwei'),
    

    
    };
    contractWithSigner.RankPerWeek(overrides)
    .then(tx => {
        if(!tx)
            return Promise.reject("Fail to execute transaction");
        config.provider.waitForTransaction(tx.hash).then(() => {
            return response_express.success(res, `Success at transaction ${tx.hash}`) 
        });
    })
    .catch(err => response_express.exception(res, err));
}