const ethers = require('ethers');
const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const User = require(config.models_dir + '/mongo/user');
const Music = require(config.models_dir + '/mongo/music');
const History = require(config.models_dir + '/mongo/history');
const lib_common = require(config.library_dir + '/common');

module.exports = async (req, res) => {
    try {
        let miss = lib_common.checkMissParams(res, req.body, ["_idFile"])
        if (miss){
            console.log("Miss param at download");
            return
        }
        const userData = await User.findById(req.token_info._id)
        .lean()
        .select('privateKey socketID nickName')
        if(!userData){
            return response_express.exception(res, "User not exist!")
        }
        let wallet = new ethers.Wallet(userData.privateKey, config.provider);
        let contractWithSigner = new ethers.Contract(config.userBehaviorAddress, config.userBehaviorABI, wallet)
        const transaction = await contractWithSigner.dowloadFile(req.body._idFile)
        if(!transaction){
            return response_express.exception(res, "Transaction not exist!");
        }
        const receipt = await transaction.wait()
        if(receipt.status !== 1){
            return response_express.exception(res, "Receipt not exist!");
        }
        response_express.success(res, receipt.transactionHash)
        const songData = await Music.findOne({idSolidity: req.body._idFile})
        .lean()
        .select('userUpload name')
        .populate('userUpload', ['socketID', 'nickName'])
        if(!songData){
            return response_express.exception(res, "Song not exist!");
        }
        const cost = parseInt(receipt.logs[0].data, 16); 
        const historyData = {
            senderID: req.token_info._id,
            receiverID: songData.userUpload._id,
            songID: songData._id,
            contentSender: `Đăng ký tác quyền bài \"${songData.name}\" của \"${songData.userUpload.nickName}\" bị trừ ${cost} HAK`,
            contentReceiver: `\"${userData.nickName}\" đã đăng ký tác quyền bài \"${songData.name}\" được cộng ${cost} HAK`,
            type: 2,
            money: cost
        }
        const newHistory = await History.create(historyData)
        console.log(userData.socketID)
        console.log(songData.userUpload.socketID)
        socket.emit('notification', newHistory);
        socket.to(songData.userUpload.socketID).emit('notification', newHistory);
    } catch (error) {
        return response_express.exception(res, "Another Error " + error)
    }
}