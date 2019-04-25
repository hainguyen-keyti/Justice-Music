var express = require('express');
var app = express();
var config = require('../config');
var helmet = require('helmet');
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

const start = () => {
    return new Promise((resolve, reject) => {
        app.use(helmet())
        app.use(cors())
        app.use(bodyParser.urlencoded({
            extended: false
        }))
        app.use(bodyParser.json({
            limit: '50mb',
            type: ['application/json', 'text/plain']
        }))
        app.use((err, req, res, next) => {
            reject(new Error("Something went wrong!, err: " + err))
            res.status(500).send("Something went wrong!")
        })
        app.use((req, res, next) => {
            req.body = JSON.parse(JSON.stringify(req.body))
            req.query = JSON.parse(JSON.stringify(req.query))
            next();
        })
        app.use('/', require(config.controllers_dir + '/express'));

        //-----
        app.get('/web', function(req, res){
            res.sendFile(__dirname + '/index.html');
        });
        io.on('connection', function(socket){
            console.log(socket.handshake + ' has connected (socket_id: ' + socket.id + ')');
        });
          

        const server = http.listen(config.port, config.host, () => resolve(server));

    })
}
module.exports = {start};