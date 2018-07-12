/**
 * SortBy actions
 */
import Apisearch from "apisearch";
import {Repository} from "apisearch";
import {Query} from "apisearch";
import * as cloneDeep from "clone-deep";
import {APISEARCH_DISPATCHER} from "../../Constants";
import container from "../../Container";

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

    clonedQuery
        .sortBy(Apisearch
            .createEmptySortBy()
            .byFieldValue(
                filterData.field,
                filterData.sort,
            ),
        );

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
