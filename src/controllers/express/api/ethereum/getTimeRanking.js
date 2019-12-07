const ethers = require('ethers');
const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const lib_common = require(config.library_dir+'/common');

module.exports = async (req, res) => {
    let privateKey = config.ownerSecretKey;
    let wallet = new ethers.Wallet(privateKey, config.provider);
    let contractWithSigner = new ethers.Contract(config.rankingAddress, config.rankingABI, wallet)
    contractWithSigner.getTimeRanking()
    .then(time => {
        if(time.length === 0){
            return response_express.exception(res, "Fail to get time ranking. Time ranking empty")
        }
        lib_common.convertArrBigNumberToNumber(time)
        .then(result => {
            contractWithSigner.getRanking(result[result.length - 1], 2)
            .then( (result) => {
                lib_common.getListMusicBySolidityID(result)
                .then(result => {
                    return response_express.success(res, result)  
                })
            })
        })
    })
    .catch(err => response_express.exception(res, err));
}