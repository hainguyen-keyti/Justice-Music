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
        // response_express.success(res, receipt.transactionHash)
        Promise.all(receipt.events.map(async record => {
            try {
                if(record.topics[1] && record.topics[1].slice(26).padStart(42, '0x') === '0x2b9daf86494281c93ee3c895bd94ec0f6446220a'){
                    const addressTemp = await record.topics[2].slice(26).padStart(42, '0x')
                    console.log(addressTemp.toUpperCase())    
                    User.findOne({addressEthereum: '0x38F01a252ac6D7D447f84ED6F34Ff7Fe624EFe48'})
                    .then(user => {console.log(user)})
                    // const userTemp = await User.find({addressEthereum: addressTemp})
                    //     console.log(userTemp)
                    //     const historyDataTemp = {
                    //         senderID: songData.userUpload._id,
                    //         receiverID: userTemp._id,
                    //         songID: songData._id,
                    //         contentReceiver: `Nhận lại lợi nhuận từ ISO của tác phẩm\"${songData.name}\".`,
                    //         type: 5,
                    //         money: Number(record.data),
                    //         songImage: songData.image
                    //     }
                    //     console.log(historyDataTemp)
                }
            } catch (error) {
                console.log('loi roi ' + error)
            }
        }))
        
        // const cost = parseInt(receipt.logs[0].data, 16);
        // console.log(receipt.events[0].topics[1].slice(26).padStart(42, '0x'))
        // const isoData = await lib_common.getSongByIdMongo(songData._id, req.token_info._id)
        // // console.log(isoData)
        // const historyData = {
        //     senderID: req.token_info._id,
        //     receiverID: songData.userUpload._id,
        //     songID: songData._id,
        //     contentSender: `Đăng ký tác quyền bài \"${songData.name}\" của \"${songData.userUpload.nickName}\".`,
        //     contentReceiver: `\"${userData.nickName}\" đã đăng ký tác quyền bài \"${songData.name}\".`,
        //     type: 2,
        //     money: cost,
        //     senderAvatar: userData.avatar,
        //     songImage: songData.image
        // }
        // const newHistory = await History.create(historyData)
        // socket.to(`${userData.socketID}`).emit('notification', newHistory);
        // socket.to(`${songData.userUpload.socketID}`).emit('notification', newHistory);
    } catch (error) {
        return response_express.exception(res, "Another Error " + error)
    }
}