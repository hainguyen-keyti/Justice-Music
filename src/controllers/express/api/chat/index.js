const config = require('../../../../config');
const express = require('express');

var chatRoutes = express.Router();

chatRoutes.post('/getListMessage', require('./getListMessage'))

chatRoutes.post('/getListFriend', require('./getListFriend'))

module.exports = chatRoutes;