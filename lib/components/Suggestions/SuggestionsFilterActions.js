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
 * @param firstSuggestionCategories
 */
function enableSuggestions(environmentId, currentQuery, numberOfSuggestions, firstSuggestionCategories) {
    var clonedQuery = Clone_1["default"].object(currentQuery);
    if (numberOfSuggestions > 0) {
        clonedQuery.setNumberOfSuggestions(numberOfSuggestions);
    }
    if (firstSuggestionCategories) {
        clonedQuery.setMetadataValue("first_suggestion_categories", true);
    }
    var dispatcher = Container_1["default"].get(Constants_1.APISEARCH_DISPATCHER + "__" + environmentId);
    dispatcher.dispatch("UPDATE_APISEARCH_SETUP", {
        query: clonedQuery
    });
}
exports.enableSuggestions = enableSuggestions;
