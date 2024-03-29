/**
 * Clear filters actions
 */
import {CacheClient, HttpRepository, Query, Repository} from "apisearch";
import {APISEARCH_DISPATCHER} from "../../Constants";
import container from "../../Container";
import Clone from "../Clone";

/**
 * Clear filters action
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 */
export function reloadAction(
    environmentId: string,
    currentQuery: Query,
    repository: Repository,
) {
    window.postMessage({
        name: "apisearch_scroll_top",
    }, "*");

    const clonedQuery = Clone.object(currentQuery);
    const dispatcher = container.get(`${APISEARCH_DISPATCHER}__${environmentId}`);
    if (repository instanceof HttpRepository) {
        const httpClient = repository.getHttpClient();
        if (httpClient instanceof CacheClient) {
            httpClient.flushCache();
        }
    }

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
