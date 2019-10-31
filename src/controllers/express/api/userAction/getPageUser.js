const ethers = require('ethers');
const config = require('../../../../config');
const response_express = require(config.library_dir + '/response').response_express;
const lib_common = require(config.library_dir+'/common');
const User = require(config.models_dir + '/mongo/user');

module.exports = async (req, res) => {
    User.findOne({$or: [
        {userName: req.query.userName},
        {addressEthereum: req.query.userName}
    ]})
    .then(user => {
        if(!user){
            return response_express.exception(res, "User not exist!")
        }

        const {nickName, phone, avatar, addressEthereum, folow, otherInfomaion } = user

        const data = {
            nickName, 
            phone, 
            avatar, 
            addressEthereum, 
            folow, 
            otherInfomaion
        }
        return response_express.success(res, data) 
    })
    .catch(err => response_express.exception(res, err));
}