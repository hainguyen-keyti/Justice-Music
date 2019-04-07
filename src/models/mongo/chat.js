var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ChatSchema = new mongoose.Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User'},
    receiver:  { type: Schema.Types.ObjectId, ref: 'User'},
    content: {
        type: String,
        trim: true,
    },
    isSeen: {
        type: Boolean,
        default: false,
    },
    _created: {
        type: Date,
        default: Date.now,
    },
    date_updated: {
        type: Date,
        default: Date.now,
    }
});

ChatSchema.pre('save', next => {
    if(this.isNew || this.isModified) {
        this.date_updated = Data.now();
    }
    return next();
});

module.exports = mongoose.models('chat', ChatSchema);