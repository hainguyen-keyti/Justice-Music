var mongoose = require('mongoose');

var MusicSchema = mongoose.Schema({
    hash: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
        trim: true,
    },
    view: {
        type: Number,
        default: 0,
    },
    name: {
        type: String,
    },
    artist: {
        type: String,
        require: true,
    },
    tags: {
        type: [String],
    },
    contractPermission: {
        type: Boolean,
        default: true,
    },
});

MusicSchema.pre('save', next => {
    if(this.isNew || this.isModified) {
        this.date_updated = Date(Date.now());
    }
    return next();
});

module.exports = mongoose.model('Music', MusicSchema);