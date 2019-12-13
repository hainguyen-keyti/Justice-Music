const ethers = require('ethers');
const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const lib_common = require(config.library_dir+'/common');
const User = require(config.models_dir + '/mongo/user');
const Follow = require(config.models_dir + '/mongo/follow');

module.exports = async (req, res) => {
    try {
        const userData = await User.findOne({$or: [
            {userName: req.query.userName},
            {addressEthereum: req.query.userName}
        ]})
        .lean()
        .select('nickName phone avatar addressEthereum facebook youtube home _id coverPhoto')
        if(!userData){
            return response_express.exception(res, "User not exist!")
        }
        const followPromises = [
            Follow.countDocuments({followedID: userData._id}),
            Follow.exists({userID: req.token_info._id, followedID: userData._id})
        ]
        const arrFollowData = await Promise.all(followPromises)
        const temp = {
            follow: arrFollowData[0],
            isFollowed:  arrFollowData[1]
        }
        Object.assign(userData, temp)
        
        return response_express.success(res, userData)   
    } catch (error) {
        return response_express.exception(res, error)
    }
}