const express = require('express');
const app = express();
const config = require('../config');
const helmet = require('helmet');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const start = () => {
    return new Promise((resolve, reject) => {
        app.use(fileUpload({
            createParentPath: true
        }));
        
        app.use(helmet())
        app.use(cors())
        app.use(bodyParser.urlencoded({
            extended: false
        }))
        app.use(bodyParser.json({
            limit: '50mb',
            type: ['application/json', 'text/plain']
        }))
        app.use(express.static(config.web_dir+"/build"));
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
        app.get('*', (req, res) => {
			res.sendFile(path.join(config.web_dir+"/build/index.html"));
		})
		

        require(config.controllers_dir + '/socketio/notification')(io)
        require(config.controllers_dir + '/socketio/chat')(io)
          

        const server = http.listen(process.env.PORT || config.port, config.host, () => resolve(server));

    })
}
module.exports = {start};