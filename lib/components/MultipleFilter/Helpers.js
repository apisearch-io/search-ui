"use strict";
exports.__esModule = true;
/**
 * Manage filter items
 *
 * If an item is on the list, remove it
 * else, add it!
 *
 * @param selectedItem
 * @param currentItems
 *
 * @returns {[null,null]}
 */
function manageCurrentFilterItems(selectedItem, currentItems) {
    var isElementActive = currentItems
        .some(function (item) { return item === selectedItem; });
    if (isElementActive) {
        return currentItems
            .filter(function (item) { return item !== selectedItem; });
    }
    else {
        return currentItems.concat([
            selectedItem,
        ]);
    }
}
exports.manageCurrentFilterItems = manageCurrentFilterItems;
