"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
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
var CheckboxFilterActions_1 = require("./CheckboxFilterActions");
/**
 * Checkbox Filter Component
 */
var CheckboxFilterComponent = /** @class */ (function (_super) {
    __extends(CheckboxFilterComponent, _super);
    /**
     * Constructor
     */
    function CheckboxFilterComponent(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Handle change
         *
         * @param e
         */
        _this.handleChange = function (e) {
            var props = _this.props;
            var environmentId = props.environmentId;
            var currentQuery = props.currentQuery;
            var repository = props.repository;
            var filterName = props.filterName;
            var filterField = props.filterField;
            /**
             * Dispatch action
             */
            CheckboxFilterActions_1.onChangeSearchAction(environmentId, currentQuery, repository, filterName, filterField, e.target.checked);
        };
        _this.state = {
            isActive: false,
            n: 0
        };
        return _this;
    }
    /**
     * Component will mount
     */
    CheckboxFilterComponent.prototype.componentWillMount = function () {
        var props = this.props;
        var environmentId = props.environmentId;
        var filterName = props.filterName;
        var aggregationField = props.filterField;
        var currentQuery = props.currentQuery;
        /**
         * Dispatch action
         */
        CheckboxFilterActions_1.aggregationSetup(environmentId, currentQuery, filterName, aggregationField);
    };
    /**
     * Component will receive props
     *
     * @param props
     */
    CheckboxFilterComponent.prototype.componentWillReceiveProps = function (props) {
        var filterName = props.filterName;
        var filter = props.currentQuery.getFilter(filterName);
        var isNowActive = filter != null;
        var n = 0;
        var aggregation = props.currentResult.getAggregation(filterName);
        if (aggregation != null) {
            var counters = aggregation.getCounters();
            for (var i in counters) {
                var counter = counters[i];
                if (counter.values.name == 'true') {
                    n = counter.getN();
                }
            }
            ;
        }
        this.setState(function (prevState) {
            return {
                isActive: isNowActive,
                n: n
            };
        });
    };
    /**
     * Render
     *
     * @return {any}
     */
    CheckboxFilterComponent.prototype.render = function (props, state) {
        var label = props.label
            ? props.label
            : props.filterName;
        var attributes = {};
        var n = this.state.n;
        if (this.state.isActive) {
            attributes['checked'] = 'checked';
        }
        return (preact_1.h("div", { className: "as-checkboxFilter" },
            preact_1.h("input", __assign({ type: "checkbox", "class": "as-checkboxFilter__checkbox" }, attributes, { onClick: this.handleChange })),
            preact_1.h("label", { "class": "as-checkboxFilter__label" },
                label,
                " (",
                n,
                ")")));
    };
    return CheckboxFilterComponent;
}(preact_1.Component));
exports["default"] = CheckboxFilterComponent;
