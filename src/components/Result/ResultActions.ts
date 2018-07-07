/**
 * Search actions
 */
import * as cloneDeep from 'clone-deep';
import container from '../../Container';
import {APISEARCH_DISPATCHER} from "../../Constants";
import {ItemUUID} from "apisearch";
import {Query} from "apisearch";

/**
 *
 * Change items per result page setup
 *
 * @param environmentId
 * @param currentQuery
 * @param itemsPerPage
 * @param highlightsEnabled
 * @param promotedUUIDs
 * @param excludedUUIDs
 */
export function changeItemsPerResultPageSetup(
    environmentId:string,
    currentQuery:Query,
    itemsPerPage:number,
    highlightsEnabled:boolean,
    promotedUUIDs: ItemUUID[],
    excludedUUIDs: ItemUUID[],
) {
    const clonedQuery = cloneDeep(currentQuery);

    /**
     * Set result size
     */
    clonedQuery.size = itemsPerPage;

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
        clonedQuery.promoteUUIDs(promotedUUIDs);
    }

    /**
     * excluded uuids
     */
    if (excludedUUIDs.length !== 0) {
        clonedQuery.excludeUUIDs(excludedUUIDs);
    }

    const dispatcher = container.get(`${APISEARCH_DISPATCHER}__${environmentId}`);
    dispatcher.dispatch({
        type: 'UPDATE_APISEARCH_SETUP',
        payload: {
            query: clonedQuery
        }
    })
}