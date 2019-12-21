const ethers = require('ethers');
const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const User = require(config.models_dir + '/mongo/user');
const Music = require(config.models_dir + '/mongo/music');

module.exports = async (req, res) => {
    try {
        const user = await User.findOne({email: req.token_info.email})
        if(!user){
            return response_express.exception(res, "User not exist!")
        }
        const privateKey = user.privateKey;
        req.body.server.userUpload = req.token_info._id
        const music = await Music.create(req.body.server)
        let wallet = new ethers.Wallet(privateKey, config.provider);
        let contractWithSigner = new ethers.Contract(config.userBehaviorAddress, config.userBehaviorABI, wallet)
        contractWithSigner.uploadFile(req.body.ether.hash, req.body.ether.price, 2, music._id.toString())
        .then( (tx) => {
            if(tx){
                tx.wait().then((getID)=>{
                    let numb = parseInt(getID.logs[0].data.slice(130), 16) // Get Id from event uploadFile
                    Music.updateOne({ _id: music._id }, { $set: { idSolidity: numb } }).exec()
                })
                return response_express.success(res, tx.hash)
            }
        })
        .catch(async (error) => {
            music.deleteOne()
            return response_express.exception(res, "Field to execute transaction: " + error)
        })
    } catch (error) {
        return response_express.exception(res, "Error at database")
    }
}