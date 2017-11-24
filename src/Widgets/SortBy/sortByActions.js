/**
 * SortBy actions
 */
import cloneDeep from 'clone-deep';
import container from '../../container';
import {APISEARCH_DISPATCHER} from "../../constants";

/**
 * On change action
 *
 * This action is triggered when a sortBy filter changes
 * receives two parameters:
 *   @param queryOptions -> query given options
 *   @param appOptions   -> current application options
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
    {
        selectedOption
    },
    {
        environmentId,
        currentQuery,
        client
    }
) {
    const clonedQuery = cloneDeep(currentQuery);
    const filterData = splitQueryValue(selectedOption);

    clonedQuery.sortBy({
        [`indexed_metadata.${filterData.field}`]: {
            order: filterData.value
        }
    });

    client.search(clonedQuery, (result, error) => {
        if (error) return;

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