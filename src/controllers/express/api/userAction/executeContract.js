const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const Contract = require(config.models_dir + '/mongo/contract');
const Music = require(config.models_dir + '/mongo/music');
const lib_common = require(config.library_dir+'/common');

module.exports = async (req, res) => {

    try {
        let miss = lib_common.checkMissParams(res, req.body, ["content", "songID"])
        if (miss){
            console.log("Miss param at create contract");
            return;
        }
        const ownerID = await Music.findById(req.body.songID)
        .lean()
        .select('userUpload')
        req.body.ownerID = ownerID._id
        req.body.signerID = req.token_info._id
        const reqBodyModifydata = await lib_common.RemoveObjFieldNull(req.body) // this function to remove all field that null, empyty or undefine 
        if(Object.entries(reqBodyModifydata).length === 0){
            return response_express.exception(res, "Please input field that you want update!")
        }

        const doc = await Contract.create(reqBodyModifydata)
        if(doc){
            
            return response_express.success(res, "Create contract success!")
        }
        return response_express.exception(res, "Can not create contract!")
    } catch (error) {
        return response_express.exception(res, error);
    }
} 