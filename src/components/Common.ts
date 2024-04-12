import {Query, Repository} from "apisearch";
import Store from "../Store";
import Clone from "./Clone";
import container from "../Container";
import {APISEARCH_DISPATCHER} from "../Constants";

/**
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param word
 * @param categoryValue
 * @param categoryName
 * @param categoryField
 */
export function onWordClickAction(
    environmentId: string,
    currentQuery: Query,
    repository: Repository,
    word: string,
    categoryValue: string = null,
    categoryName: string = null,
    categoryField: string = null,
) {
    let clonedQuery = Clone.object(currentQuery);

    clonedQuery.filters._query.values = [word];
    clonedQuery.page = 1;

    if (categoryValue) {
        clonedQuery = Query.createFromArray(clonedQuery);
        clonedQuery.filterBy(categoryName, categoryField, [categoryValue]);
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

export function dispatchQueryStringEvent(
    store: Store,
    timeout: number,
) {
    const currentQueryText = store.getCurrentQuery().getQueryText();

    /**
     * apisearch_qte => Query Text Event object
     * apisearch_lqtsd => Last query text dispatched
     */

    if (window["apisearch_qte"]) {
        window["apisearch_lqtsd"] = null;
        clearTimeout(window["apisearch_qte"]);
    }

    if (window["apisearch_lqtsd"] === currentQueryText) {
        return;
    }

    window["apisearch_lqtsd"] = currentQueryText;
    if (currentQueryText !== "") {
        window["apisearch_qte"] = setTimeout(() => {
            window["apisearch_qte"] = null;
            window.postMessage({
                name: "apisearch_search",
                query_text: currentQueryText,
                query: store.getCurrentQuery().toArray(),
                store: store.getSite(),
                device: store.getDevice(),
                user_type: store.getUserType(),
            }, "*");
        }, timeout);
    }
}
