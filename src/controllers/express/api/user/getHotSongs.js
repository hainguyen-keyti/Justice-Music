const config = require('../../../../config');
const userInfo = require('../../../../library/common').deleteSensitiveInfoUser;
const User = require(config.models_dir + '/mongo/user');
const Music = require(config.models_dir + '/mongo/music');
const response_express = require(config.library_dir + '/response').response_express;

module.exports = (req, res) => {   
    Music.find({}).limit(10).sort({ view: -1 })
    .then(result => {
        if(!result)
            return response_express.exception(res, "We don't have hot song");
        console.log(result)
        return response_express.success(res, result)
    })
    .catch(err => response_express.exception(res, err));
}