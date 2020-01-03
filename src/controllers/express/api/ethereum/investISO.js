const ethers = require('ethers');
const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const User = require(config.models_dir + '/mongo/user');
const Music = require(config.models_dir + '/mongo/music');
const History = require(config.models_dir + '/mongo/history');
const lib_common = require(config.library_dir+'/common');

module.exports =async (req, res) => {
    try {
        if(req.body.idFile !== 0){
            let miss = lib_common.checkMissParams(res, req.body, ["idFile", "investAmount"])
            if (miss){
                console.log("Miss param at download");
                return
            }
        }
        const userData = await User.findById(req.token_info._id)
        .lean()
        .select('privateKey socketID nickName avatar addressEthereum')
        if(!userData){
            return response_express.exception(res, "User not exist!")
        }
        let wallet = new ethers.Wallet(userData.privateKey, config.provider);
        let contractWithSigner = new ethers.Contract(config.userBehaviorAddress, config.userBehaviorABI, wallet)
        let balance = await lib_common.getBalance(userData.addressEthereum)
        if(balance.HAK < req.body.investAmount){
            return response_express.exception(res, "Your HAK balance is not enough!")
        }
        const investTransaction = await contractWithSigner.investISO(req.body.idFile, req.body.investAmount)
        if(!investTransaction){
            return response_express.exception(res, "Transaction not exist!");
        }
        const receipt = await investTransaction.wait()
        if(receipt.status !== 1){
            return response_express.exception(res, "Receipt not exist!");
        }
        response_express.success(res, receipt.transactionHash)
        const songData = await Music.findOne({idSolidity: req.body.idFile}).lean().select('userUpload name image').populate('userUpload', ['socketID', 'nickName'])
        const historyData = {
            senderID: req.token_info._id,
            receiverID: songData.userUpload._id,
            songID: songData._id,
            contentSender: `Đầu tư ISO vào tác phẩm \"${songData.name}\" thành công.`,
            contentReceiver: `Tác phẩm \"${songData.name}\" đã được \"${userData.nickName}\" đầu tư ISO.`,
            type: 4,
            money: req.body.investAmount,
            senderAvatar: userData.avatar,
            songImage: songData.image,
        }
        const newHistory = await History.create(historyData)
        socket.to(`${userData.socketID}`).emit('notification', newHistory);
        socket.to(`${songData.userUpload.socketID}`).emit('notification', newHistory);
    } catch (error) {
        return response_express.exception(res, "Another Error " + error)
    }
}