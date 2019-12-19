const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const Contract = require(config.models_dir + '/mongo/contract');
const lib_common = require(config.library_dir+'/common');

module.exports = async (req, res) => {
    try {
        let miss = lib_common.checkMissParams(res, req.body, ["idContract"])
        if (miss){
            console.log("Miss param at create 'set approved contract' ");
            return;
        }
        if(req.body.approved !== undefined){
            const contractInfo = await Contract.findById(req.body.idContract)
            if(req.token_info._id === contractInfo.ownerID.toString()){
                Object.assign(contractInfo, {ownerApproved: req.body.approved})
                contractInfo.save()
                return response_express.success(res, "Set Approved is success!")
            }
            if(req.token_info._id === contractInfo.signerID.toString()){
                Object.assign(contractInfo, {signerApproved: req.body.approved})
                contractInfo.save()
                return response_express.success(res, "Set Approved is success!")
            }
            return response_express.exception(res, "You are not owner or signer!")
        }
        return response_express.exception(res, "Miss some params: approved")        
    } catch (error) {
        return response_express.exception(res, error);
    }
} 