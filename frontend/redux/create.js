import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import createMiddleware from './middleware/clientMiddleware';
import { routerMiddleware } from 'react-router-redux';

export default function createStore(history, client, data){

    const reduxRouterMiddleware = routerMiddleware(history);
    const middleware = [createMiddleware(client), reduxRouterMiddleware];

    let finalCreateStore;

    if(__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__){
        const { persistState } = require('redux-devtools');
        const DevTools = require('../containers/DevTools/DevTools');

        finalCreateStore = compose(
            applyMiddleware(...middleware),
            window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
            persistState(window.location.href.match(/[?&]debug_session=([^&]+\b/))
        )(_createStore);
    }

}
