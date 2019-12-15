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
        console.log(req.params.idContractMongo)
        let miss = lib_common.checkMissParams(res, req.params, ["idContractMongo"])
        if (miss){
            console.log("Miss param at execute contract");
            return;
        }
        const user = await User.findById(req.token_info._id)
        .lean()
        .select('privateKey')
        if(!user){
            return response_express.exception(res, "User not exist!")
        }
        let wallet = new ethers.Wallet(user.privateKey, config.provider);
        let contractWithSigner = new ethers.Contract(config.userBehaviorAddress, config.userBehaviorABI, wallet)
        const transaction = await contractWithSigner.getSongContract(req.params.idContractMongo)
        if(!transaction){
            return Promise.reject("Fail to execute transaction")
        }

        const lala = await lib_common.BigNumberToNumber(transaction)
        console.log(lala)
        // let result = {}
        // Object.getOwnPropertyNames(transaction[0]).map(key=>{
        //     if(Number.isNaN(Number(key))){
        //         console.log(`${key}:${transaction[0][key]}`);
        //         if(typeof(transaction[0][key]) === "object"){
        //             result[key] = Number(transaction[0][key])
        //         }
        //         else{
        //             result[key] = transaction[0][key]
        //         }
        //     }
        // })


        return
        return response_express.success(res, transaction.hash)

    } catch (error) {
        return response_express.exception(res, "Error at execute contract " + error);
    }
} 


