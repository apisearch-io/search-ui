"use strict";
exports.__esModule = true;
exports.clearFiltersAction = void 0;
var Constants_1 = require("../../Constants");
var Container_1 = require("../../Container");
var Clone_1 = require("../Clone");
/**
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param filterToClear
 * @param filterValueToClear
 */
function clearFiltersAction(environmentId, currentQuery, repository, filterToClear, filterValueToClear) {
    if (filterToClear === void 0) { filterToClear = null; }
    if (filterValueToClear === void 0) { filterValueToClear = null; }
    window.postMessage({
        name: "apisearch_scroll_top"
    }, "*");
    var clonedQuery = Clone_1["default"].object(currentQuery);
    if (filterToClear === null) {
        clonedQuery.filters = {
            _query: currentQuery.getFilter("_query")
        };
    }
    else if (filterValueToClear === null) {
        delete clonedQuery.filters[filterToClear];
    }
    else {
        var values = clonedQuery.filters[filterToClear].values;
        var valueIndex = values.indexOf(filterValueToClear, 0);
        if (valueIndex > -1) {
            clonedQuery.filters[filterToClear].values.splice(valueIndex, 1);
        }
    }
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
exports.clearFiltersAction = clearFiltersAction;
