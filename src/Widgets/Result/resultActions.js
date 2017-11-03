/**
 * Search actions
 */
import cloneDeep from 'clone-deep';
import dispatcher from '../../dispatcher';

/**
 * Define items per page on result
 *
 * This action is triggered when mounting a component
 * receives two parameters:
 *   @param itemsPerPage -> the itemsPerPage to be displayed on the result container
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
    itemsPerPage,
    currentQuery
) {
    let clonedQuery = cloneDeep(currentQuery);
    clonedQuery
        .setResultSize(itemsPerPage)
    ;

    dispatcher.dispatch({
        type: 'UPDATE_APISEARCH_SETUP',
        payload: {
            updatedQuery: clonedQuery
        }
    })
}