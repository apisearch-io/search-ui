/**
 * Search actions
 */
import cloneDeep from 'clone-deep';
import container from '../../container';
import {APISEARCH_DISPATCHER} from "../../constants";

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
    queryOptions,
    currentQuery,
    client
) {
    const {
        environmentId,
        queryText
    } = queryOptions;

    let clonedQuery = cloneDeep(currentQuery);
    clonedQuery
        .setQueryText(queryText)
        .enableResults()
        .disableSuggestions()
    ;

    client.search(clonedQuery, result => {
        const dispatcher = container
            .get(`${APISEARCH_DISPATCHER}__${environmentId}`)
        ;
        dispatcher.dispatch({
            type: 'RENDER_FETCHED_DATA',
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
    queryOptions,
    currentQuery,
    client
) {
    const {
        environmentId,
        queryText
    } = queryOptions;

    let clonedQuery = cloneDeep(currentQuery);
    clonedQuery
        .setQueryText(queryText)
        .disableResults()
        .enableSuggestions()
    ;

    client.search(clonedQuery, result => {
        const dispatcher = container
            .get(`${APISEARCH_DISPATCHER}__${environmentId}`)
        ;
        dispatcher.dispatch({
            type: 'RENDER_FETCHED_DATA',
            payload: {
                result,
                updatedQuery: clonedQuery
            }
        })
    })
}