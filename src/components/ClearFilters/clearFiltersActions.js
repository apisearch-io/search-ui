/**
 * Clear filters actions
 */
import cloneDeep from 'clone-deep';
import container from "../../container";
import {APISEARCH_DISPATCHER} from "../../constants";

/**
 * Clear filters action
 *
 * This action is triggered when the component is clicked
 * receives two parameters:
 *   @param queryOptions -> query given options
 *   @param appOptions   -> current application options
 *
 * Finally dispatches an event with the modified query.
 *   @returns {{
 *     type: string,
 *     payload: {
 *        updatedQuery,
 *        result
 *     }
 *   }}
 */
export function clearFiltersAction(
    {},
    {
        environmentId,
        currentQuery,
        client
    }
) {
    const clonedQuery = cloneDeep(currentQuery);

    clonedQuery.filters = [];
    clonedQuery.setPage(1);

    client.search(clonedQuery.toJSON(), (result, error) => {
        if (error) return;

        const dispatcher = container
            .get(`${APISEARCH_DISPATCHER}__${environmentId}`)
        ;
        dispatcher.dispatch({
            type: 'RENDER_FETCHED_DATA',
            payload: {
                updatedQuery: clonedQuery,
                result
            }
        })
    })
}