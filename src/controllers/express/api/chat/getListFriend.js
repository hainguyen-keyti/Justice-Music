const config = require('../../../../config')
const User = require(config.models_dir + '/mongo/user')
const response_express = require(config.library_dir + '/response').response_express
const userInfo = require('../../../../library/common').deleteSensitiveInfoUser;

module.exports = (req, res) => {
    if(req.token_info._id !== req.body.userID)
        response_express.exception(res, 'Failed to authenticate token.')
    
    User.findOne({_id: req.body.userID})
    .then( user => {
        User.find({_id: {$in: user.personInbox}}).sort({date: -1}) // not sure, fix 
        .then( listFriends => {
            let result = listFriends.map( listFriend => {
                return userInfo(listFriend);
            })
            response_express.success(res, result)
        })
    })
    .catch(err=>response_express.exception(res, err.message))
}