const config = require('../../../config');
const Chat = require(config.models_dir + '/mongo/chat');
const User = require(config.models_dir + '/mongo/user');
const History = require(config.models_dir + '/mongo/history');
const response_socketio = require(config.library_dir + '/response').response_socketio;

module.exports = (io) => {
    const nsChat = 'chat';
    const chat = io.of('/' + nsChat);
    global.socket = chat
    chat.use(require(config.library_dir + '/middleware').socketMiddleware);
    chat.on('connection', socket => {
        let decoded_token = socket.handshake.decoded_token;
        if(!decoded_token)
            return;
        console.log(decoded_token.email + " has been connected to socket server with socket ID: " + socket.id)
        User.findOne({_id: decoded_token._id})
        .then( sender => {
            sender.socketID = socket.id;
            sender.save();
        })
        .catch(err => response_socketio(socket, err))
        
        // socket.to(receiver.socketID).emit('chat message', input);

                /**
         * data:
         *  senderID
         *  content
         *  receiverID
         */

        socket.on('chat message', data => {
            if(!data.receiverID)
                return response_socketio(socket, "Have you choose friend to chat yet?")
            if(data.senderID !== decoded_token._id){
                response_socketio(socket, "Token and userID are different");
                return;
            }

            let message_list_name = data.senderID + data.receiverID;
            Chat.create(data)
            .then((chat)=>{
                chat.message_list_name = message_list_name;
                chat.save();
            }).catch(err => response_socketio(socket, err))
            User.findOne({_id: data.receiverID})
            .then( receiver => {
                if(receiver.socketID){
                    var input = {
                        senderID: data.senderID,
                        receiverID: data.receiverID,
                        content: data.content
                    }
                    socket.to(receiver.socketID).emit('chat message', input);
                }
            }).catch(err => response_socketio(socket, err))
        })

        socket.on('first message', data => {
            if(!data.receiverID)
                return response_socketio(socket, "Have you choose friend to chat yet?");
            if(data.senderID !== decoded_token._id){
                response_socketio(socket, "Token and userID are different");
                return;
            }
            let message_list_name = data.senderID + data.receiverID;
            Chat.create(data)
            .then((chat)=>{
                chat.message_list_name = message_list_name;
                chat.save();
            }).catch(err => response_socketio(socket, err))
            User.findOne({_id: data.receiverID})
            .then( receiver => {
                receiver.personInbox.push(data.senderID);
                receiver.save();
                if(receiver.socketID){
                    var input = {
                        senderID: data.senderID,
                        receiverID: data.receiverID,
                        content: data.content
                    }
                    socket.to(receiver.socketID).emit('first message', input);
                }
                socket.emit('return friend')
            }).catch(err => response_socketio(socket, err))

            User.findOne({_id: data.senderID})
            .then( sender => {
                sender.personInbox.push(data.receiverID);
                sender.save();
            }).catch(err => response_socketio(socket, err))
        })

        /**
         * data:
         *  messageID
         *  receiverID
         */
        socket.on('is seen', data => {
            var message_list_name_senderID = data.senderID + data.receiverID;
            var message_list_name_receiveID = data.receiverID + data.senderID;
            Chat.updateMany({ $or: [{message_list_name: message_list_name_senderID}, {message_list_name: message_list_name_receiveID}]}, { $set: { isSeen: true}})
            .catch(err => response_socketio(socket, err))

            User.findOne({_id: data.senderID})
            .then( sender => {
                if(sender.socketID){
                    socket.to(sender.socketID).emit('is seen');
                }
            })
            .catch(err => response_socketio(socket, err))
            
        })

        socket.on('typing', data => {
            User.findOne({_id: data.receiverID})
            .then( sender => {
                if(sender.socketID){
                    if(data.isTyping === true){
                        socket.to(sender.socketID).emit('typing', {senderID: data.senderID ,isTyping: true});
                    }
                    else{
                        socket.to(sender.socketID).emit('typing', {senderID: data.senderID ,isTyping: false});
                    }
                }
            })
            .catch(err => response_socketio(socket, err))

        })

        socket.on('disconnect', () => {
            User.findOne({socketID: socket.id})
            .then( user => {
                user.socketID = '';
                user.save();
            })
            .catch(err => response_socketio(socket, err))
            console.log(decoded_token.email + " has been disconnected ")
        });

        socket.on('notification_seen', data => {
            History.findById(data.id).then( history => {
                history.isSeen = true;
                history.save();
            })
            .catch(err => response_socketio(socket, err))
        })
    })
}