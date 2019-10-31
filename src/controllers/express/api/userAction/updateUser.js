const config = require('../../../../config')
const User = require(config.models_dir + '/mongo/user')
const response_express = require(config.library_dir + '/response').response_express

module.exports = (req, res) => {
    const {avatar, facebook, youtube, phone, home, nickname } = req.body
    if(!req.token_info || req.token_info === undefined)
        response_express.exception(res, new Error('Failed to authenticate token.'))
    
    User.findOne({_id: req.token_info._id})
    .then( user => {
        user.avatar = avatar
        user.name = nickname
        user.otherInfomaion = {
            facebook,
            youtube,
            home,
        }
        return user.save();
    })
    .then(()=>{
        return response_express.success(res, "Update Success")
    })
    .catch(err=>response_express.exception(res, err.message))
}