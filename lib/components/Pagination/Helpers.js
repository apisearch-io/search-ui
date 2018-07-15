"use strict";
exports.__esModule = true;
/**
 * Get total pages from the total reached hits
 * divided by the hits per page configured
 *
 * If there are more than 10.000 items
 * We reduce the max num of items to 9.999
 * to take care of performance
 *
 * If total resulted pages are bigger than 999
 * we set 999 as the max number of pages
 *
 * @param totalHits
 * @param hitsPerPage
 *
 * @return {number}
 */
function getTotalPages(totalHits, hitsPerPage) {
    totalHits = (totalHits >= 10000)
        ? 9999
        : totalHits;
    var totalPages = Math.ceil(totalHits / hitsPerPage);
    return (totalPages > 999)
        ? 999
        : totalPages;
}
exports.getTotalPages = getTotalPages;
/**
 * Pass total pages number into an array of numbers
 *
 * @param totalPages
 *
 * @return {number[]}
 */
function totalPagesToArray(totalPages) {
    var pages = [];
    for (var index = 1; index <= totalPages; index++) {
        pages.push(index);
    }
    return pages;
}
exports.totalPagesToArray = totalPagesToArray;
/**
 * Get the starting point of the pages spectre
 *
 * @param totalPages
 * @param padding
 * @param currentPage
 * @param spectreSize
 * @param isTouchingLeft
 * @param isTouchingRight
 *
 * @return {number}
 */
function getStart(totalPages, padding, currentPage, spectreSize, isTouchingLeft, isTouchingRight) {
    if (isTouchingLeft) {
        return currentPage - (currentPage % spectreSize);
    }
    if (isTouchingRight) {
        var start = currentPage - (spectreSize - (totalPages % currentPage));
        return (start > 0) ? start : 0;
    }
    return currentPage - (padding + 1);
}
exports.getStart = getStart;
/**
 * Get the ending point of the pages spectre
 *
 * @param totalPages
 * @param padding
 * @param currentPage
 * @param spectreSize
 * @param isTouchingLeft
 * @param isTouchingRight
 *
 * @return {number}
 */
function getEnd(totalPages, padding, currentPage, spectreSize, isTouchingLeft, isTouchingRight) {
    if (isTouchingLeft) {
        return spectreSize;
    }
    if (isTouchingRight) {
        return totalPages;
    }
    return currentPage + padding;
}
exports.getEnd = getEnd;
