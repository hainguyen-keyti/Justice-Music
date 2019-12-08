const ethers = require('ethers');
const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const lib_common = require(config.library_dir+'/common');
const User = require(config.models_dir + '/mongo/user');
const Follow = require(config.models_dir + '/mongo/follow');

module.exports = (req, res) => {
    User.findOne({$or: [
        {userName: req.query.userName},
        {addressEthereum: req.query.userName}
    ]})
    .then(user => {
        if(!user){
            return response_express.exception(res, "User not exist!")
        }
        const {nickName, phone, avatar, addressEthereum, otherInfomaion, _id } = user
        Follow.countDocuments({followedID: _id})
        .then(async count => {
            const isFollowed = await Follow.exists({userID: req.token_info._id})
            const data = {
                _id,
                nickName, 
                phone, 
                avatar, 
                addressEthereum, 
                follow: count,
                isFollowed,
                otherInfomaion: otherInfomaion ? otherInfomaion : {}
            }
            return response_express.success(res, data)
        }) 
    })
    .catch(err => response_express.exception(res, err));
}