const ethers = require('ethers');
const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const User = require(config.models_dir + '/mongo/user');
const Music = require(config.models_dir + '/mongo/music');
const History = require(config.models_dir + '/mongo/history');
const lib_common = require(config.library_dir+'/common');

module.exports = async (req, res) => {
    try {
        if(req.body.idFile !== 0) {
            let missField = lib_common.checkMissParams(res, req.body, ["idFile", "offerPercent", "offerAmount", "maintain"])
            if (missField){
                console.log("Miss param at Using IOS in server");
                return
            }
        }
        const {idFile, offerPercent, offerAmount, maintain } = req.body
        const userData = await User.findById(req.token_info._id)
        .lean()
        .select('privateKey socketID nickName avatar')
        if(!userData){
            return response_express.exception(res, "User not exist!")
        }
        let privateKey = userData.privateKey;
        let wallet = new ethers.Wallet(privateKey, config.provider);
        let contractWithSigner = new ethers.Contract(config.userBehaviorAddress, config.userBehaviorABI, wallet)
        const transaction = await contractWithSigner.usingISO(idFile, offerPercent, offerAmount, maintain)
        if(!transaction){
            return response_express.exception(res, "Transaction not exist!");
        }
        const receipt = await transaction.wait()
        if(receipt.status !== 1){
            return response_express.exception(res, "Receipt not exist!");
        }
        response_express.success(res, receipt.transactionHash)
        const songData = await Music.findOne({idSolidity: idFile})
        .lean()
        .select('userUpload name image')
        if(!songData || songData.userUpload.toString() !== req.token_info._id){
            return response_express.exception(res, "You are not owner of this song or the song not exist!");
        }
        const historyData = {
            senderID: req.token_info._id,
            songID: songData._id,
            contentSender: `Mở tính năng ISO trên tác phẩm \"${songData.name}\" thành công.`,
            type: 3,
            money: maintain,
            songImage: songData.image
        }
        const newHistory = await History.create(historyData)
        socket.to(`${userData.socketID}`).emit('notification', newHistory);
        socket.to(`${songData.userUpload.socketID}`).emit('notification', newHistory);
    } catch (error) {
        return response_express.exception(res, "Another Error " + error)
    } 
}