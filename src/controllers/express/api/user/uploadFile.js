const config = require('../../../../config');
const getHashIPFS = require(config.library_dir + '/ipfs').getHashIPFS
const response_express = require(config.library_dir + '/response').response_express;

module.exports = (req, res) => {
    console.log(req.files.file)
    try {
        if(!req.files) {
            response_express.exception(res, "File cannot upload");
        } else {
        getHashIPFS(req.files.file.data)
        .then( hash => {
            console.log(hash)
            response_express.success(res, hash)
        })}
    } catch (err) {
        response_express.exception(res, err || err.message)
    }
}