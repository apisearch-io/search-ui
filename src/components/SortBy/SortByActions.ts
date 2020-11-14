/**
 * SortBy actions
 */
import {Repository, Query} from "apisearch";
import * as cloneDeep from "clone-deep";
import {APISEARCH_DISPATCHER} from "../../Constants";
import container from "../../Container";
import {applySortByToQuery} from "./SortByHelper"

/**
 * Initial sortBy
 *
 * @param environmentId
 * @param currentQuery
 * @param initialOption
 */
export function initialSortBySetup(
    environmentId: string,
    currentQuery: Query,
    initialOption: string
) {
    const dispatcher = container.get(`${APISEARCH_DISPATCHER}__${environmentId}`);
    const clonedQuery = cloneDeep(currentQuery);

    applySortByToQuery(clonedQuery, initialOption);
    clonedQuery.page = 1;

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
    selectedOption: string,
) {
    const clonedQuery = cloneDeep(currentQuery);
    applySortByToQuery(clonedQuery, selectedOption);
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
