const config = require('../../../../config');
const Music = require(config.models_dir + '/mongo/music');
const response_express = require(config.library_dir + '/response').response_express;
const lib_common = require(config.library_dir+'/common');

module.exports = async (req, res) => { 
    try {
        if(!req.query.idUserUpload || !req.query.exceptedSongID){
            return response_express.exception(res, "Please pass idUserUpload and exceptedSongID  of this song page!")
        }
        const songData = await Music.find({userUpload: req.query.idUserUpload, _id: {$ne: req.query.exceptedSongID}})
            .limit(3)
            .sort({ view: -1 })
            .lean()
            .select('artist image hash name _id userUpload tags view')
            .populate('userUpload', ['nickName', 'avatar', 'addressEthereum'])

        console.log(songData)
    return response_express.success(res, songData)
    } catch (error) {
        return response_express.exception(res, error)
    }  
}