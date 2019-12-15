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
        .lean()
        .select('songID _id content contractMoney ownerID ownerCompensationAmount signerID signerCompensationAmount timeExpired ownerApproved signerApproved')
        .populate('ownerID', ['addressEthereum'])
        .populate('signerID', ['addressEthereum'])
        .populate('songID', ['idSolidity', 'hash'])

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
        const _timeExpired = moment().unix() + contractInfo.timeExpired;
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
        return response_express.success(res, transaction.hash)

    } catch (error) {
        return response_express.exception(res, "Error at execute contract " + error);
    }
} 


