const config = require('../../../../config');
const express = require('express');

var userActionRoutes = express.Router();

userActionRoutes.post('/updateUser', require('./updateUser'))

userActionRoutes.get('/userPage', require('./getPageUser'))

userActionRoutes.get('/getSongByID', require('./getSongByID'))

userActionRoutes.post('/follow', require('./follow'))



module.exports = userActionRoutes;