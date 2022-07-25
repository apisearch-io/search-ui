"use strict";
exports.__esModule = true;
exports.clearFiltersAction = void 0;
var Constants_1 = require("../../Constants");
var Container_1 = require("../../Container");
var Clone_1 = require("../Clone");
/**
 * Clear filters action
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param filterToClear
 */
function clearFiltersAction(environmentId, currentQuery, repository, filterToClear) {
    if (filterToClear === void 0) { filterToClear = null; }
    window.postMessage({
        name: "apisearch_scroll_top"
    }, "*");
    var clonedQuery = Clone_1["default"].object(currentQuery);
    if (filterToClear === null) {
        clonedQuery.filters = {
            _query: currentQuery.getFilter("_query")
        };
    }
    else {
        delete clonedQuery.filters[filterToClear];
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
exports.clearFiltersAction = clearFiltersAction;
