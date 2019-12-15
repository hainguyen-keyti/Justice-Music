const config = require('../../../../config');
const getHashIPFS = require(config.library_dir + '/ipfs').getHashIPFS
const response_express = require(config.library_dir + '/response').response_express;

module.exports = (req, res) => {
    try {
        if(!req.files) {
            return response_express.exception(res, "File cannot upload")
        } else {
        getHashIPFS(req.files.file.data)
        .then( hash => {
            return response_express.success(res, hash)
        })}
    } catch (err) {
        return response_express.exception(res, err || err.message)
    }
}