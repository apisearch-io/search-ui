/**
 * Search actions
 */

/**
 * Keyup search action
 * @param text
 * @returns {{type: string, payload: *}}
 */
export function keyupSearchAction(text) {
    return {
        type: 'KEYUP_SEARCH',
        payload: text
    }
}