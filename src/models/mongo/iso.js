var mongoose = require('mongoose');
// Test,temp
var ISOSchema = mongoose.Schema({
    idSolidity: {
        type: String,
        trim: true,
    },
    hash: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
        trim: true,
        default: "QmYkHh3Q7sRYWnY4sGo2Q2C3UGPgqdGn8fPcFz4ouLT8KL"
    },
    view: {
        type: Number,
        default: 0,
    },
    songName: {
        type: String,
    },
    artistAddress: {
        type: String,
        require: true,
    },
    tags: {
        type: [String],
    },
});

ISOSchema.pre('save', next => {
    if(this.isNew || this.isModified) {
        this.date_updated = Date(Date.now());
    }
    return next();
});

module.exports = mongoose.model('ISO', ISOSchema);