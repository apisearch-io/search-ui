/**
 * Search actions
 */
import cloneDeep from 'clone-deep';
import container from '../../app/Container';
import {APISEARCH_DISPATCHER} from "../../app/constants";

/**
 * Keyup simple search action
 *
 * This action is triggered when a text input changes
 * receives three parameters:
 *   @param queryOptions -> the queryOptions for the search
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
export function simpleSearchAction(
    queryOptions,
    currentQuery,
    client
) {
    const {
        environmentId,
        queryText
    } = queryOptions;

    const clonedQuery = cloneDeep(currentQuery);
    clonedQuery
        .setQueryText(queryText)
    ;

    const dispatcher = container
        .get(`${APISEARCH_DISPATCHER}__${environmentId}`)
    ;
    client.search(clonedQuery, result => {
        dispatcher.dispatch({
            type: 'RENDER_FETCHED_DATA',
            payload: {
                result,
                updatedQuery: clonedQuery
            }
        })
    })
}