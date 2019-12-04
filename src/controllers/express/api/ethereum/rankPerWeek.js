const ethers = require('ethers');
const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const lib_common = require(config.library_dir+'/common');

module.exports = async (req, res) => {
    let privateKey = config.ownerSecretKey;
    let wallet = new ethers.Wallet(privateKey, config.provider);
    let contractWithSigner = new ethers.Contract(config.rankingAddress, config.rankingABI, wallet)
    contractWithSigner.RankPerWeek()
    .then(tx => {
        console.log(tx)
        if(!tx)
            return Promise.reject("Fail to excute transaction");
        config.provider.waitForTransaction(tx.hash).then(() => {
            return response_express.success(res, `Success at transaction ${tx.hash}`) 
        });
    })
    .catch(err => response_express.exception(res, err));
}