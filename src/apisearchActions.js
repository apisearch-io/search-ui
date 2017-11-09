import dispatcher from "./dispatcher";

/**
 * Initial data fetching action
 *
 * This action is triggered on the first time ApisearchUI is initialized:
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
export function initialDataFetchAction(
    currentQuery,
    client
) {
    client.search(currentQuery, result => {
        dispatcher.dispatch({
            type: 'RENDER_FETCHED_DATA',
            payload: {
                result,
                updatedQuery: currentQuery
            }
        })
    })
}