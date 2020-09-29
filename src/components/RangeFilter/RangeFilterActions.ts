/**
 * SortBy actions
 */
import Apisearch from "apisearch";
import {Repository, Query, FILTER_AT_LEAST_ONE, FILTER_TYPE_RANGE} from "apisearch";
import * as cloneDeep from "clone-deep";
import {APISEARCH_DISPATCHER} from "../../Constants";
import container from "../../Container";

/**
 * ON change search action
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param selectedOption
 */
export function onChangeSearchAction(
    environmentId: string,
    currentQuery: Query,
    repository: Repository,
    filterName: string,
    filterField: string,
    minValue: number,
    maxValue: number,
    from: number,
    to: number
) {
    const clonedQuery = cloneDeep(currentQuery);

    if (
        minValue != from ||
        maxValue != to
    ) {
        clonedQuery.filterByRange(filterName, filterField, [], [from+".."+to], FILTER_AT_LEAST_ONE, FILTER_TYPE_RANGE, false);
    }

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
        })
        .catch((error) => {
            // Do nothing
        });
}
