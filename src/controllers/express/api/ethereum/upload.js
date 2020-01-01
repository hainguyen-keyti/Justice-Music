const ethers = require('ethers');
const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const User = require(config.models_dir + '/mongo/user');
const History = require(config.models_dir + '/mongo/history');
const Music = require(config.models_dir + '/mongo/music');
// const Notification = require(config.models_dir + '/mongo/notification');

module.exports = async (req, res) => {
    try {
        const user = await User.findById(req.token_info._id)
        .lean()
        .select('privateKey socketID')
        if(!user){
            return response_express.exception(res, "User not exist!")
        }
        const privateKey = user.privateKey;
        req.body.server.userUpload = req.token_info._id
        const music = await Music.create(req.body.server)
        let wallet = new ethers.Wallet(privateKey, config.provider);
        let contractWithSigner = new ethers.Contract(config.userBehaviorAddress, config.userBehaviorABI, wallet)
        contractWithSigner.uploadFile(req.body.ether.hash, req.body.ether.price, 2, music._id.toString())
        .then(async (transaction) => {
            if(!transaction){
                music.deleteOne()
                return response_express.exception(res, "Transaction is null ")
            }
            const receipt = await transaction.wait()
            if(receipt.status !== 1){
                music.deleteOne()
                return response_express.exception(res, "Receipt not exist!");
            }
            const numb = parseInt(receipt.logs[0].data.slice(130), 16) // Get Id from event uploadFile
            Music.updateOne({ _id: music._id }, { $set: { idSolidity: numb } }).exec()
            response_express.success(res, receipt.transactionHash)
            const historyData = {
                senderID: req.token_info._id,
                songID: music._id,
                contentSender: `Đăng ký bản quyền tác phẩm \"${req.body.server.name}\" thành công.`,
                type: 1,
                money: req.body.ether.price,
                songImage: req.body.server.image
            }
            const newHistory = await History.create(historyData)
            socket.to(user.socketID).emit('notification', newHistory);
        })
        .catch( (error) => {
            return response_express.exception(res, "Field to execute transaction: " + error)
        })
    } catch (error) {
        return response_express.exception(res, "Error at database")
    }
}