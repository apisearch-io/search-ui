/**
 * Search actions
 */

import dispatcher from '../../dispatcher';

/**
 * Keyup search action
 * @param text
 * @returns {{type: string, payload: *}}
 */
export function keyupSearchAction(text) {
    dispatcher.dispatch({
        type: 'FETCH_DATA',
        payload: text
    })
}