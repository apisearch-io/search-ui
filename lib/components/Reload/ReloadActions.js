"use strict";
exports.__esModule = true;
exports.reloadAction = void 0;
/**
 * Clear filters actions
 */
var apisearch_1 = require("apisearch");
var Constants_1 = require("../../Constants");
var Container_1 = require("../../Container");
var Clone_1 = require("../Clone");
/**
 * Clear filters action
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 */
function reloadAction(environmentId, currentQuery, repository) {
    window.postMessage({
        name: "apisearch_scroll_top"
    }, "*");
    var clonedQuery = Clone_1["default"].object(currentQuery);
    var dispatcher = Container_1["default"].get(Constants_1.APISEARCH_DISPATCHER + "__" + environmentId);
    if (repository instanceof apisearch_1.HttpRepository) {
        var httpClient = repository.getHttpClient();
        if (httpClient instanceof apisearch_1.CacheClient) {
            httpClient.flushCache();
        }
    }
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
exports.reloadAction = reloadAction;
