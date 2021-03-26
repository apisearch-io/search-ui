"use strict";
exports.__esModule = true;
exports.onChangeSearchAction = exports.deleteMinMaxAggregation = exports.addMinMaxAggregation = void 0;
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
function addMinMaxAggregation(environmentId, currentQuery, filterName, filterField) {
    var clonedQuery = Clone_1["default"].object(currentQuery);
    clonedQuery.aggregateByRange(filterName, filterField, ['..'], apisearch_1.FILTER_MUST_ALL, 'range_min_max');
    var dispatcher = Container_1["default"].get(Constants_1.APISEARCH_DISPATCHER + "__" + environmentId);
    dispatcher.dispatch("UPDATE_APISEARCH_SETUP", {
        query: clonedQuery
    });
}
exports.addMinMaxAggregation = addMinMaxAggregation;
/**
 * @param environmentId
 * @param currentQuery
 * @param filterName
 */
function deleteMinMaxAggregation(environmentId, currentQuery, filterName) {
    var clonedQuery = Clone_1["default"].object(currentQuery);
    delete clonedQuery.aggregations[filterName];
    var dispatcher = Container_1["default"].get(Constants_1.APISEARCH_DISPATCHER + "__" + environmentId);
    dispatcher.dispatch("UPDATE_APISEARCH_SETUP", {
        query: clonedQuery
    });
}
exports.deleteMinMaxAggregation = deleteMinMaxAggregation;
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
function onChangeSearchAction(environmentId, currentQuery, repository, filterName, filterField, from, to, deleteMinMaxAggregation) {
    var clonedQuery = Clone_1["default"].object(currentQuery);
    var toWithIncluded = to + ']';
    clonedQuery.filterByRange(filterName, filterField, [], [from + ".." + toWithIncluded], apisearch_1.FILTER_AT_LEAST_ONE, apisearch_1.FILTER_TYPE_RANGE, false);
    if (deleteMinMaxAggregation) {
        delete clonedQuery.aggregations[filterName];
    }
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
