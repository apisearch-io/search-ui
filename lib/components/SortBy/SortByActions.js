"use strict";
exports.__esModule = true;
exports.onChangeSearchAction = exports.initialSortBySetup = void 0;
var Constants_1 = require("../../Constants");
var Container_1 = require("../../Container");
var Clone_1 = require("../Clone");
var SortByHelper_1 = require("./SortByHelper");
/**
 * Initial sortBy
 *
 * @param environmentId
 * @param currentQuery
 * @param initialOption
 */
function initialSortBySetup(environmentId, currentQuery, initialOption) {
    var dispatcher = Container_1["default"].get("".concat(Constants_1.APISEARCH_DISPATCHER, "__").concat(environmentId));
    var clonedQuery = Clone_1["default"].object(currentQuery);
    (0, SortByHelper_1.applySortByToQuery)(clonedQuery, initialOption);
    clonedQuery.page = 1;
    dispatcher.dispatch("UPDATE_APISEARCH_SETUP", {
        query: clonedQuery
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
    window.postMessage({
        name: "apisearch_scroll_top"
    }, "*");
    var clonedQuery = Clone_1["default"].object(currentQuery);
    (0, SortByHelper_1.applySortByToQuery)(clonedQuery, selectedOption);
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
