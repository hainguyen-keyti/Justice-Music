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
        const user = await User.findById(req.token_info._id)
        .lean()
        .select('privateKey addressEthereum')
        if(!user){
            return response_express.exception(res, "User not exist!")
        }
        let wallet = new ethers.Wallet(user.privateKey, config.provider);
        let contractWithSigner = new ethers.Contract(config.userBehaviorAddress, config.userBehaviorABI, wallet)
        const transaction = await contractWithSigner.getSignerContractList(user.addressEthereum)
        if(!transaction){
            return Promise.reject("Fail to execute transaction")
        }
        const arrTemp = Array.from(new Set(transaction));
        let result = []
        
        await Promise.all(arrTemp.map( async record => {
            const temp = await contractWithSigner.getSongContract(record)
            if(!temp){
                return Promise.reject("Fail to get contract!")
            }
            const data = await lib_common.BigNumberToNumber(temp)
            result.push(data)
        }))
        return response_express.success(res, result)
    } catch (error) {
        return response_express.exception(res, "Error at execute contract " + error);
    }
} 


