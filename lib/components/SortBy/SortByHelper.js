"use strict";
exports.__esModule = true;
exports.applySortByToQuery = void 0;
/**
 * SortBy actions
 */
var apisearch_1 = require("apisearch");
/**
 * Apply sort by to query
 *
 * @param query Query
 * @param selectedOption string
 */
function applySortByToQuery(query, selectedOption) {
    var sortByData = splitQueryValue(selectedOption);
    var sortBy = apisearch_1["default"].createEmptySortBy();
    if (sortByData.field == 'distance') {
        sortBy.byValue({
            type: apisearch_1.SORT_BY_TYPE_DISTANCE,
            unit: sortByData.sort
                ? sortByData.sort
                : 'km'
        });
    }
    else if (sortByData.field == 'score') {
        sortBy.byValue(apisearch_1.SORT_BY_SCORE);
    }
    else {
        sortBy.byFieldValue(sortByData.field, sortByData.sort);
    }
    query.sortBy(sortBy);
    return query;
}
exports.applySortByToQuery = applySortByToQuery;
/**
 * Split sort by string representation
 *
 * @param string
 *
 * @return {{field: string, sort: string}}
 */
function splitQueryValue(string) {
    var queryValue = string.split(":");
    return {
        field: queryValue[0],
        sort: queryValue[1]
    };
}
