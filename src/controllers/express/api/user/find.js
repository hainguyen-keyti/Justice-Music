const config = require('../../../../config');
const userInfo = require('../../../../library/common').deleteSensitiveInfoUser;
const User = require(config.models_dir + '/mongo/user');
const response_express = require(config.library_dir + '/response').response_express;

module.exports = (req, res) => {
    User.findOne({username: req.query.keyword})
    .then (user => {
        if(!user || user.status_id !== 1)
            return Promise.reject("User not found");
        var Info = userInfo(user);
        response_express.success(res, Info)
    })
    .catch(err => response_express.exception(res, err));
}