const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const Contract = require(config.models_dir + '/mongo/contract');
const User = require(config.models_dir + '/mongo/user');
const lib_common = require(config.library_dir+'/common');
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
        .select('songID _id content contractMoney ownerID ownerCompensationAmount signerID signerCompensationAmount timeAmount ownerApproved signerApproved')
        .populate('ownerID', ['addressEthereum socketID'])
        .populate('signerID', ['addressEthereum socketID'])
        .populate('songID', ['idSolidity', 'hash'])
        if(!(req.token_info._id === contractInfo.ownerID._id.toString() || req.token_info._id === contractInfo.signerID._id.toString())){
            return Promise.reject("You can not execute this transaction!")
        }
        if(!(contractInfo.ownerApproved && contractInfo.signerApproved)){
            return Promise.reject("Error. Both of them must be Approve!")
        }
        const bufContent = Buffer.from(contractInfo.content, 'utf-8');
        const contentHash = await getHashIPFS(bufContent)
        const user = await User.findById(req.token_info._id)
        .lean()
        .select('privateKey')
        if(!user){
            return response_express.exception(res, "User not exist!")
        }
        const _timeExpired = moment().unix() + contractInfo.timeAmount;
        let wallet = new ethers.Wallet(user.privateKey, config.provider);
        let contractWithSigner = new ethers.Contract(config.userBehaviorAddress, config.userBehaviorABI, wallet)
        const transaction = await contractWithSigner.createContract(
            contractInfo.songID.idSolidity, 
            req.body.idContractMongo, 
            contractInfo.songID.hash,
            contentHash,
            contractInfo.contractMoney,
            contractInfo.ownerID.addressEthereum,
            contractInfo.ownerCompensationAmount,
            contractInfo.signerID.addressEthereum,
            contractInfo.signerCompensationAmount,
            _timeExpired
            )
        if(!transaction){
            return Promise.reject("Fail to execute transaction")
        }
        Object.assign(contractInfo, {contentHash, isExecuteContract: true, timeExpired: _timeExpired, whoExecuted: req.token_info._id})
        contractInfo.save()
        response_express.success(res, transaction.hash)
        const historyData = {
            senderID: req.token_info._id,
            receiverID: req.token_info._id === contractInfo.ownerID._id.toString() ? contractInfo.signerID._id : contractInfo.ownerID._id,
            songID: contractInfo.songID._id,
            contentSender: `Tạo hợp đồng \"${contractInfo.nameContractForm}\" với \"${contractInfo.ownerID.nickName}\" thành công.`,
            contentReceiver: `Hợp đồng \"${contractInfo.nameContractForm}\" đã được tạo bởi \"${contractInfo.signerID.nickName}\".`,
            type: 7,
            songImage: ownerID.image
        }
        const newHistory = await History.create(historyData)
        socket.to(`${contractInfo.ownerID.socketID}`).emit('notification', newHistory);
        socket.to(`${contractInfo.signerID.socketID}`).emit('notification', newHistory);


    } catch (error) {
        return response_express.exception(res, "Error at execute contract " + error);
    }
} 


