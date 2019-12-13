const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const User = require(config.models_dir + '/mongo/user');
const Follow = require(config.models_dir + '/mongo/follow');

module.exports = async (req, res) => { 
    try {
        User.find({}) // get User Hot
        .limit(4)
        .sort({ view: -1 })
        .lean()
        .select('nickName view avatar addressEthereum _id')
        .then(users => {
            return Promise.all(
                users.map( async (user) =>  {
                    const followPromises = [
                        Follow.countDocuments({followedID: user._id}),
                        Follow.exists({userID: req.token_info._id})
                    ]
                    const arrFollowData = await Promise.all(followPromises)
                    const test = {
                        follow: arrFollowData[0],
                        isFollowed:  arrFollowData[1]
                    }
                    return Object.assign(user, test)
                  })
            )
        })
        .then(result => {
            return response_express.success(res, result)
        })
    } catch (error) {
        return response_express.exception(res, error)
    }  
}