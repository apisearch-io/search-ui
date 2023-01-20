"use strict";
exports.__esModule = true;
exports.onChangeSearchAction = exports.aggregationSetup = void 0;
/**
 * Checkbox filter actions
 */
var apisearch_1 = require("apisearch");
var Constants_1 = require("../../Constants");
var Container_1 = require("../../Container");
var Clone_1 = require("../Clone");
/**
 * Define aggregations setup
 *
 * @param environmentId
 * @param currentQuery
 * @param filterName
 * @param aggregationField
 */
function aggregationSetup(environmentId, currentQuery, filterName, aggregationField) {
    var clonedQuery = Clone_1["default"].object(currentQuery);
    clonedQuery.aggregateBy(filterName, aggregationField, apisearch_1.FILTER_TYPE_FIELD);
    var dispatcher = Container_1["default"].get("".concat(Constants_1.APISEARCH_DISPATCHER, "__").concat(environmentId));
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
 * @param isChecked
 * @param filterValue
 */
function onChangeSearchAction(environmentId, currentQuery, repository, filterName, filterField, isChecked, filterValue) {
    window.postMessage({
        name: "apisearch_scroll_top"
    }, "*");
    var clonedQuery = Clone_1["default"].object(currentQuery);
    clonedQuery.filterBy(filterName, filterField, isChecked
        ? [filterValue]
        : [], apisearch_1.FILTER_MUST_ALL, false);
    clonedQuery.page = 1;
    var dispatcher = Container_1["default"].get("".concat(Constants_1.APISEARCH_DISPATCHER, "__").concat(environmentId));
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
