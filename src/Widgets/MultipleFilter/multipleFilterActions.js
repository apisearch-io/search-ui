/**
 * Multiple filter actions
 */
import cloneDeep from 'clone-deep';
import dispatcher from '../../dispatcher';
import container from "../../app/container";
import {APISEARCH_DISPATCHER} from "../../app/constants";

/**
 * Define aggregations setup
 *
 * This setup action is triggered when mounting a component
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
export function aggregationSetup(
    queryOptions,
    currentQuery
) {
    const {
        environmentId,
        filterName,
        aggregationField,
        applicationType,
        sortBy
    } = queryOptions;
    let clonedQuery = cloneDeep(currentQuery);

    clonedQuery.aggregateBy(
        filterName,
        aggregationField,
        applicationType,
        sortBy
    );

    const dispatcher = container
        .get(`${APISEARCH_DISPATCHER}__${environmentId}`)
    ;
    dispatcher.dispatch({
        type: 'UPDATE_APISEARCH_SETUP',
        payload: {
            updatedQuery: clonedQuery
        }
    })
}

/**
 * Define aggregations setup
 *
 * This setup action is triggered when mounting a component
 * receives two parameters:
 *   @param queryOptions -> the itemsPerPage to be displayed on the result container
 *   @param currentQuery -> current application query
 *   @param client       -> Apisearch client
 *
 * Finally dispatches an event with the modified query.
 *   @returns {{
 *     type: string,
 *     payload: {
 *        updatedQuery
 *     }
 *   }}
 */
export function filterAction(
    queryOptions,
    currentQuery,
    client
) {
    const {
        environmentId,
        filterName,
        filterField,
        aggregationField,
        filterValues,
        applicationType,
        sortBy
    } = queryOptions;
    let clonedQuery = cloneDeep(currentQuery);

    clonedQuery.filterBy(
        filterName,
        filterField,
        filterValues,
        applicationType,
        false,
        sortBy
    );
    clonedQuery.aggregateBy(
        filterName,
        aggregationField,
        applicationType,
        sortBy
    );

    client.search(clonedQuery, result => {
        const dispatcher = container
            .get(`${APISEARCH_DISPATCHER}__${environmentId}`)
        ;
        dispatcher.dispatch({
            type: 'RENDER_FETCHED_DATA',
            payload: {
                updatedQuery: clonedQuery,
                result
            }
        })
    })
}