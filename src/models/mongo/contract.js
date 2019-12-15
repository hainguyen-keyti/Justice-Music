var mongoose = require('mongoose');

var ContractSchema = mongoose.Schema({
    songID : { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'Music' },
    contractMoney: {
        type: Number,
        default: 0,
    },
    ownerID: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'User' },
    ownerApproved: {
        type: Boolean,
        default: false,
    },
    ownerCompensationAmount: {
        type: Number,
        default: 0,
    },
    signerID: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'User' },
    signerApproved: {
        type: Boolean,
        default: false,
    },
    signerCompensationAmount: {
        type: Number,
        default: 0,
    },

    date_created: {
        type: Date,
        default: Date(Date.now()),
    },
    date_updated: {
        type: Date,
        default : Date(Date.now()),
    },
    content: {
        type: String,
        require: true,
    },
    isPublic: {
        type: Boolean,
        default: true,
    },
    timeExpired: {
        type: Number
    },
    isCancel: {
        type: Boolean,
        default: false,
    },
});

ContractSchema.pre('save', next => {
    if(this.isNew || this.isModified) {
        this.date_updated = Date(Date.now());
    }
    return next();
});

module.exports = mongoose.model('Contract', ContractSchema);