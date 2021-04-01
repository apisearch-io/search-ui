"use strict";
exports.__esModule = true;
exports.onWordClickAction = exports.enableSuggestions = void 0;
var Constants_1 = require("../../Constants");
var Container_1 = require("../../Container");
var Clone_1 = require("../Clone");
/**
 * @param environmentId
 * @param currentQuery
 */
function enableSuggestions(environmentId, currentQuery) {
    var clonedQuery = Clone_1["default"].object(currentQuery);
    clonedQuery.enableSuggestions();
    var dispatcher = Container_1["default"].get(Constants_1.APISEARCH_DISPATCHER + "__" + environmentId);
    dispatcher.dispatch("UPDATE_APISEARCH_SETUP", {
        query: clonedQuery
    });
}
exports.enableSuggestions = enableSuggestions;
/**
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param word
 */
function onWordClickAction(environmentId, currentQuery, repository, word) {
    var clonedQuery = Clone_1["default"].object(currentQuery);
    clonedQuery.filters._query.values = [word];
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
exports.onWordClickAction = onWordClickAction;
