import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import compression from 'compression';
import httpProxy from 'http-proxy';

import path from 'path';
import createStore from '/.refux/create';
import Html from './helpers/Html';
import http from 'http';

import { match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import {Provider} from 'react-redux';
import getRoutes from './routes';
import config from './config';


const targetUrl = 'http://' + config.apiHost + ':' + config.apiPort;
const app = new Express();
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer({
    target: targetUrl,
    ws: true
});


app.use(compression());
app.use(Express.static(path.join(__dirname, './public')));

app.use('/api', (req, res)=>{
    proxy.web(req, res, {target: targetUrl});
});

app.use('/ws', (req,res)=>{
    proxy.web(req, res, {target: targetUrl + '/ws'});
});

server.on('upgrade', (req, socket, head) =>{
    proxy.ws(req, socket, head);
});

