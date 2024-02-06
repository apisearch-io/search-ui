/**
 * SortBy actions
 */
import Apisearch, {SORT_BY_SCORE, SORT_BY_TYPE_DISTANCE} from "apisearch";

/**
 * Apply sort by to query
 *
 * @param query Query
 * @param selectedOption string
 */
export function applySortByToQuery(query, selectedOption) {

    const sortByData = splitQueryValue(selectedOption);
    const sortBy = Apisearch.createEmptySortBy();
    if (sortByData.field === "distance") {
        sortBy.byValue({
            type: SORT_BY_TYPE_DISTANCE,
            unit: sortByData.sort
                ? sortByData.sort
                : "km",
        });
    } else if (sortByData.field === "score") {
        sortBy.byValue(SORT_BY_SCORE);
    } else {
        sortBy.byFieldValue(
            sortByData.field,
            sortByData.sort,
        );
    }

    query.sortBy(sortBy);

    return query;
}

/**
 * Split sort by string representation
 *
 * @param string
 *
 * @return {{field: string, sort: string}}
 */
function splitQueryValue(string) {
    const queryValue = string.split(":");

    return {
        field: queryValue[0],
        sort: queryValue[1],
    };
}
