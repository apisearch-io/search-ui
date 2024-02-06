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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var preact_1 = require("preact");
var Template_1 = require("../Template");
var defaultTemplates_1 = require("./defaultTemplates");
var PriorityFilterActions_1 = require("./PriorityFilterActions");
/**
 * PriorityFilterComponent
 */
var PriorityFilterComponent = /** @class */ (function (_super) {
    __extends(PriorityFilterComponent, _super);
    /**
     * Constructor
     */
    function PriorityFilterComponent() {
        var _this = _super.call(this) || this;
        _this.handleClick = function (filterValue) {
            var props = _this.props;
            var environmentId = props.environmentId;
            var repository = props.repository;
            var currentQuery = props.store.getCurrentQuery();
            var priorityFilter = _this.props.store.getCurrentResult().getMetadataValue("priority_filter");
            var priorityFilterName = priorityFilter.name;
            var priorityFilterObject = props.store.getCurrentQuery().getAggregation(priorityFilterName);
            (0, PriorityFilterActions_1.priorityFilterAction)(environmentId, currentQuery, repository, priorityFilterName, priorityFilterObject.getField().replace("indexed_metadata.", ""), filterValue, priorityFilterObject.getApplicationType());
        };
        _this.state = {
            filterName: ""
        };
        return _this;
    }
    /**
     * Components will mount
     */
    PriorityFilterComponent.prototype.componentWillMount = function () {
        var props = this.props;
        /**
         * Dispatch action
         */
        (0, PriorityFilterActions_1.setupPriorityFilters)(props.environmentId, props.store.getCurrentQuery(), props.filters);
    };
    /**
     * Component will receive props
     *
     * @param props
     */
    PriorityFilterComponent.prototype.componentWillReceiveProps = function (props) {
        this.setState(function (_) {
            return {
                filterName: props.store.getCurrentResult().getMetadataValue("priority_filter")
            };
        });
    };
    /**
     * Render
     *
     * @return {any}
     */
    PriorityFilterComponent.prototype.render = function () {
        var _this = this;
        var priorityFilter = this.props.store.getCurrentResult().getMetadataValue("priority_filter");
        if (!priorityFilter) {
            return null;
        }
        var priorityFilterName = priorityFilter.name;
        var that = this;
        return ((0, preact_1.h)("div", { className: "as-priorityFilter" },
            (0, preact_1.h)(Template_1["default"], { template: this.props.template.top, className: "as-priorityFilter__top", dictionary: this.props.dictionary, data: {
                    name: priorityFilterName
                } }),
            (0, preact_1.h)("div", { className: "as-priorityFilter__itemsList" },
                (0, preact_1.h)("ul", null, Object.keys(priorityFilter.values).map(function (key) {
                    var data = priorityFilter.values[key];
                    return ((0, preact_1.h)("li", { onClick: function (e) {
                            e.stopPropagation();
                            e.preventDefault();
                            that.handleClick(key);
                        } },
                        (0, preact_1.h)(Template_1["default"], { template: _this.props.template.item, data: __assign(__assign({}, data), { value: key }), dictionary: _this.props.dictionary })));
                })))));
    };
    return PriorityFilterComponent;
}(preact_1.Component));
PriorityFilterComponent.defaultProps = {
    aggregationField: null,
    template: {
        item: defaultTemplates_1.defaultPriorityFilterItemTemplate,
        top: defaultTemplates_1.defaultPriorityFilterTopTemplate
    }
};
exports["default"] = PriorityFilterComponent;
