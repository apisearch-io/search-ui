"use strict";
exports.__esModule = true;
var cloneDeep = require("clone-deep");
var Constants_1 = require("../../Constants");
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
 */
function aggregationSetup(environmentId, currentQuery, filterName, aggregationField, applicationType, sortBy, fetchLimit) {
    var clonedQuery = cloneDeep(currentQuery);
    clonedQuery.aggregateBy(filterName, aggregationField, applicationType, sortBy, fetchLimit);
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
 */
function filterAction(environmentId, currentQuery, repository, filterName, filterField, aggregationField, filterValues, applicationType, sortBy, fetchLimit) {
    var clonedQuery = cloneDeep(currentQuery);
    clonedQuery.filterBy(filterName, filterField, filterValues, applicationType, false, sortBy);
    clonedQuery.aggregateBy(filterName, aggregationField, applicationType, sortBy, fetchLimit);
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
