const config = require('../../../../config');
const Contract = require(config.models_dir + '/mongo/contract');
const Follow = require(config.models_dir + '/mongo/follow');
const response_express = require(config.library_dir + '/response').response_express;
const lib_common = require(config.library_dir+'/common');

module.exports = async (req, res) => { 
    try {

        const promises = [
            Contract.find({ownerID: req.token_info._id})
            .lean()
            .select('_id songID isCancel isConfirmContract isExecuteContract nameContractForm')
            .populate({
                path: 'songID',
                select: 'artist image hash name _id userUpload tags date, view',
                populate: {
                    path: 'userUpload',
                    select: 'nickName avatar addressEthereum'
                }
            }),
            Contract.find({signerID: req.token_info._id})
            .lean()
            .select('_id songID isCancel isConfirmContract isExecuteContract nameContractForm')
            .populate({
                path: 'songID',
                select: 'artist image hash name _id userUpload tags date, view',
                populate: {
                    path: 'userUpload',
                    select: 'nickName avatar addressEthereum'
                }
            })
    
        ]
        const arrData = await Promise.all(promises)

        

        const result = {
            ownerData: arrData[0],
            signerData:  arrData[1]
        }
        return response_express.success(res, result)

    } catch (error) {
        return response_express.exception(res, error)
    }  
}
