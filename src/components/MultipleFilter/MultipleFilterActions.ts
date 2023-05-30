/**
 * Multiple filter actions
 */
import {FILTER_AT_LEAST_ONE, Repository} from "apisearch";
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
 * @param filterField
 * @param aggregationField
 * @param applicationType
 * @param sortBy
 * @param fetchLimit
 * @param ranges
 * @param promoted
 */
export function aggregationSetup(
    environmentId: string,
    currentQuery: Query,
    filterName: string,
    filterField: string,
    aggregationField: string,
    applicationType: number,
    sortBy: string[],
    fetchLimit: number,
    ranges: any,
    promoted: string[],
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
            promoted,
        );
    } else {
        clonedQuery.aggregateBy(
            filterName,
            aggregationField,
            applicationType,
            sortBy,
            fetchLimit,
            promoted,
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
 * @param shadowLeveledFilters
 * @param originalFilterField
 * @param promoted
 * @param selectedFilter
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
    labels: object,
    shadowLeveledFilters: any[],
    originalFilterField: string,
    promoted: string[],
    selectedFilter: string,
) {
    window.postMessage({
        name: "apisearch_scroll_top",
    }, "*");

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
            promoted,
        );
    }

    if (applicationType === 6) {
        configureQueryWithShadowLeveledFilters(
            clonedQuery,
            shadowLeveledFilters,
            originalFilterField,
        );
    }

    clonedQuery.page = 1;
    const dispatcher = container.get(`${APISEARCH_DISPATCHER}__${environmentId}`);

    // We must explicitly tell that a filter was added at this point
    if (selectedFilter) {
        clonedQuery.setMetadataValue("af", [filterField, selectedFilter]);
    }

    repository
        .query(clonedQuery)
        .then((result) => {
            dispatcher.dispatch("RENDER_FETCHED_DATA", {
                query: clonedQuery,
                result,
            });
        })
        .catch((error) => {
            // Do nothing
        });
}

/**
 * @param environmentId
 * @param currentQuery
 * @param filterName
 * @param filterField
 * @param aggregationField
 */
export function modifyQueryAggregationWithProperLevelValue(
    environmentId: string,
    currentQuery: any,
    filterName: string,
    filterField: string,
    aggregationField: string,
) {
    if (
        currentQuery.filters !== undefined &&
        currentQuery.filters[filterName] !== undefined
    ) {
        const clonedQuery = Clone.object(currentQuery);
        const fieldName = currentQuery.filters[filterName].field;
        const fieldNameParts = fieldName.split("_");
        const currentLevel = parseInt(fieldNameParts[fieldNameParts.length - 1], 10);
        const fieldNameWithoutLevel = fieldNameParts.slice(0, fieldNameParts.length - 1).join("_");
        clonedQuery.aggregations[filterName].field = fieldNameWithoutLevel + "_" + (currentLevel + 1);

        const dispatcher = container.get(`${APISEARCH_DISPATCHER}__${environmentId}`);
        dispatcher.dispatch("UPDATE_APISEARCH_SETUP", {
            query: clonedQuery,
        });
    }
}

/**
 * @param query
 * @param shadowLeveledFilters
 * @param originalFilterField
 */
export function configureQueryWithShadowLeveledFilters(
    query: any,
    shadowLeveledFilters: any[],
    originalFilterField: string,
) {
    for (let it = 1; it < 10; it++) {
        const iterationFieldName = originalFilterField + "_level_" + it;
        delete(query.filters[iterationFieldName]);
        delete(query.aggregations[iterationFieldName]);
    }

    if (shadowLeveledFilters.length > 0) {

        let levelCounter = 1;
        shadowLeveledFilters.forEach((filterValue) => {
            const leveledFieldName = originalFilterField + "_level_" + (levelCounter++);

            query.filterBy(
                leveledFieldName,
                leveledFieldName,
                [filterValue],
                FILTER_AT_LEAST_ONE,
            );
        });
    }
}
