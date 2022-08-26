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
<<<<<<< HEAD
    window.postMessage({
        name: "apisearch_scroll_top"
    }, "*");
=======
    var _a, _b, _c, _d;
>>>>>>> WIP
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
    var mode = (_a = clonedQuery.metadata.mode) !== null && _a !== void 0 ? _a : {};
    clonedQuery.metadata.number_of_suggestions = clonedQuery.getNumberOfSuggestions();
    ((_b = mode.suggestions) !== null && _b !== void 0 ? _b : true) ? clonedQuery.setNumberOfSuggestions(clonedQuery.metadata.number_of_suggestions)
        : clonedQuery.disableSuggestions();
    ((_c = mode.aggregations) !== null && _c !== void 0 ? _c : true) ? clonedQuery.enableAggregations()
        : clonedQuery.disableAggregations();
    ((_d = mode.results) !== null && _d !== void 0 ? _d : true) ? clonedQuery.enableResults()
        : clonedQuery.disableResults();
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
