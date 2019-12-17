var mongoose = require('mongoose');

var templateContractSchema = mongoose.Schema({
    ownerID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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
    nameContractForm: {
        type: String,
    }
});

templateContractSchema.pre('save', next => {
    if(this.isNew || this.isModified) {
        this.date_updated = Date(Date.now());
    }
    return next();
});

module.exports = mongoose.model('TemplateContract', templateContractSchema);