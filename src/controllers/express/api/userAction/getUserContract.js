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
            .select('songID signerID nameContractForm')
            .populate({
                path: 'songID',
                select: 'image hash name view',
                // populate: {
                //     path: 'userUpload',
                //     select: 'nickName avatar addressEthereum'
                // }
            })
            .populate({
                path: 'signerID',
                select: 'avatar nickName addressEthereum',
            }),
            Contract.find({signerID: req.token_info._id})
            .lean()
            .select('songID ownerID nameContractForm')
            .populate({
                path: 'songID',
                select: 'image hash name view',
                // populate: {
                //     path: 'userUpload',
                //     select: 'nickName avatar addressEthereum'
                // }
            })
            .populate({
                path: 'ownerID',
                select: 'avatar nickName addressEthereum',
            }),
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
