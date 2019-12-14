const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const Follow = require(config.models_dir + '/mongo/follow');
const lib_common = require(config.library_dir+'/common');
const Music = require(config.models_dir + '/mongo/music');

module.exports = async (req, res) => {
    let miss = lib_common.checkMissParams(res, req.body, ["lyric", "idMongo"])
    if (miss){
        console.log("Miss param at 'postlyric'");
        return;
    }

    Music.findById(req.body.idMongo)
    .select('userUpload')
    .then(music => {
        if(music.userUpload == req.token_info._id){
            music.lyric = req.body.lyric
            music.save();
            return response_express.success(res, "Update lyric success!")
        }
        return response_express.exception(res, "Can not post lyric. You are not owner!")
    })
    .catch(err => {
        return response_express.exception(res, err);
    })
} 