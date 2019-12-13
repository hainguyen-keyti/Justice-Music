const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const Follow = require(config.models_dir + '/mongo/follow');
const lib_common = require(config.library_dir+'/common');
module.exports = async (req, res) => {
    try {
        let miss = lib_common.checkMissParams(res, req.body, ["followedID"])
        if (miss){
            console.log("Miss param at 'Follow'");
            return;
        }
        
        if(req.body.followedID === req.token_info._id){
            return response_express.exception(res, "Can not follow this page by yourself!")
        }

        const checkIsFollow = await Follow.findOne({followedID: req.body.followedID, userID: req.token_info._id})
        if(checkIsFollow){
            checkIsFollow.deleteOne()
            return response_express.success(res, "Disable follow this page success!")
        }

        const followData = {
            followedID: req.body.followedID,
            userID: req.token_info._id,
        }

        const checkCreateFollow = await Follow.create(followData)
        if(checkCreateFollow){
            return response_express.success(res, "Follow this page success!")
        }else{
            return response_express.exception(res, "Can not create follow. Please try again!");
        }

    } catch (error) {
        console.log("Create follow fail: " + error)
        return response_express.exception(res, error);
    }
} 