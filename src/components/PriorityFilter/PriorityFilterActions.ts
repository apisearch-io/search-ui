/**
 * Multiple filter actions
 */
import {Repository} from "apisearch";
import {Query} from "apisearch";
import {APISEARCH_DISPATCHER} from "../../Constants";
import container from "../../Container";
import Clone from "../Clone";

export function setupPriorityFilters(
    environmentId: string,
    currentQuery: Query,
    filters: string[],
) {

    const clonedQuery = Clone.object(currentQuery);
    clonedQuery.setMetadataValue("pf", filters);
    const dispatcher = container.get(`${APISEARCH_DISPATCHER}__${environmentId}`);

    dispatcher.dispatch("UPDATE_APISEARCH_SETUP", {
        query: clonedQuery,
    });
}

/**
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param filterName
 * @param filterField
 * @param filterValue
 * @param applicationType
 */
export function priorityFilterAction(
    environmentId: string,
    currentQuery: Query,
    repository: Repository,
    filterName: string,
    filterField: string,
    filterValue: string,
    applicationType: number,
) {
    window.postMessage({
        name: "apisearch_scroll_top",
    }, "*");

    const clonedQuery = Clone.object(currentQuery);
    clonedQuery.filterBy(
        filterName,
        filterField,
        [filterValue],
        applicationType,
        false,
    );

    clonedQuery.page = 1;
    const dispatcher = container.get(`${APISEARCH_DISPATCHER}__${environmentId}`);
    clonedQuery.setMetadataValue("af", [filterField, filterValue]);

    repository
        .query(clonedQuery)
        .then((result) => {
            delete clonedQuery.metadata.af;
            dispatcher.dispatch("RENDER_FETCHED_DATA", {
                query: clonedQuery,
                result,
            });
        })
        .catch((error) => {
            // Do nothing
        });
}
