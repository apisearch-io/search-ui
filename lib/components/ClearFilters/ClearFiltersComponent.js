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
        _this.handleIndividualClick = function (filterKey) {
            var props = _this.props;
            var environmentId = props.environmentId;
            var currentQuery = props.store.getCurrentQuery();
            var repository = props.repository;
            /**
             * Dispatch a clear filter action
             */
            (0, ClearFiltersActions_1.clearFiltersAction)(environmentId, currentQuery, repository, filterKey);
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
                    num: filter.getValues().length
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
        var filterTemplate = props.template.filter;
        var appliedFiltersFormatted = this.state.appliedFilters;
        var individualFilterClear = props.showIndividualFilterClear
            ? (0, preact_1.h)("ul", { className: "as-clearFilters__filtersList " + filtersListClassName }, appliedFiltersFormatted.map(function (filter) {
                return (0, preact_1.h)("li", { className: "as-clearFilters__filter " + filterClassName, onClick: function () { return _this.handleIndividualClick(filter.filter); } },
                    (0, preact_1.h)(Template_1["default"], { template: filterTemplate, dictionary: _this.props.dictionary, data: filter }));
            }))
            : "";
        return (this.state.showClearFilters)
            ? ((0, preact_1.h)("div", { className: "as-clearFilters " + containerClassName },
                (0, preact_1.h)("div", { onClick: this.handleClick },
                    (0, preact_1.h)(Template_1["default"], { template: containerTemplate, dictionary: this.props.dictionary })),
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
    showIndividualFilterClear: false,
    template: {
        container: "Clear filters",
        filter: "Clear {{filter}} ({{num}})"
    }
};
exports["default"] = ClearFiltersComponent;
