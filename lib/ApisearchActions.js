"use strict";
exports.__esModule = true;
var Constants_1 = require("./Constants");
var Container_1 = require("./Container");
/**
 * Initial data fetching action
 *
 * @param environmentId
 * @param query
 * @param repository
 */
function initialDataFetchAction(environmentId, query, repository) {
    var dispatcher = Container_1["default"].get(Constants_1.APISEARCH_DISPATCHER + "__" + environmentId);
    repository
        .query(query)
        .then(function (result) {
        dispatcher.dispatch({
            type: "RENDER_INITIAL_DATA",
            payload: {
                query: query,
                result: result
            }
        });
    });
}
exports.initialDataFetchAction = initialDataFetchAction;
