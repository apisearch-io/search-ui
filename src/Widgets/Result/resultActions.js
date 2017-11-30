/**
 * Search actions
 */
import cloneDeep from 'clone-deep';
import container from '../../container';
import {APISEARCH_DISPATCHER} from "../../constants";

/**
 * Define items per page on result
 *
 * This action is triggered when mounting a component
 * receives two parameters:
 *   @param queryOptions -> given new query options
 *   @param appOptions   -> current application options
 *
 * Finally dispatches an event with the modified query.
 *   @returns {{
 *     type: string,
 *     payload: {
 *        updatedQuery
 *     }
 *   }}
 */
export function changeItemsPerResultPageSetup(
    {
        itemsPerPage,
        highlightsEnabled,
        promotedUUIDs,
        excludedUUIDs
    },
    {
        environmentId,
        currentQuery,
        client
    }
) {
    const clonedQuery = cloneDeep(currentQuery);

    /**
     * Set result size
     */
    clonedQuery.setResultSize(itemsPerPage);

    /**
     * Enabling highlights on query result
     */
    if (highlightsEnabled) {
        clonedQuery.enableHighlights();
    }

    /**
     * Promoted uuids
     */
    if (promotedUUIDs.length !== 0) {
        clonedQuery.promoteUUIDs(
            ...promotedUUIDs.map(
                uuid => client.createObject.uuid(
                    uuid.id,
                    uuid.type
                )
            )
        );
    }

    /**
     * excluded uuids
     */
    if (excludedUUIDs.length !== 0) {
        clonedQuery.excludeUUIDs(
            ...excludedUUIDs.map(
                uuid => client.createObject.uuid(
                    uuid.id,
                    uuid.type
                )
            )
        );
    }

    const dispatcher = container.get(`${APISEARCH_DISPATCHER}__${environmentId}`);
    dispatcher.dispatch({
        type: 'UPDATE_APISEARCH_SETUP',
        payload: {
            updatedQuery: clonedQuery
        }
    })
}