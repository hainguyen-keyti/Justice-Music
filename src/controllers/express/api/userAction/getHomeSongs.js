const config = require('../../../../config');
const Music = require(config.models_dir + '/mongo/music');
const response_express = require(config.library_dir + '/response').response_express;
const User = require(config.models_dir + '/mongo/user');
const Follow = require(config.models_dir + '/mongo/follow');

module.exports = async (req, res) => { 
    try {
        const promises = [
            Music.find({}) //get Xem Nhieu
            .limit(4)
            .sort({ view: -1 })
            .lean()
            .select('artist image hash name _id userUpload tags view')
            .populate('userUpload', ['nickName', 'avatar', 'addressEthereum']),

            Music.find({}) // get Moi Phat Hanh
            .limit(4)
            .sort({ date: -1 })
            .lean()
            .select('artist image hash name _id userUpload tags date, view')
            .populate('userUpload', ['nickName', 'avatar', 'addressEthereum']),

        ]
        
        const arrData = await Promise.all(promises)
        
        const result = {
            mostView: arrData[0],
            mostNew: arrData[1],
        }
    return response_express.success(res, result)
    } catch (error) {
        return response_express.exception(res, error)
    }  
}