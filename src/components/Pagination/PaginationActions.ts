/**
 * Pagination actions
 */
import {Query, Repository} from "apisearch";
import {APISEARCH_DISPATCHER} from "../../Constants";
import container from "../../Container";
import Clone from "../Clone";

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
    const clonedQuery = Clone.object(currentQuery);
    clonedQuery.page = selectedPage;
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
