/**
 * Clear filters actions
 */
import {Repository} from "apisearch";
import {Query} from "apisearch";
import {APISEARCH_DISPATCHER} from "../../Constants";
import container from "../../Container";
import Clone from "../Clone";

/**
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param filterToClear
 * @param filterValueToClear
 */
export function clearFiltersAction(
    environmentId: string,
    currentQuery: Query,
    repository: Repository,
    filterToClear: string = null,
    filterValueToClear: string = null,
) {
    window.postMessage({
        name: "apisearch_scroll_top",
    }, "*");

    const clonedQuery = Clone.object(currentQuery);

    if (filterToClear === null) {
        clonedQuery.filters = {
            _query: currentQuery.getFilter("_query"),
        };
    } else if (filterValueToClear === null) {
        delete clonedQuery.filters[filterToClear];
    } else {
        const values = clonedQuery.filters[filterToClear].values;
        const valueIndex = values.indexOf(filterValueToClear, 0);
        if (valueIndex > -1) {
            clonedQuery.filters[filterToClear].values.splice(valueIndex, 1);
        }
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
