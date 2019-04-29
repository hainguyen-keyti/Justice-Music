const config = require('../../../config');
const express = require('express');

var apiRoutes = express.Router();

apiRoutes.use('/users', require('./user'))

apiRoutes.use(require(config.library_dir + '/middleware').expressMiddleware)

apiRoutes.use('/chats', require('./chat'))

module.exports = apiRoutes;