import {Repository, Query} from "apisearch";
import {APISEARCH_DISPATCHER} from "../../Constants";
import container from "../../Container";
import Clone from "../Clone";

/**
 * @param environmentId
 * @param currentQuery
 * @param numberOfSuggestions
 */
export function enableSuggestions(
    environmentId: string,
    currentQuery: Query,
    numberOfSuggestions: number,
) {
    const clonedQuery = Clone.object(currentQuery);
    if (numberOfSuggestions > 0) {
        clonedQuery.setNumberOfSuggestions(numberOfSuggestions);
    }

    const dispatcher = container.get(`${APISEARCH_DISPATCHER}__${environmentId}`);

    dispatcher.dispatch("UPDATE_APISEARCH_SETUP", {
        query: clonedQuery,
    });
}
