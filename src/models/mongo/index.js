const config = require('../../config')
var mongoose = require('mongoose');

const connect = () => {
    return new Promise((resolve, reject) => {
        var uri = "mongodb://" + config.mongo.host + ":" + config.mongo.port + "/" + config.mongo.database; // local
        if(config.mongo.user){
            uri = "mongodb+srv://" + config.mongo.user + ":" + config.mongo.password + "@" + config.mongo.host; // online
            console.log(uri)
        }
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
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