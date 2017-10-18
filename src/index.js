import apisearch from 'apisearch';

import { createStore } from 'redux';

const searchReducer = (state = {
    q: ''
}, action) => {
    if (action.type === 'SEARCH_KEY_UP') {
        return {
            ...state,
            q: action.payload
        };
    }
    return state;
};

const store = createStore(searchReducer, {});

module.exports = function(apiKey) {
    const api = apisearch(apiKey);
    store.subscribe(() => console.log(store.getState()));

    api.search(
        api.query.create(''),
        res => {
            store.dispatch({
                type: 'SEARCH_KEY_UP',
                payload: res.query.q
            });
        }
    );
};