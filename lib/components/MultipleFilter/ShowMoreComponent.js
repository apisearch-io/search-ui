"use strict";
exports.__esModule = true;
var preact_1 = require("preact");
var Template_1 = require("../Template");
/**
 * Show more component
 *
 * Provides two items
 *   -> Show more element
 *   -> Show less element
 */
var ShowMoreComponent = function (_a) {
    var allItemsLength = _a.allItemsLength, currentLimit = _a.currentLimit, handleShowMore = _a.handleShowMore, handleShowLess = _a.handleShowLess, showMoreContainerClassName = _a.showMoreContainerClassName, showMoreTemplate = _a.showMoreTemplate, showLessTemplate = _a.showLessTemplate, dictionary = _a.dictionary;
    return (allItemsLength > currentLimit)
        ? ((0, preact_1.h)("div", { className: "as-showMore " + showMoreContainerClassName, onClick: handleShowMore },
            (0, preact_1.h)(Template_1["default"], { template: showMoreTemplate, className: "as-showMore--more", dictionary: dictionary })))
        : (allItemsLength === currentLimit)
            ? ((0, preact_1.h)("div", { className: "as-showMore " + showMoreContainerClassName, onClick: handleShowLess },
                (0, preact_1.h)(Template_1["default"], { template: showLessTemplate, className: "as-showMore--less", dictionary: dictionary })))
            : null;
};
exports["default"] = ShowMoreComponent;
