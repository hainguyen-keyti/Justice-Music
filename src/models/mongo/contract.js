var mongoose = require('mongoose');

var ContractSchema = mongoose.Schema({
    songID : { type: mongoose.Schema.Types.ObjectId, ref: 'Music' },
    contractMoney: {
        type: Number,
        default: 0,
    },

    ownerID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ownerApproved: {
        type: Boolean,
        default: false,
    },
    ownerCompensationAmount: {
        type: Number,
        default: 0,
    },

    signContractorID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    signContractorApproved: {
        type: Boolean,
        default: false,
    },
    signContractorCompensationAmount: {
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
    },
    public: {
        type: Boolean,
        default: false,
    },
});

userSchema.pre('save', next => {
    if(this.isNew || this.isModified) {
        this.date_updated = Date(Date.now());
    }
    return next();
});

module.exports = mongoose.model('Contract', ContractSchema);