/**
 * Clear filters actions
 */
import {Repository} from "apisearch";
import {Query} from "apisearch";
import {APISEARCH_DISPATCHER} from "../../Constants";
import container from "../../Container";
import Clone from "../Clone";

/**
 * Clear filters action
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param filterToClear
 */
export function clearFiltersAction(
    environmentId: string,
    currentQuery: Query,
    repository: Repository,
    filterToClear: string = null,
) {
    const clonedQuery = Clone.object(currentQuery);

    if (filterToClear === null) {
        clonedQuery.filters = {
            _query: currentQuery.getFilter("_query"),
        };
    } else {
        delete clonedQuery.filters[filterToClear];
    }

    clonedQuery.page = 1;
    const dispatcher = container.get(`${APISEARCH_DISPATCHER}__${environmentId}`);

    repository
        .query(clonedQuery)
        .then((result) => {
            dispatcher.dispatch("RENDER_FETCHED_DATA", {
                query: clonedQuery,
                result: result,
            });
        })
        .catch((error) => {
            // Do nothing
        });
}
