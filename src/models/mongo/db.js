var mongoose = require('mongoose');

const connect = () => {
    return new Promise((resolve, reject) => {
        const uri = "mongodb+srv://keyti:Haiktvn1.@chat-realtime-qpdid.mongodb.net/test?retryWrites=true"
        mongoose.connect(uri, {useNewUrlParser: true, dbName: 'chatOnline'});
        mongoose.Promise = global.Promise;
        var connection = mongoose.connection;
        connection.on('error', err => reject(err));
        connection.on('connected', () => resolve());
    });
}

const close = () => {
    return mongoose.connection.close();
}

module.exports = {connect, close};