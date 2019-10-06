const ethers = require('ethers');
const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;

module.exports = async (req, res) => {
    let privateKey = config.ownerSecretKey;
    let wallet = new ethers.Wallet(privateKey, config.provider);
    let contractWithSigner = new ethers.Contract(config.userBehaviorAddress, config.userBehaviorABI, wallet)
    contractWithSigner.getUserUpload()
    .then(tx => {
        let pageCount = Math.ceil(tx.length/10);
        let page = req.query.p;
        if (!page){ page = 1;}
        if (page > pageCount){
            page = pageCount;
        }
        console.log(`Page: ${page}, PageCount: ${pageCount}`);
        if(!tx)
            return Promise.reject("Fail to excute transaction");
        let jsonRes = {
            page: page,
            pageCount: pageCount,
            file: tx.slice(page * 10 - 10, page * 10)
        }
        response_express.success(res, jsonRes)
    })
    .catch(err => response_express.exception(res, err));
}