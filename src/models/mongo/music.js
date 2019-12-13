var mongoose = require('mongoose');

var MusicSchema = mongoose.Schema({
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
    },
    view: {
        type: Number,
        default: 0,
    },
    name: {
        type: String,
    },
    lyric: {
        type: String,
        default: "This song not update lyric yet.",
    },
    artist: {
        type: String,
        require: true,
    },
    userUpload: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    tags: {
        type: [String],
    },
    contractPermission: {
        type: Boolean,
        default: true,
    },
    date: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
    },
});

MusicSchema.pre('save', next => {
    if(this.isNew || this.isModified) {
        this.date_updated = Date(Date.now());
    }
    return next();
});

module.exports = mongoose.model('Music', MusicSchema);