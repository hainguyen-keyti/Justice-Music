const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const Contract = require(config.models_dir + '/mongo/contract');
const Music = require(config.models_dir + '/mongo/music');
const lib_common = require(config.library_dir+'/common');

module.exports = async (req, res) => {

    try {
        if(req.body.idContract){
            const reqBodyModifydata = await lib_common.RemoveObjFieldNull(req.body)
            if(Object.entries(reqBodyModifydata).length === 0){
             return response_express.exception(res, "Please input field that you want update!")
            }
            const contractInfo = await Contract.findById(req.body.idContract)

            if(!(req.token_info._id === contractInfo.ownerID.toString() || req.token_info._id === contractInfo.signerID.toString())){
                return response_express.exception(res, "You are not owner or signer!")
            }

            delete reqBodyModifydata.isCancel
            delete reqBodyModifydata.isExecuteContract
            delete reqBodyModifydata.songID
            delete reqBodyModifydata.ownerID
            delete reqBodyModifydata.signerID
            delete reqBodyModifydata.signerApproved
            delete reqBodyModifydata.ownerApproved

            if(req.token_info._id === contractInfo.ownerID.toString() && contractInfo.signerApproved){
                Object.assign(contractInfo, {signerApproved: false})
            }
            if(req.token_info._id === contractInfo.signerID.toString() && contractInfo.ownerApproved){
                Object.assign(contractInfo, {ownerApproved: false})
            }
           Object.assign(contractInfo, reqBodyModifydata)
           const isSave = await contractInfo.save()
            if(isSave){
                return response_express.success(res, "Update contract of this song success!")    
            }
            return response_express.exception(res, "Something went wrong please try again!")
        }

        let miss = lib_common.checkMissParams(res, req.body, ["content", "songID"])
        if (miss){
            console.log("Miss param at create contract");
            return;
        }

        const ownerID = await Music.findById(req.body.songID)
        .lean()
        .select('userUpload')
        req.body.ownerID = ownerID.userUpload._id
        req.body.signerID = req.token_info._id
        const reqBodyModifydata = await lib_common.RemoveObjFieldNull(req.body) // this function to remove all field that null, empyty or undefine 
        if(Object.entries(reqBodyModifydata).length === 0){
            return response_express.exception(res, "Please input field that you want update!")
        }
        const doc = await Contract.create(reqBodyModifydata)
        if(doc){
            
            return response_express.success(res, {idContract: doc._id})
        }
        return response_express.exception(res, "Can not create contract! ")
    } catch (error) {
        return response_express.exception(res, error);
    }
} 