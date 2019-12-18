const config = require('../../../../config');
const Contract = require(config.models_dir + '/mongo/contract');
const Follow = require(config.models_dir + '/mongo/follow');
const response_express = require(config.library_dir + '/response').response_express;
const lib_common = require(config.library_dir+'/common');

module.exports = async (req, res) => { 
    try {
        let miss = lib_common.checkMissParams(res, req.params, ["idContract"])
        if (miss){
            console.log("Miss params at 'get contract'!");
            return;
        }

        const data = await Contract.findById(req.params.idContract)
        .lean()
        .populate('ownerID', ['nickName', 'avatar', 'addressEthereum', 'facebook', 'youtube', 'home', 'phone'])
        .populate('signerID', ['nickName', 'avatar', 'addressEthereum', 'facebook', 'youtube', 'home', 'phone'])
        .populate('songID', ['name'])

        const followPromises = [
            Follow.countDocuments({followedID: data.ownerID._id}),
            Follow.countDocuments({followedID: data.signerID._id}),
        ]
        const arrFollowData = await Promise.all(followPromises)
        const arrFollowResult = {
            ownerFollow: arrFollowData[0],
            signerFollow:  arrFollowData[1]
        }
        Object.assign(data, arrFollowResult)
        if(data.isPublic){
            return response_express.success(res, data)
        }
        else{
            if(req.token_info._id == data.ownerID._id || req.token_info._id == data.signerID._id){
                return response_express.success(res, data)
            }
            return response_express.exception(res, "This contract is not public!")
        }
        

    } catch (error) {
        return response_express.exception(res, error)
    }  
}
