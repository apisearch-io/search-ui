"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var apisearch_1 = require("apisearch");
var preact_1 = require("preact");
var Template_1 = require("../Template");
var ClearFiltersActions_1 = require("./ClearFiltersActions");
/**
 * Result Information Component
 */
var ClearFiltersComponent = /** @class */ (function (_super) {
    __extends(ClearFiltersComponent, _super);
    /**
     * Constructor
     */
    function ClearFiltersComponent() {
        var _this = _super.call(this) || this;
        /**
         * Handle click
         */
        _this.handleClick = function () {
            var props = _this.props;
            var environmentId = props.environmentId;
            var currentQuery = props.store.getCurrentQuery();
            var repository = props.repository;
            _this.setState(function (prevState) {
                return {
                    appliedFilters: [],
                    showClearFilters: false
                };
            });
            /**
             * Dispatch a clear filter action
             */
            (0, ClearFiltersActions_1.clearFiltersAction)(environmentId, currentQuery, repository);
        };
        /**
         * Handle individual click
         */
        _this.handleIndividualClick = function (filterKey, filterValue) {
            var props = _this.props;
            var environmentId = props.environmentId;
            var currentQuery = props.store.getCurrentQuery();
            var repository = props.repository;
            /**
             * Dispatch a clear filter action
             */
            (0, ClearFiltersActions_1.clearFiltersAction)(environmentId, currentQuery, repository, filterKey, filterValue);
        };
        _this.state = {
            appliedFilters: [],
            showClearFilters: false
        };
        return _this;
    }
    /**
     * Component receive props
     *
     * @param props
     */
    ClearFiltersComponent.prototype.componentWillReceiveProps = function (props) {
        var appliedFiltersFormatted = this.getFiltersToShow();
        this.setState(function (prevState) {
            return {
                appliedFilters: appliedFiltersFormatted,
                showClearFilters: appliedFiltersFormatted.length > 0
            };
        });
    };
    /**
     * @param filterToAvoid
     */
    ClearFiltersComponent.prototype.getFiltersToShow = function (filterToAvoid) {
        if (filterToAvoid === void 0) { filterToAvoid = null; }
        var appliedFilters = this.props.store.getCurrentQuery().getFilters();
        var appliedFiltersFormatted = [];
        for (var _i = 0, _a = Object.entries(appliedFilters); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], filter = _b[1];
            if (filter instanceof apisearch_1.Filter && (key !== "_query") && (key !== filterToAvoid)) {
                appliedFiltersFormatted.push({
                    filter: key,
                    num: filter.getValues().length,
                    values: filter.getValues()
                });
            }
        }
        return appliedFiltersFormatted;
    };
    /**
     * Render
     *
     * @return {}
     */
    ClearFiltersComponent.prototype.render = function () {
        var _this = this;
        var props = this.props;
        var containerClassName = props.classNames.container;
        var filtersListClassName = props.classNames.filtersList;
        var filterClassName = props.classNames.filter;
        var containerTemplate = props.template.container;
        var appliedFiltersFormatted = this.state.appliedFilters;
        var individualFilterClear = null;
        var isEmptyClass = (this.state.appliedFilters.length === 0) ? "empty" : "";
        if (props.showIndividualFilterValueClear) {
            var values_1 = [];
            this.state.appliedFilters.forEach(function (filter) {
                filter.values.forEach(function (value) { return values_1.push({
                    filter: filter.filter,
                    value: value
                }); });
            });
            individualFilterClear = (0, preact_1.h)("ul", { className: "as-clearFilters__filtersList ".concat(filtersListClassName) }, values_1.map(function (filter) {
                var _a, _b;
                var isFilterPrice = filter &&
                    typeof filter.value === "string" &&
                    filter.value.indexOf("..") >= 0;
                var template = isFilterPrice
                    ? _this.props.template.filter_price
                    : _this.props.template.filter;
                if (isFilterPrice) {
                    filter.parts = filter.value.replace(/[\[\]]/, "").split("..");
                    if (((_a = filter.parts[0]) !== null && _a !== void 0 ? _a : "") === "0") {
                        template = _this.props.template.filter_price_only_to;
                    }
                    else if (((_b = filter.parts[1]) !== null && _b !== void 0 ? _b : "") === "") {
                        template = _this.props.template.filter_price_only_from;
                    }
                }
                filter.valueForClick = filter.value;
                if (typeof filter.value === "boolean") {
                    filter = JSON.parse(JSON.stringify(filter));
                    filter.value = filter.filter;
                }
                return (0, preact_1.h)("li", { className: "as-clearFilters__filter ".concat(filterClassName), onClick: function () { return _this.handleIndividualClick(filter.filter, filter.valueForClick); } },
                    (0, preact_1.h)(Template_1["default"], { template: template, dictionary: _this.props.dictionary, data: filter }));
            }));
        }
        else if (props.showIndividualFilterClear) {
            individualFilterClear = (0, preact_1.h)("ul", { className: "as-clearFilters__filtersList ".concat(filtersListClassName) }, appliedFiltersFormatted.map(function (filter) {
                return (0, preact_1.h)("li", { className: "as-clearFilters__filter ".concat(filterClassName), onClick: function () { return _this.handleIndividualClick(filter.filter, null); } },
                    (0, preact_1.h)(Template_1["default"], { template: _this.props.template.filter, dictionary: _this.props.dictionary, data: filter }));
            }));
        }
        return (this.state.showClearFilters)
            ? ((0, preact_1.h)("div", { className: "as-clearFilters ".concat(containerClassName, " ").concat(isEmptyClass) },
                props.showGlobalFilterClear
                    ? (0, preact_1.h)("div", { onClick: this.handleClick },
                        (0, preact_1.h)(Template_1["default"], { template: containerTemplate, dictionary: this.props.dictionary }))
                    : "",
                individualFilterClear)) : null;
    };
    return ClearFiltersComponent;
}(preact_1.Component));
ClearFiltersComponent.defaultProps = {
    classNames: {
        container: "",
        filter: "",
        filtersList: ""
    },
    showGlobalFilterClear: true,
    showIndividualFilterClear: false,
    showIndividualFilterValueClear: false,
    template: {
        container: "Clear filters",
        filter: "Clear {{filter}} ({{num}})"
    }
};
exports["default"] = ClearFiltersComponent;
