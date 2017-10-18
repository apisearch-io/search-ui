export const searchReducer = (state = {
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