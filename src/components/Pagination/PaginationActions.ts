/**
 * Pagination actions
 */
import {Repository} from "apisearch";
import {Query} from "apisearch";
import * as cloneDeep from "clone-deep";
import {APISEARCH_DISPATCHER} from "../../Constants";
import container from "../../Container";

/**
 * Pagination change
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param selectedPage
 */
export function paginationChangeAction(
    environmentId: string,
    currentQuery: Query,
    repository: Repository,
    selectedPage: number,
) {
    const clonedQuery = cloneDeep(currentQuery);
    clonedQuery.page = selectedPage;
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
