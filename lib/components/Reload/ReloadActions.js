"use strict";
exports.__esModule = true;
exports.reloadAction = void 0;
var cloneDeep = require("clone-deep");
var Constants_1 = require("../../Constants");
var Container_1 = require("../../Container");
/**
 * Clear filters action
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 */
function reloadAction(environmentId, currentQuery, repository) {
    var clonedQuery = cloneDeep(currentQuery);
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
exports.reloadAction = reloadAction;
