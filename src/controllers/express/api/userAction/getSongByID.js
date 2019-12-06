const ethers = require('ethers');
const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const lib_common = require(config.library_dir+'/common');
const Music = require(config.models_dir + '/mongo/music');

module.exports = async (req, res) => {
    if(!req.query.id){
        return response_express.exception(res, "Please pass id of this song!")
    }
    let privateKey = config.ownerSecretKey;
    let wallet = new ethers.Wallet(privateKey, config.provider);
    let contractWithSigner = new ethers.Contract(config.userBehaviorAddress, config.userBehaviorABI, wallet)
    Music.findById(req.query.id)
    .then(song => {
        console.log(song);
        contractWithSigner.getFileById(song.idSolidity)
        .then(songETH => {
            console.log("22222222222222222222222222222222222222")
            console.log(songETH)
            return response_express.success(res, songETH)
        })
    })
    .catch(err => response_express.exception(res, err));
}