"use strict";
exports.__esModule = true;
exports.onChangeSearchAction = exports.initialSortBySetup = void 0;
/**
 * SortBy actions
 */
var apisearch_1 = require("apisearch");
var apisearch_2 = require("apisearch");
var cloneDeep = require("clone-deep");
var Constants_1 = require("../../Constants");
var Container_1 = require("../../Container");
/**
 * Initial sortBy
 *
 * @param environmentId
 * @param currentQuery
 * @param initialOption
 */
function initialSortBySetup(environmentId, currentQuery, initialOption) {
    var dispatcher = Container_1["default"].get(Constants_1.APISEARCH_DISPATCHER + "__" + environmentId);
    var clonedQuery = cloneDeep(currentQuery);
    applySortByToQuery(clonedQuery, initialOption);
    clonedQuery.page = 1;
    dispatcher.dispatch({
        type: "UPDATE_APISEARCH_SETUP",
        payload: {
            query: clonedQuery
        }
    });
}
exports.initialSortBySetup = initialSortBySetup;
/**
 * ON change search action
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param selectedOption
 */
function onChangeSearchAction(environmentId, currentQuery, repository, selectedOption) {
    var clonedQuery = cloneDeep(currentQuery);
    applySortByToQuery(clonedQuery, selectedOption);
    clonedQuery.page = 1;
    var dispatcher = Container_1["default"].get(Constants_1.APISEARCH_DISPATCHER + "__" + environmentId);
    repository
        .query(clonedQuery)
        .then(function (result) {
        dispatcher.dispatch({
            type: "RENDER_FETCHED_DATA",
            payload: {
                query: clonedQuery,
                result: result
            }
        });
    })["catch"](function (error) {
        // Do nothing
    });
}
exports.onChangeSearchAction = onChangeSearchAction;
/**
 * Apply sort by to query
 *
 * @param Query
 * @param string
 */
function applySortByToQuery(query, selectedOption) {
    var sortByData = splitQueryValue(selectedOption);
    var sortBy = apisearch_1["default"].createEmptySortBy();
    if (sortByData.field == 'distance') {
        sortBy.byValue({
            type: apisearch_2.SORT_BY_TYPE_DISTANCE,
            unit: sortByData.sort
                ? sortByData.sort
                : 'km'
        });
    }
    else if (sortByData.field == 'score') {
        sortBy.byValue(apisearch_2.SORT_BY_SCORE);
    }
    else {
        sortBy.byFieldValue(sortByData.field, sortByData.sort);
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
    var queryValue = string.split(":");
    return {
        field: queryValue[0],
        sort: queryValue[1]
    };
}
