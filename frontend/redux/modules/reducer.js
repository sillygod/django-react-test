import { combineReducers } from 'redux';
// import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';


import example from './example.js';
import { reducer as form } from 'redux-form';

export default combineReducers({
    routing: routerReducer,
    reduxAsyncConnect,
    form,
    example,

    // where you might find yourself needing multiple copies of the same reducer
    //
    // multireducer: multireducer({
    //     counter1: counter,
    //     counter2: counter,
    //     counter3: counter
    // }),
});

