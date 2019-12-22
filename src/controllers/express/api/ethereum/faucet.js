const ethers = require('ethers');
const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
// const lib_common = require(config.library_dir+'/common');

module.exports = async (req, res) => {
    console.log(req.body)
    let privateKey = config.ownerSecretKey;
    let wallet = new ethers.Wallet(privateKey, config.provider);
    let contractWithSigner = new ethers.Contract(config.tokenAddress, config.tokenABI, wallet)
    console.log(ethers.utils.parseEther('0.1'))
    contractWithSigner.transfer(req.body.address, req.body.amount)
    .then(async tx => {
        if(!tx)
            return Promise.reject("Fail to execute transaction");
        let transaction = {
            to: req.body.address,
            value: ethers.utils.parseEther('1.0')
        };
        const temp = await wallet.sendTransaction(transaction)
        console.log(temp)
        if(temp){
            return response_express.success(res, tx.hash)
        }
    })
    .catch(err => response_express.exception(res, err));
}