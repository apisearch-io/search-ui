"use strict";
exports.__esModule = true;
var cloneDeep = require("clone-deep");
var Constants_1 = require("../../Constants");
var Container_1 = require("../../Container");
/**
 *
 * Change items per result page setup
 *
 * @param environmentId
 * @param currentQuery
 * @param itemsPerPage
 * @param highlightsEnabled
 * @param promotedUUIDs
 * @param excludedUUIDs
 */
function changeItemsPerResultPageSetup(environmentId, currentQuery, itemsPerPage, highlightsEnabled, promotedUUIDs, excludedUUIDs) {
    var clonedQuery = cloneDeep(currentQuery);
    /**
     * Set result size
     */
    clonedQuery.size = itemsPerPage;
    /**
     * Enabling highlights on query result
     */
    if (highlightsEnabled) {
        clonedQuery.enableHighlights();
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
    var dispatcher = Container_1["default"].get(Constants_1.APISEARCH_DISPATCHER + "__" + environmentId);
    dispatcher.dispatch({
        type: "UPDATE_APISEARCH_SETUP",
        payload: {
            query: clonedQuery
        }
    });
}
exports.changeItemsPerResultPageSetup = changeItemsPerResultPageSetup;
