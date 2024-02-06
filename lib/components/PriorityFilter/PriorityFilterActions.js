"use strict";
exports.__esModule = true;
exports.priorityFilterAction = exports.setupPriorityFilters = void 0;
var Constants_1 = require("../../Constants");
var Container_1 = require("../../Container");
var Clone_1 = require("../Clone");
function setupPriorityFilters(environmentId, currentQuery, filters) {
    var clonedQuery = Clone_1["default"].object(currentQuery);
    clonedQuery.setMetadataValue("pf", filters);
    var dispatcher = Container_1["default"].get("".concat(Constants_1.APISEARCH_DISPATCHER, "__").concat(environmentId));
    dispatcher.dispatch("UPDATE_APISEARCH_SETUP", {
        query: clonedQuery
    });
}
exports.setupPriorityFilters = setupPriorityFilters;
/**
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param filterName
 * @param filterField
 * @param filterValue
 * @param applicationType
 */
function priorityFilterAction(environmentId, currentQuery, repository, filterName, filterField, filterValue, applicationType) {
    window.postMessage({
        name: "apisearch_scroll_top"
    }, "*");
    var clonedQuery = Clone_1["default"].object(currentQuery);
    clonedQuery.filterBy(filterName, filterField, [filterValue], applicationType, false);
    clonedQuery.page = 1;
    var dispatcher = Container_1["default"].get("".concat(Constants_1.APISEARCH_DISPATCHER, "__").concat(environmentId));
    clonedQuery.setMetadataValue("af", [filterField, filterValue]);
    repository
        .query(clonedQuery)
        .then(function (result) {
        delete clonedQuery.metadata.af;
        dispatcher.dispatch("RENDER_FETCHED_DATA", {
            query: clonedQuery,
            result: result
        });
    })["catch"](function (error) {
        // Do nothing
    });
}
exports.priorityFilterAction = priorityFilterAction;
