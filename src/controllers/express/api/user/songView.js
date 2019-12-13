const config = require('../../../../config');
const userInfo = require('../../../../library/common').deleteSensitiveInfoUser;
// const User = require(config.models_dir + '/mongo/user');
const lib_common = require(config.library_dir+'/common');
const Music = require(config.models_dir + '/mongo/music');
const response_express = require(config.library_dir + '/response').response_express;

module.exports = (req, res) => {
    const {idSongMongo} = req.body
    let missField = lib_common.checkMissParams(res, req.body, ["idSongMongo"])
    if (missField){
        console.log("Miss param at Song View in server");
    }
    Music.findById(idSongMongo)
    .then ( song => {
        if(!song)
            return Promise.reject("Song not found");
        song.view++;
        song.save();
        
        return response_express.success(res, "Success")
    })
    .catch(err => response_express.exception(res, err));
}