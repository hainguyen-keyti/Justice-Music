const ethers = require('ethers');
const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const User = require(config.models_dir + '/mongo/user');
const Music = require(config.models_dir + '/mongo/music');
const History = require(config.models_dir + '/mongo/history');
const lib_common = require(config.library_dir + '/common');

module.exports = async (req, res) => {
    try {
        if(req.body._idFile !== 0){
            let miss = lib_common.checkMissParams(res, req.body, ["_idFile"])
            if (miss){
                console.log("Miss param at download");
                return
            }
        }
        const userData = await User.findById(req.token_info._id)
        .lean()
        .select('privateKey socketID nickName avatar')
        if(!userData){
            return response_express.exception(res, "User not exist!")
        }
        const songData = await Music.findOne({idSolidity: req.body._idFile})
        .lean()
        .select('userUpload name image')
        .populate('userUpload', ['socketID', 'nickName'])
        if(!songData || songData.userUpload._id.toString() === req.token_info._id){
            return response_express.exception(res, "You can not use copyright register this song or the song not exist!");
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
        response_express.success(res, receipt.transactionHash);

        if(receipt.events.length === 2){
        const cost = parseInt(receipt.logs[0].data, 16);
        const historyData = {
            senderID: req.token_info._id,
            receiverID: songData.userUpload._id,
            songID: songData._id,
            contentSender: `Đăng ký tác quyền bài \"${songData.name}\" của \"${songData.userUpload.nickName}\".`,
            contentReceiver: `\"${userData.nickName}\" đã đăng ký tác quyền bài \"${songData.name}\".`,
            type: 2,
            money: cost,
            senderAvatar: userData.avatar,
            songImage: songData.image
        }
        const newHistory = await History.create(historyData)
        socket.to(`${userData.socketID}`).emit('notification', newHistory);
        socket.to(`${songData.userUpload.socketID}`).emit('notification', newHistory);
        return
        }

        const senderData = {
            senderID: req.token_info._id,
            songID: songData._id,
            contentSender: `Đăng ký tác quyền bài \"${songData.name}(ISO)\" của \"${songData.userUpload.nickName}\".`,
            type: 2,
            money: Number(receipt.events[0].data),
            songImage: songData.image
        }
        const senderHistory = await History.create(senderData)
        socket.to(`${userData.socketID}`).emit('notification', senderHistory);

        Promise.all(receipt.events.map(async record => {
            try {
                if(record.topics[1] && record.topics[1].slice(26).padStart(42, '0x') === config.userBehaviorAddress.toLowerCase()){
                    const addressTemp = record.topics[2].slice(26).padStart(42, '0x')
                    const userTemp = await User.findOne({addressEthereum: addressTemp}).collation({locale:'en',strength:2}).lean().select('socketID')
                    console.log(userTemp)
                    const historyData = {
                        receiverID: userTemp._id,
                        songID: songData._id,
                        contentReceiver: `Nhận lại lợi nhuận từ ISO của tác phẩm\"${songData.name}\".`,
                        type: 5,
                        money: Number(record.data),
                        songImage: songData.image
                    }
                    const newHistory = await History.create(historyData)
                    socket.to(`${userTemp.socketID}`).emit('notification', newHistory);
                }
            } catch (error) {
                console.log('Error at event iso ' + error)
            }
        }))
    } catch (error) {
        return response_express.exception(res, "Another Error " + error)
    }
}