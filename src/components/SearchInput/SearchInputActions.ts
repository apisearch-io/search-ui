/**
 * Search actions
 */
import * as cloneDeep from 'clone-deep';
import container from '../../Container';
import {APISEARCH_DISPATCHER} from "../../Constants";
import {Repository} from "apisearch";
import {Query} from "apisearch";

/**
 * Search action
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param queryText
 */
export function simpleSearchAction(
    environmentId:string,
    currentQuery:Query,
    repository:Repository,
    queryText:string
) {
    const clonedQuery = cloneDeep(currentQuery);

    clonedQuery.filters._query.values = [queryText];
    clonedQuery.page = 1;

    const dispatcher = container.get(`${APISEARCH_DISPATCHER}__${environmentId}`);
    repository
        .query(clonedQuery)
        .then(result => {
            dispatcher.dispatch({
                type: 'RENDER_FETCHED_DATA',
                payload: {
                    query: clonedQuery,
                    result: result
                }
            })
    })
}