"use strict";
exports.__esModule = true;
var cloneDeep = require("clone-deep");
var Constants_1 = require("../../Constants");
var apisearch_1 = require("apisearch");
var Container_1 = require("../../Container");
/**
 * Define aggregations setup
 *
 * @param environmentId
 * @param currentQuery
 * @param filterName
 * @param aggregationField
 * @param applicationType
 * @param sortBy
 * @param fetchLimit
 * @param ranges
 */
function aggregationSetup(environmentId, currentQuery, filterName, aggregationField, applicationType, sortBy, fetchLimit, ranges) {
    var clonedQuery = cloneDeep(currentQuery);
    var rangesValues = Object.keys(ranges);
    if (rangesValues.length > 0) {
        clonedQuery.aggregateByRange(filterName, aggregationField, rangesValues, applicationType, apisearch_1.FILTER_TYPE_RANGE, sortBy, fetchLimit);
    }
    else {
        clonedQuery.aggregateBy(filterName, aggregationField, applicationType, sortBy, fetchLimit);
    }
    var dispatcher = Container_1["default"].get(Constants_1.APISEARCH_DISPATCHER + "__" + environmentId);
    dispatcher.dispatch({
        type: "UPDATE_APISEARCH_SETUP",
        payload: {
            query: clonedQuery
        }
    });
}
exports.aggregationSetup = aggregationSetup;
/**
 * Filter action
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param filterName
 * @param filterField
 * @param aggregationField
 * @param filterValues
 * @param applicationType
 * @param sortBy
 * @param fetchLimit
 * @param ranges
 * @param labels
 */
function filterAction(environmentId, currentQuery, repository, filterName, filterField, aggregationField, filterValues, applicationType, sortBy, fetchLimit, ranges, labels) {
    var clonedQuery = cloneDeep(currentQuery);
    var rangesValues = Object.keys(ranges);
    if (rangesValues.length > 0) {
        clonedQuery.filterByRange(filterName, filterField, rangesValues, filterValues, applicationType, apisearch_1.FILTER_TYPE_RANGE, false, sortBy);
        clonedQuery.aggregateByRange(filterName, aggregationField, rangesValues, applicationType, apisearch_1.FILTER_TYPE_RANGE, sortBy, fetchLimit);
    }
    else {
        clonedQuery.filterBy(filterName, filterField, filterValues, applicationType, false, sortBy);
        clonedQuery.aggregateBy(filterName, aggregationField, applicationType, sortBy, fetchLimit);
    }
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
        return null;
    });
}
exports.filterAction = filterAction;
