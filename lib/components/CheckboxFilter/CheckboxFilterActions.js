"use strict";
exports.__esModule = true;
exports.onChangeSearchAction = exports.aggregationSetup = void 0;
var apisearch_1 = require("apisearch");
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
 */
function aggregationSetup(environmentId, currentQuery, filterName, aggregationField) {
    var clonedQuery = cloneDeep(currentQuery);
    clonedQuery.aggregateBy(filterName, aggregationField, apisearch_1.FILTER_TYPE_FIELD);
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
 * ON change search action
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param selectedOption
 */
function onChangeSearchAction(environmentId, currentQuery, repository, filterName, filterField, isChecked) {
    var clonedQuery = cloneDeep(currentQuery);
    clonedQuery.filterBy(filterName, filterField, isChecked
        ? ["true"]
        : [], apisearch_1.FILTER_MUST_ALL, false);
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
