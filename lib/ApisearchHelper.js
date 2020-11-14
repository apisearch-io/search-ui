"use strict";
exports.__esModule = true;
var SortByHelper_1 = require("./components/SortBy/SortByHelper");
/**
 * ApisearchUI class
 */
var ApisearchHelper = /** @class */ (function () {
    function ApisearchHelper() {
    }
    /**
     * Click
     *
     * @param query
     * @param sort_by
     *
     * @return {any}
     */
    ApisearchHelper.prototype.sortBy = function (query, sort_by) {
        SortByHelper_1.applySortByToQuery(query, sort_by);
    };
    return ApisearchHelper;
}());
exports["default"] = ApisearchHelper;
