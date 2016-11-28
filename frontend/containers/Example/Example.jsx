import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { addCount, getCount } from '../../redux/modules/example.js';
import { asyncConnect } from 'redux-async-connect';


import Helmet from 'react-helmet';

@asyncConnect([{
    promise: ({store: {dispatch, getState}}) => {
        const promises = [];
        promises.push(dispatch(getCount()));
        console.log('in example');
        return Promise.all(promises);
    }
}])
@connect(
    state => ({
        count: state.example.count
    }),
    {
        addCount,
    })
class Example extends Component {

    static propTypes = {
        count: PropTypes.number.isRequired,
        addCount: PropTypes.func.isRequired,
    };

    componentDidMount() {
    }

    render() {
        const styles = require('./Example.css');
        const {count} = this.props;
        return (
            <div className={styles.Example}>
                <Helmet
                    title="Example"/>
                <h1>Example2</h1>
                <h2 className={styles.h2}>H2</h2>
                <div>Count: { count }</div>
            </div>
        );
    }
}

export default Example;
