#!/usr/bin/node

require('../server.babel');
var path = require('path');
var rootDir = path.resolve(__dirname, '..');

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;  // disable server side rendering for error debugging
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';


if(__DEVELOPMENT__){
    if(!require('piping')({
        hook: true,
        ignore: /(\/\.|~$\.json|\.scss$)/i
    })) {
        return;
    }
}

var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack-isomorphic-settings'))
    // .development(__DEVELOPMENT__) //it will break mac server render when require css
    .server(rootDir, function(){
        require('../frontend/server');
    });
