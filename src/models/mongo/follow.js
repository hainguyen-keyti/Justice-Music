var mongoose = require('mongoose');

var FollowSchema = mongoose.Schema({
    followedID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
    },
});

module.exports = mongoose.model('Follow', FollowSchema);