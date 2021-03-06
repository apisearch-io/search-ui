/**
 * SortBy actions
 */
import {Repository, Query, FILTER_AT_LEAST_ONE, FILTER_TYPE_RANGE} from "apisearch";
import {APISEARCH_DISPATCHER} from "../../Constants";
import container from "../../Container";
import Clone from "../Clone";

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
    const clonedQuery = Clone.object(currentQuery);
    clonedQuery.filterByRange(filterName, filterField, [], [from+".."+to], FILTER_AT_LEAST_ONE, FILTER_TYPE_RANGE, false);

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
