const config = require('../../../../config')
const Chat = require(config.models_dir + '/mongo/chat')
const response_express = require(config.library_dir + '/response').response_express

module.exports = (req, res) => {
    var message_list_name_senderID = req.body.senderID + req.body.receiverID;
    var message_list_name_receiveID = req.body.receiverID +req.body.senderID;
    Chat.find({$or: [{message_list_name: message_list_name_senderID}, {message_list_name: message_list_name_receiveID}]})
    .then( chat => {
        response_express.success(res, chat)
    })
    .catch(err=>response_express.exception(res, err.message))
}