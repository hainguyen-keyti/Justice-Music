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
        .select('privateKey socketID')
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
        console.log(userData.socketID)
        const songData = await Music.findOne({idSolidity: req.body._idFile})
        .lean()
        .select('userUpload')
        if(!songData){
            return response_express.exception(res, "Song not exist!");
        }
        const historyData = {
            senderID: req.token_info._id,
            receiverID: songData.userUpload,
            songID: songData._id,
            content: "Legally registered use of a musical work",
            type: 2,
            money: parseInt(receipt.logs[0].data, 16),
        }
        const newHistory = await History.create(historyData)
        socket.to(userData.socketID).emit('download notification', newHistory);
    } catch (error) {
        return response_express.exception(res, "Another Error " + error)
    }
}