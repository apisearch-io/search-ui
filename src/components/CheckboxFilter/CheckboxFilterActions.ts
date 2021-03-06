/**
 * Checkbox filter actions
 */
import {Repository, Query, FILTER_TYPE_FIELD, FILTER_MUST_ALL} from "apisearch";
import {APISEARCH_DISPATCHER} from "../../Constants";
import container from "../../Container";
import Clone from "../Clone";


/**
 * Define aggregations setup
 *
 * @param environmentId
 * @param currentQuery
 * @param filterName
 * @param aggregationField
 */
export function aggregationSetup(
    environmentId: string,
    currentQuery: Query,
    filterName: string,
    aggregationField: string
) {
    const clonedQuery = Clone.object(currentQuery);
    clonedQuery.aggregateBy(filterName, aggregationField, FILTER_TYPE_FIELD);

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
 * @param isChecked
 */
export function onChangeSearchAction(
    environmentId: string,
    currentQuery: Query,
    repository: Repository,
    filterName: string,
    filterField: string,
    isChecked: boolean,
) {
    const clonedQuery = Clone.object(currentQuery);

    clonedQuery.filterBy(filterName, filterField, isChecked
        ? ["true"]
        : []
    , FILTER_MUST_ALL, false);

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
