const config = require('../../../../config');
const express = require('express');

var userActionRoutes = express.Router();

userActionRoutes.post('/updateUser', require('./updateUser'))

userActionRoutes.get('/userPage', require('./getPageUser'))

userActionRoutes.get('/getSongByID', require('./getSongByID'))

userActionRoutes.post('/follow', require('./follow'))

userActionRoutes.post('/postLyric', require('./postLyric'))

userActionRoutes.get('/getHomeSongs', require('./getHomeSongs'))

userActionRoutes.get('/getHotUsers', require('./getHotUsers'))

userActionRoutes.get('/getSongSameSinger', require('./getSongSameSinger'))

userActionRoutes.get('/getRelatedUser', require('./getRelatedUser'))

userActionRoutes.get('/getUserTemplateContract', require('./getUserTemplateContract'))


userActionRoutes.post('/createTemplateContract', require('./createTemplateContract'))

userActionRoutes.post('/createContract', require('./createContract'))


module.exports = userActionRoutes;