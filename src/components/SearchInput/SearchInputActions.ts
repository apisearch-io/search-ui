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
 * @param initialSearch
 * @param autocomplete
 * @param searchableFields
 */
export function initialSearchSetup(
    environmentId: string,
    currentQuery: Query,
    initialSearch: string,
    autocomplete: boolean,
    searchableFields: string[]
) {
    const dispatcher = container.get(`${APISEARCH_DISPATCHER}__${environmentId}`);
    const clonedQuery = Clone.object(currentQuery);

    clonedQuery.filters._query.values = [initialSearch];
    clonedQuery.page = 1;

    if (searchableFields.length > 0) {
        clonedQuery.searchableFields = searchableFields;
    }

    if (autocomplete) {
        clonedQuery.enableSuggestions();
        const metadata = clonedQuery.getMetadata();
        if (metadata.number_of_suggestions === undefined) {
            clonedQuery.setMetadataValue('number_of_suggestions', 1);
        }
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
    visibleResults: boolean
) {
    const dispatcher = container.get(`${APISEARCH_DISPATCHER}__${environmentId}`);
    const clonedQuery = Clone.object(currentQuery);

    clonedQuery.filters._query.values = [queryText];
    clonedQuery.page = 1;

    if (!visibleResults) {
        dispatcher.dispatch("RENDER_FETCHED_DATA", {
            query: clonedQuery,
            result: null,
            visibleResults: visibleResults
        });

        return;
    }

    repository
        .query(clonedQuery)
        .then((result) => {
            dispatcher.dispatch("RENDER_FETCHED_DATA", {
                query: clonedQuery,
                result: result,
                visibleResults: visibleResults
            });
        })
        .catch((error) => {
            // Do nothing
        });
}
