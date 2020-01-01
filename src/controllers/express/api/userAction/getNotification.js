const ethers = require('ethers');
const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const lib_common = require(config.library_dir+'/common');
const History = require(config.models_dir + '/mongo/history');

module.exports = async (req, res) => {
    try {
        const promises = [
            History.find({ $or:[
                {senderID: req.token_info._id},
                {receiverID: req.token_info._id},
            ]})
            .lean()
            .sort({ date: -1 })
            ,
            History.countDocuments(
                {
                    $and: [
                        {
                            $or:[
                                {senderID: req.token_info._id},
                                {receiverID: req.token_info._id},
                            ]
                        },
                        {
                            isSeen: false
                        }
                    ]
                }
            )
        ]
        const data = await Promise.all(promises)
        const result = {
            countFalse: data[1],
            data: data[0]
        }
        return response_express.success(res, result)
    } catch (error) {
        return response_express.exception(res, error)
    }
}