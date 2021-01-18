"use strict";
exports.__esModule = true;
exports.infiniteScrollNextPageAction = exports.configureQuery = void 0;
var cloneDeep = require("clone-deep");
var Constants_1 = require("../../Constants");
var Container_1 = require("../../Container");
/**
 *
 * Configure query
 *
 * @param environmentId
 * @param currentQuery
 * @param itemsPerPage
 * @param highlightsEnabled
 * @param suggestionsEnabled
 * @param promotedUUIDs
 * @param excludedUUIDs
 * @param fields
 * @param filter
 * @param minScore
 */
function configureQuery(environmentId, currentQuery, itemsPerPage, highlightsEnabled, suggestionsEnabled, promotedUUIDs, excludedUUIDs, fields, filter, minScore) {
    var clonedQuery = cloneDeep(currentQuery);
    filter(clonedQuery);
    /**
     * Set result size
     */
    clonedQuery.size = itemsPerPage;
    /**
     * Set specific fields
     */
    clonedQuery.setFields(fields);
    /**
     * Enabling highlights on query result
     */
    if (highlightsEnabled) {
        clonedQuery.enableHighlights();
    }
    /**
     * Enabling highlights on query result
     */
    if (suggestionsEnabled) {
        clonedQuery.enableSuggestions();
        if (suggestionsEnabled == true) {
            clonedQuery.setMetadataValue('number_of_suggestions', null);
        }
        else if (suggestionsEnabled > 0) {
            clonedQuery.setMetadataValue('number_of_suggestions', suggestionsEnabled);
        }
    }
    /**
     * Promoted uuids
     */
    for (var i in promotedUUIDs) {
        clonedQuery.promoteUUID(promotedUUIDs[i]);
    }
    /**
     * excluded uuids
     */
    for (var i in excludedUUIDs) {
        clonedQuery.excludeUUID(excludedUUIDs[i]);
    }
    if (minScore > 0) {
        clonedQuery.minScore = minScore;
    }
    var dispatcher = Container_1["default"].get(Constants_1.APISEARCH_DISPATCHER + "__" + environmentId);
    dispatcher.dispatch({
        type: "UPDATE_APISEARCH_SETUP",
        payload: {
            query: clonedQuery
        }
    });
}
exports.configureQuery = configureQuery;
/**
 * Pagination change
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param nextPage
 */
function infiniteScrollNextPageAction(environmentId, currentQuery, repository, nextPage) {
    var clonedQuery = cloneDeep(currentQuery);
    clonedQuery.page = nextPage;
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
exports.infiniteScrollNextPageAction = infiniteScrollNextPageAction;
