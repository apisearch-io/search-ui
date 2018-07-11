/**
 * Pagination actions
 */
import * as cloneDeep from 'clone-deep';
import container from '../../Container';
import {APISEARCH_DISPATCHER} from "../../Constants";
import {Repository} from "apisearch";
import {Query} from "apisearch";

/**
 * Pagination change
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param selectedPage
 */
export function paginationChangeAction(
    environmentId:string,
    currentQuery:Query,
    repository:Repository,
    selectedPage:number
) {
    const clonedQuery = cloneDeep(currentQuery);
    clonedQuery.page = selectedPage;
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
        });
}