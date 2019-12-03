var mongoose = require('mongoose');

var FollowSchema = mongoose.Schema({
    followedID: {
        type: String,
        trim: true,
    },
    userID: {
        type: String,
        trim: true,
    },
    date_created: {
        type: Date,
        default: Date(Date.now()),
    },
});

module.exports = mongoose.model('Follow', FollowSchema);