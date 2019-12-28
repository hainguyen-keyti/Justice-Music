var mongoose = require('mongoose');
var HistorySchema = mongoose.Schema({
    senderID: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    receiverID: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    songID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Music',
        require: true,
    },
    content: {
        type: String,
        require: true,
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