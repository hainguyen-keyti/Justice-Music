const ethers = require('ethers');
const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const User = require(config.models_dir + '/mongo/user');
const Music = require(config.models_dir + '/mongo/music');
// const Notification = require(config.models_dir + '/mongo/notification');

module.exports = async (req, res) => {
    try {
        const user = await User.findById(req.token_info._id)
        if(!user){
            return response_express.exception(res, "User not exist!")
        }
        const privateKey = user.privateKey;
        req.body.server.userUpload = req.token_info._id
        const music = await Music.create(req.body.server)
        let wallet = new ethers.Wallet(privateKey, config.provider);
        let contractWithSigner = new ethers.Contract(config.userBehaviorAddress, config.userBehaviorABI, wallet)
        contractWithSigner.uploadFile(req.body.ether.hash, req.body.ether.price, 2, music._id.toString())
        .then(async (tx) => {
            
            if(!tx){
                return response_express.exception(res, "Transaction is null ")
            }
            
            const receipt = await tx.wait()
            const numb = parseInt(receipt.logs[0].data.slice(130), 16) // Get Id from event uploadFile
            // const dataNotification = {
            //     userID: req.token_info._id,
            //     content: req.body.server.name + " - Copyright registration is successful",
            //     link: `song/${music._id}`,
            // }
            const promises = [
                Music.updateOne({ _id: music._id }, { $set: { idSolidity: numb } }).exec(),
                // Notification.create(dataNotification)
            ]
            
            await Promise.all(promises)
            
            return response_express.success(res, tx.hash)
        })
        .catch( (error) => {
            music.deleteOne()
            return response_express.exception(res, "Field to execute transaction: " + error)
        })
    } catch (error) {
        return response_express.exception(res, "Error at database")
    }
}