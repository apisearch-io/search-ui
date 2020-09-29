/**
 * Checkbox filter actions
 */
import Apisearch from "apisearch";
import {Repository, Query, FILTER_TYPE_FIELD, FILTER_MUST_ALL} from "apisearch";
import * as cloneDeep from "clone-deep";
import {APISEARCH_DISPATCHER} from "../../Constants";
import container from "../../Container";


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
    const clonedQuery = cloneDeep(currentQuery);
    clonedQuery.aggregateBy(filterName, aggregationField, FILTER_TYPE_FIELD);

    const dispatcher = container.get(`${APISEARCH_DISPATCHER}__${environmentId}`);

    dispatcher.dispatch({
        type: "UPDATE_APISEARCH_SETUP",
        payload: {
            query: clonedQuery,
        },
    });
}

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
    isChecked: boolean,
) {
    const clonedQuery = cloneDeep(currentQuery);

    clonedQuery.filterBy(filterName, filterField, isChecked
        ? ["true"]
        : []
    , FILTER_MUST_ALL, false);

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
