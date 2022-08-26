/**
 * Search actions
 */
import {Repository} from "apisearch";
import {Query} from "apisearch";
import {APISEARCH_DISPATCHER} from "../../Constants";
import container from "../../Container";
import Clone from "../Clone";

/**
 * Initial Search
 *
 * @param environmentId
 * @param currentQuery
 * @param autocomplete
 * @param searchableFields
 * @param queryOperator
 */
export function initialSearchSetup(
    environmentId: string,
    currentQuery: Query,
    autocomplete: boolean,
    searchableFields: string[],
    queryOperator: string,
) {
    const dispatcher = container.get(`${APISEARCH_DISPATCHER}__${environmentId}`);
    const clonedQuery = Clone.object(currentQuery);

    clonedQuery.page = 1;
    clonedQuery.queryOperator = queryOperator;

    if (searchableFields.length > 0) {
        clonedQuery.searchableFields = searchableFields;
    }

    if (autocomplete) {
        clonedQuery.enableAutocomplete();
    }

    dispatcher.dispatch("UPDATE_APISEARCH_SETUP", {
        query: clonedQuery,
    });
}

/**
 * Search action
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param queryText
 * @param visibleResults
 */
export function simpleSearchAction(
    environmentId: string,
    currentQuery: Query,
    repository: Repository,
    queryText: string,
    visibleResults: boolean,
) {
    window.postMessage({
        name: "apisearch_scroll_top",
    }, "*");

    const dispatcher = container.get(`${APISEARCH_DISPATCHER}__${environmentId}`);
    const clonedQuery = Clone.object(currentQuery);

    clonedQuery.filters._query.values = [queryText];
    clonedQuery.page = 1;

    if (!visibleResults) {
        dispatcher.dispatch("RENDER_FETCHED_DATA", {
            query: clonedQuery,
            result: null,
            visibleResults: visibleResults,
        });

        return;
    }

    const mode = clonedQuery.metadata.mode ?? {};
    clonedQuery.metadata.number_of_suggestions = clonedQuery.getNumberOfSuggestions();
    mode.suggestions ?? true
        ? clonedQuery.setNumberOfSuggestions(clonedQuery.metadata.number_of_suggestions)
        : clonedQuery.disableSuggestions();

    mode.aggregations ?? true
        ? clonedQuery.enableAggregations()
        : clonedQuery.disableAggregations();

    mode.results ?? true
        ? clonedQuery.enableResults()
        : clonedQuery.disableResults();

    repository
        .query(clonedQuery)
        .then((result) => {
            dispatcher.dispatch("RENDER_FETCHED_DATA", {
                query: clonedQuery,
                result,
                visibleResults,
            });
        })
        .catch((error) => {
            // Do nothing
        });
}
