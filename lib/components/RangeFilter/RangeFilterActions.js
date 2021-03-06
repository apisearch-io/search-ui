"use strict";
exports.__esModule = true;
exports.onChangeSearchAction = void 0;
/**
 * SortBy actions
 */
var apisearch_1 = require("apisearch");
var Constants_1 = require("../../Constants");
var Container_1 = require("../../Container");
var Clone_1 = require("../Clone");
/**
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param filterName
 * @param filterField
 * @param minValue
 * @param maxValue
 * @param from
 * @param to
 */
function onChangeSearchAction(environmentId, currentQuery, repository, filterName, filterField, minValue, maxValue, from, to) {
    var clonedQuery = Clone_1["default"].object(currentQuery);
    clonedQuery.filterByRange(filterName, filterField, [], [from + ".." + to], apisearch_1.FILTER_AT_LEAST_ONE, apisearch_1.FILTER_TYPE_RANGE, false);
    clonedQuery.page = 1;
    var dispatcher = Container_1["default"].get(Constants_1.APISEARCH_DISPATCHER + "__" + environmentId);
    repository
        .query(clonedQuery)
        .then(function (result) {
        dispatcher.dispatch("RENDER_FETCHED_DATA", {
            query: clonedQuery,
            result: result
        });
    })["catch"](function (error) {
        // Do nothing
    });
}
exports.onChangeSearchAction = onChangeSearchAction;
