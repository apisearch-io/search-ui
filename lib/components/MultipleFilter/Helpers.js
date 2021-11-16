"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.isLeveledFilter = exports.getFilterValuesFromQuery = exports.isFilterAvailable = exports.getShadowFilterValuesFromQuery = exports.manageCurrentFilterItems = exports.wasElementRecentlySelected = void 0;
/**
 * @param selectedItem
 * @param currentItems
 */
function wasElementRecentlySelected(selectedItem, currentItems) {
    return !currentItems.some(function (item) { return item === selectedItem; });
}
exports.wasElementRecentlySelected = wasElementRecentlySelected;
/**
 * Manage filter items
 *
 * If an item is on the list, remove it
 * else, add it!
 *
 * @param selectedItem
 * @param currentItems
 * @param wasElementRecentlySelected
 * @param deleteIfWasRemoved
 *
 * @returns {any}
 */
function manageCurrentFilterItems(selectedItem, currentItems, wasElementRecentlySelected, deleteIfWasRemoved) {
    if (!wasElementRecentlySelected) {
        return deleteIfWasRemoved
            ? currentItems.filter(function (item) { return item !== selectedItem; })
            : currentItems;
    }
    else {
        return __spreadArray(__spreadArray([], currentItems, true), [
            selectedItem,
        ], false);
    }
}
exports.manageCurrentFilterItems = manageCurrentFilterItems;
/**
 * @param query
 * @param filterName
 * @param withCurrent
 */
function getShadowFilterValuesFromQuery(query, filterName, withCurrent) {
    var fields = [];
    if (isFilterAvailable(query, filterName, 6)) {
        var fieldName = query.filters[filterName].field.substr(17);
        var fieldNameParts = fieldName.split("_");
        var currentLevel = parseInt(fieldNameParts[fieldNameParts.length - 1], 10);
        var fieldNameWithoutLevel = fieldNameParts.slice(0, fieldNameParts.length - 1).join("_");
        for (var it_1 = 1; it_1 < currentLevel; it_1++) {
            var iterationFieldName = fieldNameWithoutLevel + "_" + it_1;
            if (query.filters[iterationFieldName] !== undefined) {
                fields.push(query.filters[iterationFieldName].values[0]);
            }
        }
        if (withCurrent) {
            fields.push(query.filters[filterName].values[0]);
        }
    }
    return fields;
}
exports.getShadowFilterValuesFromQuery = getShadowFilterValuesFromQuery;
/**
 * @param query
 * @param filterName
 * @param applicationType
 */
function isFilterAvailable(query, filterName, applicationType) {
    if (applicationType === void 0) { applicationType = null; }
    return (query.filters !== undefined &&
        query.filters !== null &&
        typeof query.filters === "object" &&
        query.filters[filterName] !== undefined &&
        query.filters[filterName] !== null &&
        (applicationType === null ||
            query.filters[filterName].applicationType === applicationType ||
            query.filters[filterName].application_type === applicationType));
}
exports.isFilterAvailable = isFilterAvailable;
/**
 * @param query
 * @param filterName
 * @param applicationType
 */
function getFilterValuesFromQuery(query, filterName, applicationType) {
    if (applicationType === void 0) { applicationType = null; }
    return isFilterAvailable(query, filterName, applicationType)
        ? query.filters[filterName].values
        : [];
}
exports.getFilterValuesFromQuery = getFilterValuesFromQuery;
/**
 * @param filter
 */
function isLeveledFilter(filter) {
    return filter.application_type === 6 ||
        filter.applicationType === 6;
}
exports.isLeveledFilter = isLeveledFilter;
