"use strict";
exports.__esModule = true;
var ClearFilters_1 = require("./ClearFilters");
var Information_1 = require("./Information");
var MultipleFilter_1 = require("./MultipleFilter");
var Pagination_1 = require("./Pagination");
var Result_1 = require("./Result");
var SearchInput_1 = require("./SearchInput");
var SortBy_1 = require("./SortBy");
var CheckboxFilter_1 = require("./CheckboxFilter");
var RangeFilter_1 = require("./RangeFilter");
var Reload_1 = require("./Reload");
/**
 * Widget factories
 */
exports["default"] = {
    searchInput: SearchInput_1["default"],
    clearFilters: ClearFilters_1["default"],
    multipleFilter: MultipleFilter_1["default"],
    sortBy: SortBy_1["default"],
    information: Information_1["default"],
    result: Result_1["default"],
    pagination: Pagination_1["default"],
    checkboxFilter: CheckboxFilter_1["default"],
    rangeFilter: RangeFilter_1["default"],
    reload: Reload_1["default"]
};
