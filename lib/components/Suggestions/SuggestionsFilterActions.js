"use strict";
exports.__esModule = true;
exports.enableSuggestions = void 0;
var Constants_1 = require("../../Constants");
var Container_1 = require("../../Container");
var Clone_1 = require("../Clone");
/**
 * @param environmentId
 * @param currentQuery
 * @param numberOfSuggestions
 */
function enableSuggestions(environmentId, currentQuery, numberOfSuggestions) {
    var clonedQuery = Clone_1["default"].object(currentQuery);
    if (numberOfSuggestions > 0) {
        clonedQuery.setNumberOfSuggestions(numberOfSuggestions);
    }
    var dispatcher = Container_1["default"].get(Constants_1.APISEARCH_DISPATCHER + "__" + environmentId);
    dispatcher.dispatch("UPDATE_APISEARCH_SETUP", {
        query: clonedQuery
    });
}
exports.enableSuggestions = enableSuggestions;
