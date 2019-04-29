const config = require('../../../config');
const Chat = require(config.models_dir + '/mongo/chat');
const User = require(config.models_dir + '/mongo/user');
const response_socketio = require(config.library_dir + '/response').response_socketio;

module.exports = (io) => {
    const nsChat = 'chat';
    const chat = io.of('/' + nsChat);

    chat.use(require(config.library_dir + '/middleware').socketMiddleware);

    chat.on('connection', socket => {
        let decoded_token = socket.handshake.decoded_token;
        console.log(decoded_token.username + " has been connected to socket server with socket ID: " + socket.id)
        User.findOne({_id: decoded_token._id})
        .then( sender => {
            sender.socketID = socket.id;
            sender.save();
        })
        .catch(err => response_socketio(socket, err))

                /**
         * data:
         *  senderID
         *  content
         *  receiverID
         */

        socket.on('chat message', data => {
            console.log('in second message')
            // console.log(data.senderID + "--" + decoded_token._id)
            if(data.senderID !== decoded_token._id){
                console.log("err: user at token and user of client are different")
                response_socketio(socket, "Token and userID are different");
            }

            let message_list_name = data.senderID + data.receiverID;
            console.log(data)
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
                        content: data.content
                    }
                    socket.to(receiver.socketID).emit('chat message', input);
                }
            }).catch(err => response_socketio(socket, err))
        })

        socket.on('first message', data => {
            console.log('in first message')
            // console.log(data.senderID + "--" + decoded_token._id)
            if(data.senderID !== decoded_token._id){
                console.log("err: user at token and user of client are different")
                response_socketio(socket, "Token and userID are different");
            }

            let message_list_name = data.senderID + data.receiverID;
            console.log(data)
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
                        content: data.content
                    }
                    socket.to(receiver.socketID).emit('first message', input);
                }
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
            let messageID = data.messageID

            Chat.findById(messageID)
            .then(chat => {
                chat.isSeen = true
                chat.save();
            })
            .catch(err => response_socketio(socket, err))
            User.findOne({_id: data.receiverID})
            .then( receiver => {
                let seenMsg = "true"
                if(receiver.socketID){
                    socket.to(receiver.socketID).emit('is seen', seenMsg);
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
            console.log(decoded_token.username + " has been disconnected ")
        });
    })
}