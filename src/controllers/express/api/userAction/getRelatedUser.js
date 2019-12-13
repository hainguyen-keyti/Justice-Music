const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const User = require(config.models_dir + '/mongo/user');
const Follow = require(config.models_dir + '/mongo/follow');

module.exports = async (req, res) => { 
    try {
        const count = await User.countDocuments()
        const random = Math.floor(Math.random() * count);
        User.find({}) // get User random
        .skip(random)
        .limit(3)
        .sort({ view: -1 })
        .lean()
        .select('nickName view avatar addressEthereum _id')
        .then(users => {
            return Promise.all(
                users.map( async (user) =>  {
                    const countFollow = await Follow.countDocuments({followedID: user._id})
                    return Object.assign(user, {follow: countFollow})
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