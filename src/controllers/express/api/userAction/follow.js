const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const Follow = require(config.models_dir + '/mongo/follow');
const lib_common = require(config.library_dir+'/common');
module.exports = async (req, res) => {
    let miss = lib_common.checkMissParams(res, req.body, ["followedID"])
    if (miss){
        console.log("Miss param at 'Follow'");
        return;
    }
    console.log(req.token_info)
    if(req.body.followedID === req.token_info._id){
        return response_express.exception(res, "Can not follow this page by yourself!")
    }
    Follow.findOne({followedID: req.body.followedID, userID: req.token_info._id})
    .then(async result => {
        if(result){
            await result.deleteOne()
            const temp = await Follow.findById(result._id)
            console.log(temp)
            return response_express.success(res, "Disable follow this page success!")
        }
        const data = {
            followedID: req.body.followedID,
            userID: req.token_info._id,
        }
        Follow.create(data)
        .then(() => {
            console.log("Follow success!")
            response_express.success(res, "Follow this page success!")
        })
        .catch(err => {
            console.log("Create follow fail: " + err)
            return response_express.exception(res, err);
        })
    })
} 