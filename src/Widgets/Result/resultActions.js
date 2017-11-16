/**
 * Search actions
 */
import cloneDeep from 'clone-deep';
import container from '../../app/Container';
import {APISEARCH_DISPATCHER} from "../../app/constants";

/**
 * Define items per page on result
 *
 * This action is triggered when mounting a component
 * receives two parameters:
 *   @param queryOptions -> the itemsPerPage to be displayed on the result container
 *   @param currentQuery -> current application query
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
    queryOptions,
    currentQuery
) {
    const {
        environmentId,
        itemsPerPage,
        highlightsEnabled
    } = queryOptions;

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