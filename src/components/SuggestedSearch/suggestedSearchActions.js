/**
 * Search actions
 */
import cloneDeep from 'clone-deep';
import container from '../../container';
import {APISEARCH_DISPATCHER} from "../../constants";

/**
 * This actions are triggered when a text input changes
 * receives two parameters:
 *   @param queryOptions -> query given options
 *   @param appOptions   -> current application options
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
    {
        queryText
    },
    {
        environmentId,
        currentQuery,
        client
    },
) {
    const clonedQuery = cloneDeep(currentQuery);

    clonedQuery
        .setQueryText(queryText)
        .setPage(1)
        .enableResults()
        .disableSuggestions()
    ;

    client.search(clonedQuery.toJSON(), (result, error) => {
        if (error) return;

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
    {
        queryText
    },
    {
        environmentId,
        currentQuery,
        client
    }
) {
    const clonedQuery = cloneDeep(currentQuery);

    clonedQuery
        .setQueryText(queryText)
        .setPage(1)
        .disableResults()
        .enableSuggestions()
    ;

    client.search(clonedQuery, (result, error) => {
        if (error) return;

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