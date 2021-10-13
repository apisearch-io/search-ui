"use strict";
exports.__esModule = true;
exports.filterAction = exports.aggregationSetup = void 0;
/**
 * SortBy actions
 */
var apisearch_1 = require("apisearch");
var Constants_1 = require("../../Constants");
var Container_1 = require("../../Container");
var Clone_1 = require("../Clone");
/**
 * @param environmentId
 * @param currentQuery
 * @param filterName
 * @param filterField
 */
function aggregationSetup(environmentId, currentQuery, filterName, filterField) {
    var clonedQuery = Clone_1["default"].object(currentQuery);
    clonedQuery.aggregateByRange(filterName, filterField, ['..'], apisearch_1.FILTER_AT_LEAST_ONE, 'range_min_max');
    var dispatcher = Container_1["default"].get(Constants_1.APISEARCH_DISPATCHER + "__" + environmentId);
    dispatcher.dispatch("UPDATE_APISEARCH_SETUP", {
        query: clonedQuery
    });
}
exports.aggregationSetup = aggregationSetup;
/**
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param filterName
 * @param filterField
 * @param from
 * @param to
 * @param deleteMinMaxAggregation
 */
function filterAction(environmentId, currentQuery, repository, filterName, filterField, from, to) {
    var clonedQuery = Clone_1["default"].object(currentQuery);
    var realValueFrom = Math.min(from, to);
    var realValueTo = Math.max(from, to);
    var toWithIncluded = realValueTo + ']';
    clonedQuery.filterByRange(filterName, filterField, [], [realValueFrom + ".." + toWithIncluded], apisearch_1.FILTER_AT_LEAST_ONE, 'range_min_max', false);
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
exports.filterAction = filterAction;
