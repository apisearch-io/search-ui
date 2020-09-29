/**
 * SortBy actions
 */
import Apisearch from "apisearch";
import {Repository, Query, SORT_BY_SCORE, SORT_BY_TYPE_DISTANCE} from "apisearch";
import * as cloneDeep from "clone-deep";
import {APISEARCH_DISPATCHER} from "../../Constants";
import container from "../../Container";

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

/**
 * Apply sort by to query
 *
 * @param Query
 * @param string
 */
function applySortByToQuery(query, selectedOption) {

    const sortByData = splitQueryValue(selectedOption);
    const sortBy = Apisearch.createEmptySortBy();
    if (sortByData.field == 'distance') {
        sortBy.byValue({
            type: SORT_BY_TYPE_DISTANCE,
            unit: sortByData.sort
                ? sortByData.sort
                : 'km'
        });
    } else if (sortByData.field == 'score') {
        sortBy.byValue(SORT_BY_SCORE);
    } else {
        sortBy.byFieldValue(
            sortByData.field,
            sortByData.sort,
        );
    }

    query.sortBy(sortBy);

    return query;
}

/**
 * Split sort by string representation
 *
 * @param string
 *
 * @return {{field: string, sort: string}}
 */
function splitQueryValue(string) {
    const queryValue = string.split(":");

    return {
        field: queryValue[0],
        sort: queryValue[1],
    };
}
