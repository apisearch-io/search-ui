/**
 * SortBy actions
 */
import {FILTER_AT_LEAST_ONE, FILTER_MUST_ALL, FILTER_TYPE_RANGE, Query, Repository} from "apisearch";
import {APISEARCH_DISPATCHER} from "../../Constants";
import container from "../../Container";
import Clone from "../Clone";

/**
 * @param environmentId
 * @param currentQuery
 * @param filterName
 * @param filterField
 * @param min
 * @param max
 */
export function aggregationSetup(
    environmentId: string,
    currentQuery: Query,
    filterName: string,
    filterField: string,
    min: number,
    max: number
) {
    const withMinMax = min === null || max === null;
    const clonedQuery = Clone.object(currentQuery);
    const filterType = withMinMax ? 'range_min_max' : 'range';
    const filterValues = withMinMax ? ['..'] : [min + '..' + max];
    clonedQuery.aggregateByRange(filterName, filterField, filterValues, FILTER_AT_LEAST_ONE, filterType);
    const dispatcher = container.get(`${APISEARCH_DISPATCHER}__${environmentId}`);

    dispatcher.dispatch("UPDATE_APISEARCH_SETUP", {
        query: clonedQuery,
    });
}

/**
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param filterName
 * @param filterField
 * @param from
 * @param to
 * @param deleteMinMaxAggregation
 */
export function filterAction(
    environmentId: string,
    currentQuery: Query,
    repository: Repository,
    filterName: string,
    filterField: string,
    from: number,
    to: number
) {
    const clonedQuery = Clone.object(currentQuery);
    const realValueFrom = Math.min(from, to);
    const realValueTo = Math.max(from, to);
    const toWithIncluded = realValueTo + ']';
    clonedQuery.filterByRange(filterName, filterField, [], [realValueFrom+".."+toWithIncluded], FILTER_AT_LEAST_ONE, 'range_min_max', false);

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
