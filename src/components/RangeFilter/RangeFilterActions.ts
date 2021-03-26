/**
 * SortBy actions
 */
import {
    Repository,
    Query,
    FILTER_AT_LEAST_ONE,
    FILTER_TYPE_RANGE,
    FILTER_MUST_ALL
} from "apisearch";
import {APISEARCH_DISPATCHER} from "../../Constants";
import container from "../../Container";
import Clone from "../Clone";

/**
 * @param environmentId
 * @param currentQuery
 * @param filterName
 * @param filterField
 */
export function addMinMaxAggregation(
    environmentId: string,
    currentQuery: Query,
    filterName: string,
    filterField: string
) {
    const clonedQuery = Clone.object(currentQuery);
    clonedQuery.aggregateByRange(
        filterName,
        filterField,
        ['..'],
        FILTER_MUST_ALL,
        'range_min_max'
    )

    const dispatcher = container.get(`${APISEARCH_DISPATCHER}__${environmentId}`);
    dispatcher.dispatch("UPDATE_APISEARCH_SETUP", {
        query: clonedQuery,
    });
}

/**
 * @param environmentId
 * @param currentQuery
 * @param filterName
 */
export function deleteMinMaxAggregation(
    environmentId: string,
    currentQuery: Query,
    filterName: string,
) {
    const clonedQuery = Clone.object(currentQuery);
    delete clonedQuery.aggregations[filterName];

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
export function onChangeSearchAction(
    environmentId: string,
    currentQuery: Query,
    repository: Repository,
    filterName: string,
    filterField: string,
    from: number,
    to: number,
    deleteMinMaxAggregation: boolean
) {
    const clonedQuery = Clone.object(currentQuery);
    const toWithIncluded = to + ']';
    clonedQuery.filterByRange(filterName, filterField, [], [from+".."+toWithIncluded], FILTER_AT_LEAST_ONE, FILTER_TYPE_RANGE, false);
    if (deleteMinMaxAggregation) {
        delete clonedQuery.aggregations[filterName];
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
