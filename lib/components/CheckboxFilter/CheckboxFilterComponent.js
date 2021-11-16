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
var preact_1 = require("preact");
var Helpers_1 = require("../MultipleFilter/Helpers");
var CheckboxFilterActions_1 = require("./CheckboxFilterActions");
var Template_1 = require("../Template");
var defaultTemplates_1 = require("./defaultTemplates");
/**
 * Checkbox Filter Component
 */
var CheckboxFilterComponent = /** @class */ (function (_super) {
    __extends(CheckboxFilterComponent, _super);
    function CheckboxFilterComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * @param activeElement
         */
        _this.handleChange = function (activeElement) {
            var props = _this.props;
            /**
             * Dispatch action
             */
            (0, CheckboxFilterActions_1.onChangeSearchAction)(props.environmentId, props.store.getCurrentQuery(), props.repository, props.filterName, props.filterField, activeElement, props.filterValue);
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
        var currentQuery = props.store.getCurrentQuery();
        /**
         * Dispatch action
         */
        (0, CheckboxFilterActions_1.aggregationSetup)(environmentId, currentQuery, filterName, aggregationField);
    };
    /**
     * Component will receive props
     *
     * @param props
     */
    CheckboxFilterComponent.prototype.componentWillReceiveProps = function (props) {
        this.setState(function (prevState) {
            return {
                aggregation: props
                    .store
                    .getCurrentResult()
                    .getAggregation(props.filterName)
            };
        });
    };
    /**
     * Render
     *
     * @return {any}
     */
    CheckboxFilterComponent.prototype.render = function (props, state) {
        var containerClassName = props.classNames.container;
        var topClassName = props.classNames.top;
        var itemClassName = props.classNames.item;
        var activeClassName = props.classNames.active;
        var topTemplate = props.template.top;
        var itemTemplate = props.template.item;
        var filterValue = props.filterValue;
        if (typeof filterValue === "boolean") {
            filterValue = filterValue ? "true" : "false";
        }
        var n = 0;
        /**
         * We find current status inside the filter value
         */
        var isActive = (0, Helpers_1.getFilterValuesFromQuery)(props.store.getCurrentQuery(), props.filterName)[0];
        var aggregation = state.aggregation;
        if (aggregation != null) {
            var counters = aggregation.getCounters();
            for (var i in counters) {
                var counter = counters[i];
                if (counter.values.name === filterValue) {
                    n = counter.getN();
                    break;
                }
            }
        }
        var label = props.label
            ? props.label
            : props.filterName;
        var that = this;
        var uid = Math.floor(Math.random() * 10000000000);
        var templateData = {
            isActive: isActive,
            label: label,
            n: n,
            uid: uid
        };
        return ((0, preact_1.h)("div", { className: "as-checkboxFilter " + containerClassName },
            (0, preact_1.h)(Template_1["default"], { template: topTemplate, className: "as-checkboxFilter__top " + topClassName, dictionary: this.props.dictionary }),
            (0, preact_1.h)("div", { className: "as-checkboxFilter__item " +
                    (itemClassName + " ") +
                    ("" + ((isActive) ? activeClassName : "")), onClick: function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    that.handleChange(!isActive);
                } },
                (0, preact_1.h)(Template_1["default"], { template: itemTemplate, data: templateData, dictionary: this.props.dictionary }))));
    };
    return CheckboxFilterComponent;
}(preact_1.Component));
CheckboxFilterComponent.defaultProps = {
    filterValue: 'true',
    classNames: {
        container: '',
        top: '',
        item: '',
        active: 'as-checkboxFilter__item--active'
    },
    template: {
        top: null,
        item: defaultTemplates_1.defaultItemTemplate
    }
};
exports["default"] = CheckboxFilterComponent;
