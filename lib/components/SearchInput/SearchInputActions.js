"use strict";
exports.__esModule = true;
exports.simpleSearchAction = exports.initialSearchSetup = void 0;
var Constants_1 = require("../../Constants");
var Container_1 = require("../../Container");
var Clone_1 = require("../Clone");
/**
 * Initial Search
 *
 * @param environmentId
 * @param currentQuery
 * @param autocomplete
 * @param searchableFields
 * @param queryOperator
 */
function initialSearchSetup(environmentId, currentQuery, autocomplete, searchableFields, queryOperator) {
    var dispatcher = Container_1["default"].get(Constants_1.APISEARCH_DISPATCHER + "__" + environmentId);
    var clonedQuery = Clone_1["default"].object(currentQuery);
    clonedQuery.page = 1;
    clonedQuery.queryOperator = queryOperator;
    if (searchableFields.length > 0) {
        clonedQuery.searchableFields = searchableFields;
    }
    if (autocomplete) {
        clonedQuery.enableAutocomplete();
    }
    dispatcher.dispatch("UPDATE_APISEARCH_SETUP", {
        query: clonedQuery
    });
}
exports.initialSearchSetup = initialSearchSetup;
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
    window.postMessage({
        name: "apisearch_scroll_top"
    }, "*");
    var dispatcher = Container_1["default"].get(Constants_1.APISEARCH_DISPATCHER + "__" + environmentId);
    var clonedQuery = Clone_1["default"].object(currentQuery);
    clonedQuery.filters._query.values = [queryText];
    clonedQuery.page = 1;
    if (!visibleResults) {
        dispatcher.dispatch("RENDER_FETCHED_DATA", {
            query: clonedQuery,
            result: null,
            visibleResults: visibleResults
        });
        return;
    }
    repository
        .query(clonedQuery)
        .then(function (result) {
        dispatcher.dispatch("RENDER_FETCHED_DATA", {
            query: clonedQuery,
            result: result,
            visibleResults: visibleResults
        });
    })["catch"](function (error) {
        // Do nothing
    });
}
exports.simpleSearchAction = simpleSearchAction;
