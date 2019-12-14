const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const TemplateContract = require(config.models_dir + '/mongo/templateContract');
const lib_common = require(config.library_dir+'/common');

module.exports = async (req, res) => {

    try {
        let miss = lib_common.checkMissParams(res, req.body, ["content"])
        if (miss){
            console.log("Miss param at create contract");
            return;
        }
        
        if (req.body.tempContractID){
            const tempData = await TemplateContract.findByIdAndUpdate(req.body.tempContractID,  { $set: { content: req.body.content }});
            if(tempData){
                return response_express.success(res, "Update template contract success!")
            }
            return response_express.exception(res, "Can not modify this template contract!")
        }


        const data = {
            content: req.body.content,
            ownerID: req.token_info._id,
        }
        
        const tempData = await TemplateContract.create(data)
        if(tempData){
            return response_express.success(res, "Create template contract success!")
        }
        return response_express.exception(res, "Can not create template contract!")
        
        
    } catch (error) {
        return response_express.exception(res, error);
    }
} 