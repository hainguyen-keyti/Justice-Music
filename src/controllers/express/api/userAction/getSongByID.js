const ethers = require('ethers');
const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const lib_common = require(config.library_dir+'/common');
const Music = require(config.models_dir + '/mongo/music');

module.exports = async (req, res) => {
    if(!req.query.id){
        return response_express.exception(res, "Please pass id of this song!")
    }
    lib_common.getSongByIdMongo(req.query.id)
    .then(result => {
        console.log("22222222222222222222222222222222222222")
        console.log(result)
        return response_express.success(res, result)
    })
    .catch(err => {
        console.log(err)
        response_express.exception(res, err)
    })
}