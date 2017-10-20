import { combineReducers } from 'redux';
import { searchReducer } from './Search/searchReducer';

/**
 * When more reducers available
 */
// export const combinedReducers = combineReducers({
//     searchReducer
// });

export const combinedReducers = searchReducer;