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
var compat_1 = require("preact/compat");
var RangeFilterActions_1 = require("./RangeFilterActions");
/**
 * Range Filter Component
 */
var RangeFilterComponent = /** @class */ (function (_super) {
    __extends(RangeFilterComponent, _super);
    function RangeFilterComponent() {
        var _this = _super.call(this) || this;
        _this.uid = Math.random().toString(16).substr(2, 12);
        _this.observerFrom = _this.configureObserver('from');
        _this.observerTo = _this.configureObserver('to');
        return _this;
    }
    RangeFilterComponent.prototype.configureObserver = function (field) {
        var that = this;
        return new MutationObserver(function (mutationsList, observer) {
            // Use traditional 'for loops' for IE 11
            for (var _i = 0, mutationsList_1 = mutationsList; _i < mutationsList_1.length; _i++) {
                var mutation = mutationsList_1[_i];
                if (mutation.attributeName === 'value') {
                    console.log(mutation);
                    var value = mutation.target["defaultValue"];
                    console.log(field);
                    console.log(value);
                    console.log(that.state);
                    if ((field === 'from' &&
                        value === that.state.valueFrom) ||
                        (field === 'to' &&
                            value === that.state.valueTo)) {
                        return;
                    }
                    field == 'from'
                        ? that.handleSliderChange([value, that.state.valueTo])
                        : that.handleSliderChange([that.state.valueFrom, value]);
                }
            }
        });
    };
    RangeFilterComponent.prototype.componentDidMount = function () {
        this.observerFrom.observe(document.getElementsByClassName('as-rangeFilter__from__' + this.uid)[0], { attributes: true });
        this.observerTo.observe(document.getElementsByClassName('as-rangeFilter__to__' + this.uid)[0], { attributes: true });
    };
    RangeFilterComponent.prototype.componentWillUnmount = function () {
        this.observerFrom.disconnect();
        this.observerTo.disconnect();
    };
    /**
     * Component will receive props
     *
     * @param props
     */
    RangeFilterComponent.prototype.componentWillReceiveProps = function (props) {
        var filterName = props.filterName;
        var filterIsNotFound = props.currentQuery.getFilter(filterName) == null;
        if (filterIsNotFound) {
            this.setState(function (prevState) {
                return {
                    valueFrom: props.minValue,
                    valueTo: props.maxValue
                };
            });
        }
    };
    /**
     * Handle change
     *
     * @param e
     */
    RangeFilterComponent.prototype.handleChange = function (e) {
        this.applyFilter(e.target.parentNode.getElementsByClassName('as-rangeFilter__from')[0].value, e.target.parentNode.getElementsByClassName('as-rangeFilter__to')[0].value);
    };
    ;
    RangeFilterComponent.prototype.handleSliderChange = function (values) {
        this.setState(function (prevState) {
            return {
                valueFrom: values[0],
                valueTo: values[1]
            };
        });
        this.applyFilter(values[0], values[1]);
    };
    ;
    /**
     * Apply filter
     */
    RangeFilterComponent.prototype.applyFilter = function (valueFrom, valueTo) {
        var props = this.props;
        var environmentId = props.environmentId;
        var currentQuery = props.currentQuery;
        var repository = props.repository;
        var filterName = props.filterName;
        var filterField = props.filterField;
        var minValue = props.minValue;
        var maxValue = props.maxValue;
        /**
         * Dispatch action
         */
        RangeFilterActions_1.onChangeSearchAction(environmentId, currentQuery, repository, filterName, filterField, minValue, maxValue, valueFrom, valueTo);
    };
    /**
     * Render
     *
     * @return {any}
     */
    RangeFilterComponent.prototype.render = function (props, state) {
        var _this = this;
        var filterName = props.filterName;
        var from = props.from;
        var to = props.to;
        var minValue = props.minValue;
        var maxValue = props.maxValue;
        var initialFrom = Math.max(from.initialValue, minValue);
        var initialTo = Math.min(to.initialValue, maxValue);
        var currentFromValue = this.state.valueFrom
            ? this.state.valueFrom
            : initialFrom;
        var currentToValue = this.state.valueTo
            ? this.state.valueTo
            : initialTo;
        var ref = compat_1.useRef(null);
        compat_1.useEffect(function () {
            var self = _this;
            if (!ref.current) {
                return;
            }
            /**
             * Alert if clicked on outside of element
             */
            function handleChange(event) {
                var target = event.target;
                var parentNode = target.parentNode;
                console.log(parentNode.getElementsByClassName('as-rangeFilter__from')[0].value);
                console.log(parentNode.getElementsByClassName('as-rangeFilter__to')[0].value);
                self.applyFilter(parentNode.getElementsByClassName('as-rangeFilter__from')[0].value, parentNode.getElementsByClassName('as-rangeFilter__to')[0].value);
            }
            // Bind the event listener
            ref.current.addEventListener("change", handleChange);
            return function () {
                // Unbind the event listener on clean up
                ref.current.removeEventListener("change", handleChange);
            };
        }, [ref]);
        return (preact_1.h("div", { className: "as-rangeFilter" },
            preact_1.h("label", { "class": "as-rangeFilter__label" }, filterName),
            preact_1.h("input", __assign({ type: "number", "class": "as-rangeFilter__from " + from["class"] + " as-rangeFilter__from__" + this.uid }, from.attributes, { value: this.state.valueFrom, min: minValue, max: maxValue, ref: ref, autocomplete: "off" })),
            preact_1.h("input", __assign({ type: "number", "class": "as-rangeFilter__to " + to["class"] + " as-rangeFilter__to__" + this.uid }, to.attributes, { value: this.state.valueTo, min: minValue, max: maxValue, autocomplete: "off" }))));
    };
    return RangeFilterComponent;
}(preact_1.Component));
RangeFilterComponent.defaultProps = {
    minValue: 0,
    maxValue: 100,
    from: {
        "class": "",
        attributes: {},
        initialValue: 0
    },
    to: {
        "class": "",
        attributes: {},
        initialValue: 100
    }
};
exports["default"] = RangeFilterComponent;
