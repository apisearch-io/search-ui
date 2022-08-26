/**
 * Search actions
 */
import {ItemUUID, Query, Repository} from "apisearch";
import {APISEARCH_DISPATCHER} from "../../Constants";
import container from "../../Container";
import Clone from "../Clone";

/**
 *
 * Configure query
 *
 * @param environmentId
 * @param currentQuery
 * @param itemsPerPage
 * @param highlightsEnabled
 * @param promotedUUIDs
 * @param excludedUUIDs
 * @param fields
 * @param filter
 * @param minScore
 */
export function configureQuery(
    environmentId: string,
    currentQuery: Query,
    itemsPerPage: number,
    highlightsEnabled: boolean,
    promotedUUIDs: ItemUUID[],
    excludedUUIDs: ItemUUID[],
    fields: string[],
    filter: Function,
    minScore: number
) {
    const clonedQuery = Clone.object(currentQuery);
    filter(clonedQuery);

    /**
     * Set result size
     */
    clonedQuery.size = itemsPerPage;

    /**
     * Set specific fields
     */
    clonedQuery.setFields(fields);

    /**
     * Promoted uuids
     */
    for (const i in promotedUUIDs) {
        clonedQuery.promoteUUID(promotedUUIDs[i]);
    }

    /**
     * excluded uuids
     */
    for (const i in excludedUUIDs) {
        clonedQuery.excludeUUID(excludedUUIDs[i]);
    }

    if (minScore > 0) {
        clonedQuery.minScore = minScore;
    }

    const dispatcher = container.get(`${APISEARCH_DISPATCHER}__${environmentId}`);
    dispatcher.dispatch("UPDATE_APISEARCH_SETUP", {
        query: clonedQuery,
    });
}

/**
 * Pagination change
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param nextPage
 */
export function infiniteScrollNextPageAction(
    environmentId: string,
    currentQuery: Query,
    repository: Repository,
    nextPage: number,
) {
    const clonedQuery = Clone.object(currentQuery);
    clonedQuery.page = nextPage;
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
