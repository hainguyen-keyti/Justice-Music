const config = require('../../../../config');
const express = require('express');

var userActionRoutes = express.Router();

userActionRoutes.post('/updateUser', require('./updateUser'))
userActionRoutes.get('/userPage', require('./getPageUser'))

module.exports = userActionRoutes;