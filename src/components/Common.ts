import {Query, Repository} from "apisearch";
import Clone from "./Clone";
import container from "../Container";
import {APISEARCH_DISPATCHER} from "../Constants";

/**
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param word
 * @param category
 */
export function onWordClickAction(
    environmentId: string,
    currentQuery: Query,
    repository: Repository,
    word: string,
    category: string = null,
) {
    let clonedQuery = Clone.object(currentQuery);

    clonedQuery.filters._query.values = [word];
    clonedQuery.page = 1;

    if (category) {
        clonedQuery = Query.createFromArray(clonedQuery);
        clonedQuery.filterBy("Categoría", "category_level_0", [category]);
    }

    const dispatcher = container.get(`${APISEARCH_DISPATCHER}__${environmentId}`);

    repository
        .query(clonedQuery)
        .then((result) => {
            dispatcher.dispatch("RENDER_FETCHED_DATA", {
                query: clonedQuery,
                result,
            });
        })
        .catch((error) => {
            // Do nothing
        });
}

export function toCamelCase(value: any) {
    if (typeof value !== "string") {
        return "";
    }

    return value.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
        if (+match === 0) {
            return ""; // or if (/\s+/.test(match)) for white spaces
        }

        return match.toLowerCase();
    });
}
