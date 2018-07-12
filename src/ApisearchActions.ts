import {Query} from "apisearch";
import {Repository} from "apisearch";
import {APISEARCH_DISPATCHER} from "./Constants";
import container from "./Container";

/**
 * Initial data fetching action
 *
 * @param environmentId
 * @param query
 * @param repository
 */
export function initialDataFetchAction(
    environmentId: string,
    query: Query,
    repository: Repository,
) {
    const dispatcher = container.get(`${APISEARCH_DISPATCHER}__${environmentId}`);
    repository
        .query(query)
        .then((result) => {
            dispatcher.dispatch({
                type: "RENDER_INITIAL_DATA",
                payload: {
                    query,
                    result,
                },
            });
        });
}
