import container from './Container';
import {APISEARCH_DISPATCHER} from "./constants";

/**
 * Initial data fetching action
 *
 * This action is triggered on the first time ApisearchUI is initialized:
 *   @param environmentId -> the environment identifier of the ApisearchUI instance
 *   @param initialQuery  -> initial application query
 *   @param client        -> apisearch client to trigger a search
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
export function initialDataFetchAction(
    environmentId,
    initialQuery,
    client
) {
    client.search(initialQuery, initialResult => {
        const dispatcher = container
            .get(`${APISEARCH_DISPATCHER}__${environmentId}`)
        ;

        dispatcher.dispatch({
            type: 'RENDER_INITIAL_DATA',
            payload: {
                initialResult,
                initialQuery
            }
        })
    })
}