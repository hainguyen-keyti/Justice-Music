const config = require('../../../../config');
const Music = require(config.models_dir + '/mongo/music');
const response_express = require(config.library_dir + '/response').response_express;

module.exports = async (req, res) => { 
    try {
        const promises = [
            Music.find({}) //get Xem Nhieu
            .limit(4)
            .sort({ view: -1 })
            .lean()
            .select('artist image name _id userUpload tags view')
            .populate('userUpload', ['nickName', 'avatar', 'addressEthereum']),

            Music.find({}) // get Moi Phat Hanh
            .limit(4)
            .sort({ date: -1 })
            .lean()
            .select('artist image name _id userUpload tags date')
            .populate('userUpload', ['nickName', 'avatar', 'addressEthereum']),
            
		]
		const arrData = await Promise.all(promises)
        const result = {
            mostView: arrData[0],
            mostNew: arrData[1]
        }
        console.log("this is resuslt neneenenenen")
        console.log(result)
    return response_express.success(res, result)
    } catch (error) {
        return esponse_express.exception(res, err)
    }  
}