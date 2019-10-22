const config = require('../../../../config');
const express = require('express');

var userRoutes = express.Router();

userRoutes.post('/create', require('./create'))

userRoutes.post('/login', require('./login'))

userRoutes.get('/find', require('./find'))

userRoutes.post('/upload', require('./uploadFile'))

module.exports = userRoutes;