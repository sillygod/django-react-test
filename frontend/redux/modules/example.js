const LOAD = 'redux-example/example/LOAD';
const LOAD_SUCCESS = 'redux-example/example/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/example/LOAD_FAIL';

const GET_COUNT_START = 'redux-example/example/GET_COUNT_START';
const GET_COUNT_SUCCESS = 'redux-example/example/GET_COUNT_SUCCESS';
const GET_COUNT_FAIL = 'redux-example/example/GET_COUNT_FAIL';

const COUNT_ADD = 'redux-example/example/COUNT_ADD';

const initialState = {
    loaded: false,
    count: 0
};

export default function example(state = initialState, action = {}) {
    switch (action.type) {
    case LOAD:
        return {
            ...state,
            loading: true
        };
    case LOAD_SUCCESS:
        return {
            ...state,
            loading: false,
            loaded: true,
            user: action.result
        };
    case LOAD_FAIL:
        return {
            ...state,
            loading: false,
            loaded: false,
            error: action.error
        };
    case GET_COUNT_START:
        return {
            ...state,
            count_start: true
        };
    case GET_COUNT_SUCCESS:
        return {
            ...state,
            count: action.result
        };
    case GET_COUNT_FAIL:
        return {
            ...state,
            errot: action.error
        };
    case COUNT_ADD:
        return {
            ...state,
            count: state.count + 1
        };
    default:
        return state;
    }
}

export function isLoaded(globalState) {
    return globalState.auth && globalState.auth.loaded;
}

export function load() {
    return {
        // api [start action,success action, fail action]
        types: [
            LOAD, LOAD_SUCCESS, LOAD_FAIL
        ],
        promise: (client) => client.get('/api/example')
    };
}

export function getCount() {
    const exampleCount = 45;
    return {
        types: [
            GET_COUNT_START, GET_COUNT_SUCCESS, GET_COUNT_FAIL
        ],
        promise: () => {
            return new Promise((resolve, reject) => {
                setTimeout(function() {
                    resolve(exampleCount);
                }, 500);
            }
        );}
    };
}

export function addCount() {
    return {type: COUNT_ADD};
}
