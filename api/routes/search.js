'use strict'

var express = require('express');
var SearchController = require('../controllers/search');

var api = express.Router();
var md_auth = require('../middelware/authenticated');

var multipart = require('connect-multiparty');


api.get('/album-search/:param?',md_auth.ensureAuth, SearchController.albumSearch);
api.get('/artist-search/:param?',md_auth.ensureAuth, SearchController.artistSearch);
api.get('/song-search/:param?',md_auth.ensureAuth, SearchController.songSearch);

module.exports = api;