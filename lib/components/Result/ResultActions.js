"use strict";
exports.__esModule = true;
exports.infiniteScrollNextPageAction = exports.configureQuery = void 0;
/**
 * Search actions
 */
var apisearch_1 = require("apisearch");
var Constants_1 = require("../../Constants");
var Container_1 = require("../../Container");
var Clone_1 = require("../Clone");
/**
 *
 * Configure query
 *
 * @param environmentId
 * @param currentQuery
 * @param itemsPerPage
 * @param highlightsEnabled
 * @param promotedUUIDs
 * @param excludedUUIDs
 * @param fields
 * @param filter
 * @param minScore
 */
function configureQuery(environmentId, currentQuery, itemsPerPage, highlightsEnabled, promotedUUIDs, excludedUUIDs, fields, filter, minScore) {
    var clonedQuery = Clone_1["default"].object(currentQuery);
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
     * Promoted uuids
     */
    for (var i in promotedUUIDs) {
        if (promotedUUIDs[i] instanceof apisearch_1.ItemUUID) {
            clonedQuery.promoteUUID(promotedUUIDs[i]);
        }
    }
    /**
     * excluded uuids
     */
    for (var i in excludedUUIDs) {
        if (excludedUUIDs[i] instanceof apisearch_1.ItemUUID) {
            clonedQuery.excludeUUID(excludedUUIDs[i]);
        }
    }
    if (minScore > 0) {
        clonedQuery.minScore = minScore;
    }
    var dispatcher = Container_1["default"].get("".concat(Constants_1.APISEARCH_DISPATCHER, "__").concat(environmentId));
    dispatcher.dispatch("UPDATE_APISEARCH_SETUP", {
        query: clonedQuery
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
    var clonedQuery = Clone_1["default"].object(currentQuery);
    clonedQuery.page = nextPage;
    var dispatcher = Container_1["default"].get("".concat(Constants_1.APISEARCH_DISPATCHER, "__").concat(environmentId));
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
exports.infiniteScrollNextPageAction = infiniteScrollNextPageAction;
