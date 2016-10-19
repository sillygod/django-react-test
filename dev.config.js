require('babel-polyfill');

var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var assetsPath = path.resolve(__dirname, '../static/dist');  // TODO: need to fix?
var host = (process.env.HOST || 'localhost');
var port = (+process.env.PORT + 1) || 3001;

