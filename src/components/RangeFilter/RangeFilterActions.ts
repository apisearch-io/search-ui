/**
 * SortBy actions
 */
import {Repository, Query, FILTER_AT_LEAST_ONE, FILTER_TYPE_RANGE} from "apisearch";
import * as cloneDeep from "clone-deep";
import {APISEARCH_DISPATCHER} from "../../Constants";
import container from "../../Container";

/**
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param filterName
 * @param filterField
 * @param minValue
 * @param maxValue
 * @param from
 * @param to
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
    clonedQuery.filterByRange(filterName, filterField, [], [from+".."+to], FILTER_AT_LEAST_ONE, FILTER_TYPE_RANGE, false);

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
