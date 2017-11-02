/**
 * Search actions
 */
import cloneDeep from 'clone-deep';
import dispatcher from '../../dispatcher';

/**
 * This actions are triggered when a text input changes
 * receives three parameters:
 *   @param text         -> the text value for the search
 *   @param currentQuery -> current application query
 *   @param client       -> apisearch client to trigger a search
 *
 * Finally dispatches an event with the search result and
 * the modified query.
 *   @returns {{
 *     type: string,
 *     payload: {
 *        result,
 *        updatedQuery
 *     }
 *   }}
 */

/**
 * Simple search action
 * Builds a query disabling suggested searches flag
 */
export function simpleSearchAction(
    text,
    currentQuery,
    client
) {
    let clonedQuery = cloneDeep(currentQuery);
    clonedQuery
        .setQueryText(text)
        .setResultSize(30)
        .disableSuggestions()
    ;

    client.search(clonedQuery, result => {
        dispatcher.dispatch({
            type: 'FETCH_DATA',
            payload: {
                result,
                updatedQuery: clonedQuery
            }
        })
    })
}

/**
 * Suggested Search Action
 * Builds a query using suggested search flag active
 */
export function suggestedSearchAction(
    text,
    currentQuery,
    client
) {
    const emptyResultSize = 0;

    let clonedQuery = cloneDeep(currentQuery);
    clonedQuery
        .setQueryText(text)
        .setResultSize(emptyResultSize)
        .enableSuggestions()
    ;

    client.search(clonedQuery, result => {
        dispatcher.dispatch({
            type: 'FETCH_DATA',
            payload: {
                result,
                updatedQuery: clonedQuery
            }
        })
    })
}