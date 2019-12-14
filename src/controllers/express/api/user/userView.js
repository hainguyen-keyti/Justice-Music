const config = require('../../../../config');
const userInfo = require('../../../../library/common').deleteSensitiveInfoUser;
// const User = require(config.models_dir + '/mongo/user');
const lib_common = require(config.library_dir+'/common');
const User = require(config.models_dir + '/mongo/user');
const response_express = require(config.library_dir + '/response').response_express;

module.exports = (req, res) => {
    let missField = lib_common.checkMissParams(res, req.body, ["userName"])
    if (missField){
        console.log("Miss param at User View in server");
    }

    User.findOne({$or: [
        {userName: req.body.userName},
        {addressEthereum: req.body.userName}
    ]})
    .then ( user => {
        if(!user)
            return Promise.reject("User not found!");
        user.view++;
        user.save();
        return response_express.success(res, "Success")
    })
    .catch(err => response_express.exception(res, err));
}