import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isUserLoaded, load as loadUser } from './redux/modules/example.js';
import Example from './containers/Example/Example.jsx';

import {
    App,
    Chat,
    NotFound
} from './containers';


export default (store) => {
    const requireLogin = (nextState, replace, cb) => {
        function checkAuth() {
            const { auth: {user}} = store.getState();

            if(!user) {
                replace('/');
            }

            cb();
        }
        if(!isUserLoaded(store.getState())) {
            store.dispatch(loadUser()).then(checkAuth);
        } else {
            checkAuth();
        }
    };

    return (
        <Route path="/" component={App}>
            <IndexRoute component={Example} />

            {/*
            <Route onEnter={requireLogin}>
                <Route path="chat" component={Chat}/>
            </Route>
            */}

            <Route path="*" component={NotFound} status={404} />
        </Route>
    );

};

