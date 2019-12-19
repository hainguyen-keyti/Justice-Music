const config = require('../../../../config');
const TemplateContract = require(config.models_dir + '/mongo/templateContract');
const Music = require(config.models_dir + '/mongo/music');
const response_express = require(config.library_dir + '/response').response_express;
const lib_common = require(config.library_dir+'/common');

module.exports = async (req, res) => { 
    try {
        if(req.query.idMongo && req.query.idMongo !== 'undefined'){
            const music = await Music.findById(req.query.idMongo)
            .lean()
            .select('userUpload')
        const arrTempContract = await TemplateContract.find({ownerID: music.userUpload})
            .sort({ date_updated: -1 })
            .lean()

        return response_express.success(res, arrTempContract)
        }
        else{
            const arrTempContract = await TemplateContract.find({ownerID: req.token_info._id})
            .sort({ date_updated: -1 })
            .lean()

        return response_express.success(res, arrTempContract)
        }
    } catch (error) {
        return response_express.exception(res, error)
    }  
}
