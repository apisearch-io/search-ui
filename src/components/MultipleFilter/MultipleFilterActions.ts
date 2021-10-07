/**
 * Multiple filter actions
 */
import {Repository} from "apisearch";
import {Query} from "apisearch";
import {APISEARCH_DISPATCHER} from "../../Constants";
import {FILTER_TYPE_RANGE} from "apisearch";
import container from "../../Container";
import Clone from "../Clone";

/**
 * Define aggregations setup
 *
 * @param environmentId
 * @param currentQuery
 * @param filterName
 * @param aggregationField
 * @param applicationType
 * @param sortBy
 * @param fetchLimit
 * @param ranges
 */
export function aggregationSetup(
    environmentId: string,
    currentQuery: Query,
    filterName: string,
    aggregationField: string,
    applicationType: number,
    sortBy: string[],
    fetchLimit: number,
    ranges: any
) {
    const clonedQuery = Clone.object(currentQuery);
    const rangesValues = Object.keys(ranges);

    if (rangesValues.length > 0) {
        clonedQuery.aggregateByRange(
            filterName,
            aggregationField,
            rangesValues,
            applicationType,
            FILTER_TYPE_RANGE,
            sortBy,
            fetchLimit,
        );
    } else {
        clonedQuery.aggregateBy(
            filterName,
            aggregationField,
            applicationType,
            sortBy,
            fetchLimit,
        );
    }

    const dispatcher = container.get(`${APISEARCH_DISPATCHER}__${environmentId}`);

    dispatcher.dispatch("UPDATE_APISEARCH_SETUP", {
        query: clonedQuery,
    });
}

/**
 * Filter action
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param filterName
 * @param filterField
 * @param aggregationField
 * @param filterValues
 * @param applicationType
 * @param sortBy
 * @param fetchLimit
 * @param ranges
 * @param labels
 */
export function filterAction(
    environmentId: string,
    currentQuery: Query,
    repository: Repository,
    filterName: string,
    filterField: string,
    aggregationField: string,
    filterValues: string[],
    applicationType: number,
    sortBy: string[],
    fetchLimit: number,
    ranges: object,
    labels: object
) {
    const clonedQuery = Clone.object(currentQuery);
    const rangesValues = Object.keys(ranges);

    if (rangesValues.length > 0) {

        clonedQuery.filterByRange(
            filterName,
            filterField,
            rangesValues,
            filterValues,
            applicationType,
            FILTER_TYPE_RANGE,
            false,
            sortBy,
        );

        clonedQuery.aggregateByRange(
            filterName,
            aggregationField,
            rangesValues,
            applicationType,
            FILTER_TYPE_RANGE,
            sortBy,
            fetchLimit,
        );

    } else {
        clonedQuery.filterBy(
            filterName,
            filterField,
            filterValues,
            applicationType,
            false,
            sortBy,
        );

        clonedQuery.aggregateBy(
            filterName,
            aggregationField,
            applicationType,
            sortBy,
            fetchLimit,
        );
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
