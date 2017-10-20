/**
 * Search reducer
 *
 * @param state
 * @param action
 * @returns {*}
 */
export const searchReducer = (state = {
    q: ''
}, action) => {
    if (action.type === 'KEYUP_SEARCH') {
        return {
            ...state,
            query: {
                q: action.payload
            }
        };
    }

    return state;
};