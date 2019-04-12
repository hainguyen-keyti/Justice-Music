const config = require('../../../config');
const express = require('express');

var apiRoutes = express.Router();

apiRoutes.use('/users', require('./user'))

module.exports = apiRoutes;