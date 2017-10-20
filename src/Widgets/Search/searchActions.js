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
    window.api.search(
        window.api.query.create(text), (result) => {
            dispatcher.dispatch({
                type: 'FETCH_DATA',
                payload: result
            })
        }
    )
}