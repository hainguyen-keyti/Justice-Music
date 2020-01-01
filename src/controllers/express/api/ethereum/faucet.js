const ethers = require('ethers');
const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
// const lib_common = require(config.library_dir+'/common');

module.exports = async (req, res) => {
    let privateKey = config.ownerSecretKey;
    let wallet = new ethers.Wallet(privateKey, config.provider);
    let contractWithSigner = new ethers.Contract(config.tokenAddress, config.tokenABI, wallet)
    contractWithSigner.transfer(req.body.address, req.body.amount)
    .then(async tx => {
        if(!tx){
            return Promise.reject("Fail to execute transaction");
        }
        config.provider.waitForTransaction(tx.hash).then( async(receipt) => {
        let transaction = {
            to: req.body.address,
            value: ethers.utils.parseEther('0.1')
        };
        const temp = await wallet.sendTransaction(transaction)
        if(temp){
            return response_express.success(res, temp.hash)
        }
        });
    })
    .catch(err => {
        response_express.exception(res, err)
    });
}