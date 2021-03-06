"use strict";
exports.__esModule = true;
exports.paginationChangeAction = void 0;
var Constants_1 = require("../../Constants");
var Container_1 = require("../../Container");
var Clone_1 = require("../Clone");
/**
 * Pagination change
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param selectedPage
 */
function paginationChangeAction(environmentId, currentQuery, repository, selectedPage) {
    var clonedQuery = Clone_1["default"].object(currentQuery);
    clonedQuery.page = selectedPage;
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
exports.paginationChangeAction = paginationChangeAction;
