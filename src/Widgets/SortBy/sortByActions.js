/**
 * Search actions
 */
import cloneDeep from 'clone-deep';
import container from '../../app/container';
import {APISEARCH_DISPATCHER} from "../../app/constants";

/**
 * On change action
 *
 * This action is triggered when a sortBy filter changes
 * receives three parameters:
 *   @param queryValue   -> the value for the filter (ex: "created_at:asc")
 *   @param currentQuery -> current application query
 *   @param client       -> apisearch client to trigger a search
 *
 * Finally dispatches an event with the search result and
 * the modified query.
 *   @returns {{
 *     type: string,
 *     payload: {
 *        result,
 *        updatedQuery
 *     }
 *   }}
 */
export function onChangeSearchAction(
    queryOptions,
    currentQuery,
    client
) {
    const {
        environmentId,
        selectedOption
    } = queryOptions;

    let clonedQuery = cloneDeep(currentQuery);
    let filterData = splitQueryValue(selectedOption);

    clonedQuery.sortBy({
        [`indexed_metadata.${filterData.field}`]: {
            order: filterData.value
        }
    });

    client.search(clonedQuery, result => {
        const dispatcher = container
            .get(`${APISEARCH_DISPATCHER}__${environmentId}`)
        ;

        dispatcher.dispatch({
            type: 'RENDER_FETCHED_DATA',
            payload: {
                result,
                updatedQuery: clonedQuery
            }
        })
    })
}

function splitQueryValue(string) {
    let queryValue = string.split(':');

    return {
        field: queryValue[0],
        value: queryValue[1]
    }
}