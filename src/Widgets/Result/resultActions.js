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
        highlightsEnabled
    },
    {
        environmentId,
        currentQuery
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

    const dispatcher = container.get(`${APISEARCH_DISPATCHER}__${environmentId}`);
    dispatcher.dispatch({
        type: 'UPDATE_APISEARCH_SETUP',
        payload: {
            updatedQuery: clonedQuery
        }
    })
}