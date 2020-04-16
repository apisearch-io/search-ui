/**
 * SortBy actions
 */
import Apisearch from "apisearch";
import {Repository} from "apisearch";
import {Query} from "apisearch";
import * as cloneDeep from "clone-deep";
import {APISEARCH_DISPATCHER} from "../../Constants";
import container from "../../Container";
import {SORT_BY_SCORE} from "apisearch";

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
    const filterData = splitQueryValue(selectedOption);

    const sortBy = Apisearch.createEmptySortBy();
    if (filterData.field == 'score') {
        sortBy.byValue(SORT_BY_SCORE);
    } else {
        sortBy.byFieldValue(
            filterData.field,
            filterData.sort,
        );
    }

    clonedQuery.sortBy(sortBy);
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
        });
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
