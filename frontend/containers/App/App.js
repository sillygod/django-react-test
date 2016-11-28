import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { isLoaded as isUserLoaded, load as loadUser } from '../../redux/modules/example.js';

import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
    promise: ({store: {dispatch, getState}}) => {
        const promises = [];

        if(!isUserLoaded(getState())) {
            promises.push(dispatch(loadUser()));
        }

        return Promise.all(promises);
    }
}])
@connect(
    // mapStateToProps
    state => ({
        user: state.example.user,
    }),
    {   // mapDispatchToProps
        // If an object is passed, each function inside it will be assumed to be a Redux action creator. An object with the same function names, but with every action creator wrapped into a dispatch call so they may be invoked directly, will be merged into the component’s props.
        pushState: push
    })
export default class App extends Component {
    static propTypes = {
        children: PropTypes.object,
        user: PropTypes.object,
        pushState: PropTypes.func.isRequired
    };

    static contextTypes = {
        store: PropTypes.object.isRequired
    };

    render() {
        const styles = require('./App.css');
        return (
            <div className={styles.app}>
                {/* initial header */}
                <Helmet {...config.app.head} />
                {this.props.children}
            </div>
        );
    }
}
