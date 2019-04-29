var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true,
        lowercase: true,
        index: {
            unique: true,
            partialFilterExpression: { username: {$type: 'string'}}
        }
    },
    full_name: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
        index: {
            unique: true,
            partialFilterExpression: {phone: {$type: 'string'}}
        }
    },
    is_confirm_email: {
        type: Boolean,
        default: false,
    },
    password_hash: {
        type: String,
        trim: true,
        require: true,
    },
    status_id: {
        type: Number,
        default: 1,
    },
    avatar: {
        type: String,
        trim: true,
    },
    birthday: {
        type: Date,
    },
    genre: {
        type: Number,
        default: 1, // 1 nam, 2 nu
    },
    date_created: {
        type: Date,
        default: Date.now,
    },
    date_updated: {
        type: Date,
        default : Date.now,
    },
    socketID: {
        type: String,
        trim: true,
    },
    refreshToken: {
        type: String,
        trim: true,
    },
    personInbox: [String],
});

userSchema.pre('save', next => {
    if(this.isNew || this.isModified) {
        this.date_updated = Date.now();
    }
    return next();
});

module.exports = mongoose.model('User', userSchema);