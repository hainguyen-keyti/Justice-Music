const ethers = require('ethers');
const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const User = require(config.models_dir + '/mongo/user');
const Music = require(config.models_dir + '/mongo/music');

module.exports = async (req, res) => {
    let tempMusicID;
    let privateKey;
    User.findOne({email: req.token_info.email})
    .then(user => {
        if(!user){
            return response_express.exception(res, "User not exist!")
        }
        privateKey = user.privateKey;
        return Music.create(req.body.server)
    })
    .then(music => {
        console.log(music)
        let wallet = new ethers.Wallet(privateKey, config.provider);
        let contractWithSigner = new ethers.Contract(config.userBehaviorAddress, config.userBehaviorABI, wallet)
        tempMusicID = music._id;
        console.log("hahhahahah")
        return contractWithSigner.uploadFile(req.body.ether.hash, req.body.ether.price, 2, music._id.toString())
    })
    .then(tx => {
        if(!tx)
            return Promise.reject("Field to excute transaction");
        response_express.success(res, tx.hash)
        tx.wait().then((getID)=>{
            let numb = parseInt(getID.logs[0].data.slice(130), 16) // Get Id from event uploadFile
            console.log(numb)
            Music.updateOne({ _id: tempMusicID }, { $set: { idSolidity: numb } }).exec()
        })
    })
    .catch(err => {response_express.exception(res, JSON.parse(err.responseText).error.message)
    })
}