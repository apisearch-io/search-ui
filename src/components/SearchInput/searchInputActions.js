/**
 * Search actions
 */
import cloneDeep from 'clone-deep';
import container from '../../container';
import {APISEARCH_DISPATCHER} from "../../constants";

/**
 * Keyup simple search action
 *
 * This action is triggered when a text input changes
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
export function simpleSearchAction(
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
    ;

    const dispatcher = container
        .get(`${APISEARCH_DISPATCHER}__${environmentId}`)
    ;
    client.search(clonedQuery.toJSON(), (result, error) => {
        if (error) return;

        dispatcher.dispatch({
            type: 'RENDER_FETCHED_DATA',
            payload: {
                result,
                updatedQuery: clonedQuery
            }
        })
    })
}