const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const Contract = require(config.models_dir + '/mongo/contract');
const Music = require(config.models_dir + '/mongo/music');
const History = require(config.models_dir + '/mongo/history');
const lib_common = require(config.library_dir+'/common');

module.exports = async (req, res) => {
    try {
        if(req.body.idContract){
            const reqBodyModifydata = await lib_common.RemoveObjFieldNull(req.body)
            if(Object.entries(reqBodyModifydata).length === 0){
             return response_express.exception(res, "Please input field that you want update!")
            }
            const contractInfo = await Contract.findById(req.body.idContract)
            .populate('songID', ['image'])
            .populate('ownerID', ['socketID', 'nickName'])
            .populate('signerID', ['socketID', 'nickName'])

            if(!(req.token_info._id === contractInfo.ownerID._id.toString() || req.token_info._id === contractInfo.signerID._id.toString())){
                return response_express.exception(res, "You are not owner or signer!")
            }

            delete reqBodyModifydata.isCancel
            delete reqBodyModifydata.isExecuteContract
            delete reqBodyModifydata.songID
            delete reqBodyModifydata.ownerID
            delete reqBodyModifydata.signerID
            delete reqBodyModifydata.signerApproved
            delete reqBodyModifydata.ownerApproved

            if(req.token_info._id === contractInfo.ownerID._id.toString() && contractInfo.signerApproved){
                Object.assign(contractInfo, {signerApproved: false})
            }
            if(req.token_info._id === contractInfo.signerID._id.toString() && contractInfo.ownerApproved){
                Object.assign(contractInfo, {ownerApproved: false})
            }
           Object.assign(contractInfo, reqBodyModifydata)
           const isSave = await contractInfo.save()
            if(isSave){
                response_express.success(res, "Update contract of this song success!")
                const historyData = {
                    senderID: req.token_info._id,
                    receiverID: req.token_info._id === contractInfo.ownerID._id.toString() ? contractInfo.signerID._id : contractInfo.ownerID._id,
                    songID: contractInfo.songID._id,
                    contentSender: `Cập nhật hợp đồng \"${contractInfo.nameContractForm}\" thành công.`,
                    contentReceiver: `Hợp đồng \"${contractInfo.nameContractForm}\" đã được cập nhật`,
                    type: 6,
                    songImage: contractInfo.songID.image
                }
                const newHistory = await History.create(historyData)
                
                socket.to(`${contractInfo.ownerID.socketID}`).emit('notification', newHistory);
                socket.to(`${contractInfo.signerID.socketID}`).emit('notification', newHistory);
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
        .select('userUpload image')
        req.body.ownerID = ownerID.userUpload._id
        req.body.signerID = req.token_info._id
        const reqBodyModifydata = await lib_common.RemoveObjFieldNull(req.body) // this function to remove all field that null, empyty or undefine 
        if(Object.entries(reqBodyModifydata).length === 0){
            return response_express.exception(res, "Please input field that you want update!")
        }
        const contractCreate = await Contract.create(reqBodyModifydata)
        const contractInfo = await Contract.findById(contractCreate)
                            .populate('ownerID', ['socketID', 'nickName'])
                            .populate('signerID', ['socketID', 'nickName'])
        if(contractInfo){
            response_express.success(res, {idContract: contractInfo._id})
            const historyData = {
                senderID: req.token_info._id,
                receiverID: req.token_info._id === contractInfo.ownerID._id.toString() ? contractInfo.signerID._id : contractInfo.ownerID._id,
                songID: contractInfo.songID._id,
                contentSender: `Tạo hợp đồng \"${contractInfo.nameContractForm}\" với \"${contractInfo.ownerID.nickName}\" thành công.`,
                contentReceiver: `Hợp đồng \"${contractInfo.nameContractForm}\" đã được tạo bởi \"${contractInfo.signerID.nickName}\".`,
                type: 6,
                songImage: ownerID.image
            }
            const newHistory = await History.create(historyData)
            socket.to(`${contractInfo.ownerID.socketID}`).emit('notification', newHistory);
            socket.to(`${contractInfo.signerID.socketID}`).emit('notification', newHistory);
        }
        else
            return response_express.exception(res, "Can not create contract! ")
    } catch (error) {
        return response_express.exception(res, error);
    }
} 