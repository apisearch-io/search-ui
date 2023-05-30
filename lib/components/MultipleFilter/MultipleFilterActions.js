"use strict";
exports.__esModule = true;
exports.configureQueryWithShadowLeveledFilters = exports.modifyQueryAggregationWithProperLevelValue = exports.filterAction = exports.aggregationSetup = void 0;
/**
 * Multiple filter actions
 */
var apisearch_1 = require("apisearch");
var Constants_1 = require("../../Constants");
var apisearch_2 = require("apisearch");
var Container_1 = require("../../Container");
var Clone_1 = require("../Clone");
/**
 * Define aggregations setup
 *
 * @param environmentId
 * @param currentQuery
 * @param filterName
 * @param filterField
 * @param aggregationField
 * @param applicationType
 * @param sortBy
 * @param fetchLimit
 * @param ranges
 * @param promoted
 */
function aggregationSetup(environmentId, currentQuery, filterName, filterField, aggregationField, applicationType, sortBy, fetchLimit, ranges, promoted) {
    var clonedQuery = Clone_1["default"].object(currentQuery);
    var rangesValues = Object.keys(ranges);
    if (rangesValues.length > 0) {
        clonedQuery.aggregateByRange(filterName, aggregationField, rangesValues, applicationType, apisearch_2.FILTER_TYPE_RANGE, sortBy, fetchLimit, promoted);
    }
    else {
        clonedQuery.aggregateBy(filterName, aggregationField, applicationType, sortBy, fetchLimit, promoted);
    }
    var dispatcher = Container_1["default"].get("".concat(Constants_1.APISEARCH_DISPATCHER, "__").concat(environmentId));
    dispatcher.dispatch("UPDATE_APISEARCH_SETUP", {
        query: clonedQuery
    });
}
exports.aggregationSetup = aggregationSetup;
/**
 * Filter action
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param filterName
 * @param filterField
 * @param aggregationField
 * @param filterValues
 * @param applicationType
 * @param sortBy
 * @param fetchLimit
 * @param ranges
 * @param labels
 * @param shadowLeveledFilters
 * @param originalFilterField
 * @param promoted
 * @param selectedFilter
 */
function filterAction(environmentId, currentQuery, repository, filterName, filterField, aggregationField, filterValues, applicationType, sortBy, fetchLimit, ranges, labels, shadowLeveledFilters, originalFilterField, promoted, selectedFilter) {
    window.postMessage({
        name: "apisearch_scroll_top"
    }, "*");
    var clonedQuery = Clone_1["default"].object(currentQuery);
    var rangesValues = Object.keys(ranges);
    if (rangesValues.length > 0) {
        clonedQuery.filterByRange(filterName, filterField, rangesValues, filterValues, applicationType, apisearch_2.FILTER_TYPE_RANGE, false, sortBy);
        clonedQuery.aggregateByRange(filterName, aggregationField, rangesValues, applicationType, apisearch_2.FILTER_TYPE_RANGE, sortBy, fetchLimit);
    }
    else {
        clonedQuery.filterBy(filterName, filterField, filterValues, applicationType, false, sortBy);
        clonedQuery.aggregateBy(filterName, aggregationField, applicationType, sortBy, fetchLimit, promoted);
    }
    if (applicationType === 6) {
        configureQueryWithShadowLeveledFilters(clonedQuery, shadowLeveledFilters, originalFilterField);
    }
    clonedQuery.page = 1;
    var dispatcher = Container_1["default"].get("".concat(Constants_1.APISEARCH_DISPATCHER, "__").concat(environmentId));
    // We must explicitly tell that a filter was added at this point
    if (selectedFilter) {
        clonedQuery.setMetadataValue("af", [filterField, selectedFilter]);
    }
    repository
        .query(clonedQuery)
        .then(function (result) {
        clonedQuery.setMetadataValue("af", []);
        dispatcher.dispatch("RENDER_FETCHED_DATA", {
            query: clonedQuery,
            result: result
        });
    })["catch"](function (error) {
        // Do nothing
    });
}
exports.filterAction = filterAction;
/**
 * @param environmentId
 * @param currentQuery
 * @param filterName
 * @param filterField
 * @param aggregationField
 */
function modifyQueryAggregationWithProperLevelValue(environmentId, currentQuery, filterName, filterField, aggregationField) {
    if (currentQuery.filters !== undefined &&
        currentQuery.filters[filterName] !== undefined) {
        var clonedQuery = Clone_1["default"].object(currentQuery);
        var fieldName = currentQuery.filters[filterName].field;
        var fieldNameParts = fieldName.split("_");
        var currentLevel = parseInt(fieldNameParts[fieldNameParts.length - 1], 10);
        var fieldNameWithoutLevel = fieldNameParts.slice(0, fieldNameParts.length - 1).join("_");
        clonedQuery.aggregations[filterName].field = fieldNameWithoutLevel + "_" + (currentLevel + 1);
        var dispatcher = Container_1["default"].get("".concat(Constants_1.APISEARCH_DISPATCHER, "__").concat(environmentId));
        dispatcher.dispatch("UPDATE_APISEARCH_SETUP", {
            query: clonedQuery
        });
    }
}
exports.modifyQueryAggregationWithProperLevelValue = modifyQueryAggregationWithProperLevelValue;
/**
 * @param query
 * @param shadowLeveledFilters
 * @param originalFilterField
 */
function configureQueryWithShadowLeveledFilters(query, shadowLeveledFilters, originalFilterField) {
    for (var it_1 = 1; it_1 < 10; it_1++) {
        var iterationFieldName = originalFilterField + "_level_" + it_1;
        delete (query.filters[iterationFieldName]);
        delete (query.aggregations[iterationFieldName]);
    }
    if (shadowLeveledFilters.length > 0) {
        var levelCounter_1 = 1;
        shadowLeveledFilters.forEach(function (filterValue) {
            var leveledFieldName = originalFilterField + "_level_" + (levelCounter_1++);
            query.filterBy(leveledFieldName, leveledFieldName, [filterValue], apisearch_1.FILTER_AT_LEAST_ONE);
        });
    }
}
exports.configureQueryWithShadowLeveledFilters = configureQueryWithShadowLeveledFilters;
