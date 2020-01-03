var mongoose = require('mongoose');
var HistorySchema = mongoose.Schema({
    senderID: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    receiverID: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    songID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Music',
        require: true,
    },
    contentSender: {
        type: String,
        default: '',
    },
    contentReceiver: {
        type: String,
        default: '',
    },
    senderAvatar: {
        type: String,
        default: '',
    },
    songImage: {
        type: String,
        default: '',
    },
    money: {
        type: Number,
        default: 0,
    },
    type: {
        type: Number, // 1: upload, 2: download, 3: ISO
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    isSeen: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('History', HistorySchema);