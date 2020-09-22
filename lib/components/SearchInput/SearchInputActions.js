"use strict";
exports.__esModule = true;
var cloneDeep = require("clone-deep");
var Constants_1 = require("../../Constants");
var Container_1 = require("../../Container");
/**
 * Search action
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param queryText
 * @param visibleResults
 */
function simpleSearchAction(environmentId, currentQuery, repository, queryText, visibleResults) {
    var dispatcher = Container_1["default"].get(Constants_1.APISEARCH_DISPATCHER + "__" + environmentId);
    var clonedQuery = cloneDeep(currentQuery);
    clonedQuery.filters._query.values = [queryText];
    clonedQuery.page = 1;
    if (!visibleResults) {
        dispatcher.dispatch({
            type: "RENDER_FETCHED_DATA",
            payload: {
                query: clonedQuery,
                result: null,
                visibleResults: visibleResults
            }
        });
        return;
    }
    repository
        .query(clonedQuery)
        .then(function (result) {
        dispatcher.dispatch({
            type: "RENDER_FETCHED_DATA",
            payload: {
                query: clonedQuery,
                result: result,
                visibleResults: visibleResults
            }
        });
    })["catch"](function (error) {
        // Do nothing
    });
}
exports.simpleSearchAction = simpleSearchAction;
