import { createStore } from 'redux';
import { combinedReducers } from './Widgets/reducers';

/**
 * Store initial state object
 */
const initialState = {
    query: {
        q: ''
    },
    items: [],
    aggregations: {}
};

/**
 * Redux Store setup
 */
export const store = createStore(
    combinedReducers,
    initialState,

    /* Redux dev tools */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);