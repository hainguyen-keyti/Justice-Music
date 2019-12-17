const config = require('../../../../config');
const TemplateContract = require(config.models_dir + '/mongo/templateContract');
const response_express = require(config.library_dir + '/response').response_express;
const lib_common = require(config.library_dir+'/common');

module.exports = async (req, res) => { 
    try {
        const arrTempContract = await TemplateContract.find({ownerID: req.token_info._id})
            .sort({ date_updated: -1 })
            .lean()
            .select('-ownerID')
        console.log(arrTempContract)
    return response_express.success(res, arrTempContract)
    } catch (error) {
        return response_express.exception(res, error)
    }  
}