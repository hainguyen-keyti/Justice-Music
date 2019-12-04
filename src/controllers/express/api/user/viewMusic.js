const config = require('../../../../config');
const userInfo = require('../../../../library/common').deleteSensitiveInfoUser;
const User = require(config.models_dir + '/mongo/user');
const response_express = require(config.library_dir + '/response').response_express;

module.exports = (req, res) => {
    
    User.find({email: { $regex: req.query.keyword }, status_id: 1})
    .then (users => {
        if(!users)
            return Promise.reject("User not found");
        let result = users.map( user => {
                return userInfo(user);
            })
        response_express.success(res, result)
    })
    .catch(err => response_express.exception(res, err));
}