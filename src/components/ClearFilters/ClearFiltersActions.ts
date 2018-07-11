/**
 * Clear filters actions
 */
import * as cloneDeep from 'clone-deep';
import container from "../../Container";
import {APISEARCH_DISPATCHER} from "../../Constants";
import {Repository} from "apisearch";
import {Query} from "apisearch";

/**
 * Clear filters action
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 */
export function clearFiltersAction(
    environmentId:string,
    currentQuery:Query,
    repository:Repository
) {
    const clonedQuery = cloneDeep(currentQuery);

    clonedQuery.filters = [];
    clonedQuery.page = 1;
    const dispatcher = container.get(`${APISEARCH_DISPATCHER}__${environmentId}`);

    repository
        .query(clonedQuery)
        .then(result => {
            dispatcher.dispatch({
                type: 'RENDER_FETCHED_DATA',
                payload: {
                    query: clonedQuery,
                    result: result
                }
            })
        });
}