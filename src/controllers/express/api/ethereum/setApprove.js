const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const Contract = require(config.models_dir + '/mongo/contract');
const User = require(config.models_dir + '/mongo/user');
const lib_common = require(config.library_dir+'/common');
const History = require(config.models_dir + '/mongo/history');
const getHashIPFS = require(config.library_dir + '/ipfs').getHashIPFS
const ethers = require('ethers');
const moment = require('moment');

module.exports = async (req, res) => {
    try {
        let miss = lib_common.checkMissParams(res, req.body, ["idContractMongo"])
        if (miss){
            console.log("Miss param at execute contract");
            return;
        }
        const contractInfo = await Contract.findById(req.body.idContractMongo)
        .select('whoExecuted ownerID signerID songID nameContractForm')
        .populate('ownerID', ['socketID'])
        .populate('signerID', ['socketID'])
        .populate('songID', ['image'])
        console.log(contractInfo)
        if(req.token_info._id === contractInfo.whoExecuted ||
                !(
                    req.token_info._id === contractInfo.ownerID._id.toString() ||
                    req.token_info._id === contractInfo.signerID._id.toString()
                )
            ){
            return Promise.reject("You can not execute this transaction!")
        }
        const user = await User.findById(req.token_info._id)
        .lean()
        .select('privateKey')
        if(!user){
            return response_express.exception(res, "User not exist!")
        }
        let wallet = new ethers.Wallet(user.privateKey, config.provider);
        let contractWithSigner = new ethers.Contract(config.userBehaviorAddress, config.userBehaviorABI, wallet)
        const transaction = await contractWithSigner.setApproved(req.body.idContractMongo)
        if(!transaction){
            return Promise.reject("Fail to execute transaction (Please check your wallet)")
        }
        Object.assign(contractInfo, {isConfirmContract: true})
        contractInfo.save()
        response_express.success(res, transaction.hash)
        const historyData = {
            senderID: req.token_info._id,
            receiverID: req.token_info._id === contractInfo.ownerID._id.toString() ? contractInfo.signerID._id : contractInfo.ownerID._id,
            songID: contractInfo.songID._id,
            contentSender: `Confirm \"${contractInfo.nameContractForm}\" trên Blockchain thành công.`,
            contentReceiver: `\"${contractInfo.nameContractForm}\" đã được Confirm trên Blockchain.`,
            type: 8,
            songImage: contractInfo.songID.image
        }
        const newHistory = await History.create(historyData)
        socket.to(`${contractInfo.ownerID.socketID}`).emit('notification', newHistory);
        socket.to(`${contractInfo.signerID.socketID}`).emit('notification', newHistory);

    } catch (error) {
        return response_express.exception(res, "Error at execute contract " + error);
    }
} 


