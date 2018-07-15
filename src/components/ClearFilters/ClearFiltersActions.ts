/**
 * Clear filters actions
 */
import {Repository} from "apisearch";
import {Query} from "apisearch";
import * as cloneDeep from "clone-deep";
import {APISEARCH_DISPATCHER} from "../../Constants";
import container from "../../Container";

/**
 * Clear filters action
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 */
export function clearFiltersAction(
    environmentId: string,
    currentQuery: Query,
    repository: Repository,
) {
    const clonedQuery = cloneDeep(currentQuery);

    clonedQuery.filters = {
        _query: currentQuery.getFilter("_query"),
    };

    clonedQuery.page = 1;
    const dispatcher = container.get(`${APISEARCH_DISPATCHER}__${environmentId}`);

    repository
        .query(clonedQuery)
        .then((result) => {
            dispatcher.dispatch({
                type: "RENDER_FETCHED_DATA",
                payload: {
                    query: clonedQuery,
                    result,
                },
            });
        });
}
