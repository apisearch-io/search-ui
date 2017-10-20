/**
 * Search actions
 */

import dispatcher from '../../dispatcher';

/**
 * Keyup search action
 * @param text
 * @param client
 * @returns {{type: string, payload: *}}
 */
export function keyupSearchAction(text, client) {
    client.search(
        client.query.create(text),
        result => {
            dispatcher.dispatch({
                type: 'FETCH_DATA',
                payload: result
            })
        }
    )
}