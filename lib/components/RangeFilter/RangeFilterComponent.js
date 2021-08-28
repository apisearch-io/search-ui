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
var Template_1 = require("../Template");
var RangeFilterActions_1 = require("./RangeFilterActions");
/**
 * Range Filter Component
 */
var RangeFilterComponent = /** @class */ (function (_super) {
    __extends(RangeFilterComponent, _super);
    function RangeFilterComponent() {
        var _this = _super.call(this) || this;
        _this.minMaxAssigned = false;
        _this.uid = Math.random().toString(16).substr(2, 12);
        _this.observerFrom = _this.configureFromObserver();
        _this.observerTo = _this.configureToObserver();
        _this.rangeUid = 'range-' + _this.uid;
        _this.setState(function (prevState) {
            return {
                valueFrom: undefined,
                valueTo: undefined,
                visible: false
            };
        });
        return _this;
    }
    /**
     *
     */
    RangeFilterComponent.prototype.shouldCheckMinMax = function () {
        return (this.props.minValue === undefined ||
            this.props.maxValue === undefined);
    };
    /**
     * Components will mount
     */
    RangeFilterComponent.prototype.componentWillMount = function () {
        var props = this.props;
        /**
         * Check min and max ONLY when both are defined
         */
        if (this.shouldCheckMinMax()) {
            RangeFilterActions_1.addMinMaxAggregation(props.environmentId, props.store.getCurrentQuery(), props.filterName, props.filterField);
        }
    };
    RangeFilterComponent.prototype.configureFromObserver = function () {
        var that = this;
        return new MutationObserver(function (mutationsList, observer) {
            // Use traditional 'for loops' for IE 11
            for (var _i = 0, mutationsList_1 = mutationsList; _i < mutationsList_1.length; _i++) {
                var mutation = mutationsList_1[_i];
                if (mutation.attributeName === 'value') {
                    var value = parseInt(mutation.target["defaultValue"]);
                    if (value == that.state.valueFrom) {
                        return;
                    }
                    that.handleSliderChange([value, that.state.valueTo]);
                }
            }
        });
    };
    RangeFilterComponent.prototype.configureToObserver = function () {
        var that = this;
        return new MutationObserver(function (mutationsList, observer) {
            // Use traditional 'for loops' for IE 11
            for (var _i = 0, mutationsList_2 = mutationsList; _i < mutationsList_2.length; _i++) {
                var mutation = mutationsList_2[_i];
                if (mutation.attributeName === 'value') {
                    var value = parseInt(mutation.target["defaultValue"]);
                    if (value == that.state.valueTo) {
                        return;
                    }
                    that.handleSliderChange([that.state.valueFrom, value]);
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
     * Handle change
     *
     * @param e
     */
    RangeFilterComponent.prototype.handleChange = function (e) {
        var uid = this.uid;
        this.applyFilter(e.target.parentNode.getElementsByClassName('as-rangeFilter__from__' + uid)[0].value, e.target.parentNode.getElementsByClassName('as-rangeFilter__to__' + uid)[0].value);
    };
    ;
    RangeFilterComponent.prototype.handleSliderChange = function (values) {
        if (values[0] === this.state.valueFrom &&
            values[1] === this.state.valueTo) {
            return false;
        }
        this.setState(function (prevState) {
            return {
                valueFrom: values[0],
                valueTo: values[1],
                visible: true
            };
        });
        this.applyFilter(values[0], values[1]);
    };
    ;
    /**
     * @param values
     */
    RangeFilterComponent.prototype.handleSliderMove = function (values) {
        var props = this.props;
        var state = this.state;
        if (typeof this.props.onSliderMove == 'function' &&
            this.state.valueFrom !== undefined &&
            this.state.valueTo !== undefined) {
            this.props.onSliderMove(Math.min(values[0], values[1]), Math.max(values[0], values[1]), this.rangeUid);
        }
    };
    ;
    /**
     * @param props
     */
    RangeFilterComponent.prototype.componentWillReceiveProps = function (props) {
        var filterName = props.filterName;
        var filter = props.store.getCurrentQuery().getFilter(filterName);
        var filterIsFound = filter !== null;
        if (filterIsFound) {
            var values = filter.getValues();
            if (values.length > 0) {
                var parts_1 = values[0].split('..');
                this.setState(function (prevState) {
                    return {
                        valueFrom: parseInt(parts_1[0]),
                        valueTo: parseInt(parts_1[1]),
                        visible: true
                    };
                });
            }
        }
        else if (this.minMaxAssigned) {
            this.setState(function (prevState) {
                return {
                    valueFrom: props.minValue,
                    valueTo: props.maxValue,
                    visible: true
                };
            });
        }
        else {
            this.setState(function (prevState) {
                return {
                    visible: true
                };
            });
        }
    };
    /**
     * @param props
     * @param state
     */
    RangeFilterComponent.prototype.render = function (props, state) {
        var _this = this;
        var _a, _b, _c, _d;
        var filterName = props.filterName;
        var ref = compat_1.useRef(null);
        var topTemplate = props.template.top;
        var sliderTemplate = props.template.slider;
        var containerClassName = props.classNames.container;
        var topClassName = props.classNames.top;
        var wrapperClassName = props.classNames.wrapper;
        var that = this;
        compat_1.useEffect(function () {
            var self = _this;
            if (!ref.current) {
                return;
            }
            var uid = _this.uid;
            /**
             * Alert if clicked on outside of element
             */
            function handleChange(event) {
                var target = event.target;
                var parentNode = target.parentNode;
                self.applyFilter(parentNode.getElementsByClassName('as-rangeFilter__from__' + uid)[0].value, parentNode.getElementsByClassName('as-rangeFilter__to__' + uid)[0].value);
            }
            // Bind the event listener
            ref.current.addEventListener("change", handleChange);
            return function () {
                // Unbind the event listener on clean up
                ref.current.removeEventListener("change", handleChange);
            };
        }, [ref]);
        var aggregations = this.props.store.getCurrentResult().getAggregations();
        if (props.store.hasProperResult() && this.minMaxAssigned === false) {
            if (this.shouldCheckMinMax()) {
                var currentAggregation = aggregations.getAggregation(filterName);
                if (currentAggregation !== null) {
                    var currentAggregationMetadata = currentAggregation.getMetadata();
                    var currentAggregationMetadataMin = currentAggregationMetadata['min']
                        ? Math.floor(currentAggregationMetadata)
                        : undefined;
                    var currentAggregationMetadataMax = currentAggregationMetadata['max']
                        ? Math.ceil(currentAggregationMetadata['max'])
                        : undefined;
                    this.minValue = (_a = props.minValue) !== null && _a !== void 0 ? _a : currentAggregationMetadataMin;
                    this.maxValue = (_b = props.maxValue) !== null && _b !== void 0 ? _b : currentAggregationMetadataMax;
                    this.minMaxAssigned = true;
                    this.setState(function (prevState) {
                        var _a, _b;
                        return {
                            valueFrom: (_a = _this.state.valueFrom) !== null && _a !== void 0 ? _a : _this.minValue,
                            valueTo: (_b = _this.state.valueTo) !== null && _b !== void 0 ? _b : _this.maxValue,
                            visible: true
                        };
                    });
                    if (typeof props.minMaxCallback == 'function') {
                        props.minMaxCallback(this.minValue, this.maxValue, props.step, this.rangeUid);
                    }
                    /**
                     * Dispatch action
                     */
                    RangeFilterActions_1.deleteMinMaxAggregation(props.environmentId, props.store.getCurrentQuery(), filterName);
                }
            }
            else {
                this.minMaxAssigned = true;
                this.setState(function (prevState) {
                    var _a, _b;
                    return {
                        valueFrom: (_a = _this.state.valueFrom) !== null && _a !== void 0 ? _a : props.minValue,
                        valueTo: (_b = _this.state.valueTo) !== null && _b !== void 0 ? _b : props.maxValue,
                        visible: true
                    };
                });
                if (typeof props.minMaxCallback == 'function') {
                    props.minMaxCallback(props.minValue, props.maxValue, props.step, this.rangeUid);
                }
            }
        }
        var minValue = (_c = this.minValue) !== null && _c !== void 0 ? _c : props.minValue;
        var maxValue = (_d = this.maxValue) !== null && _d !== void 0 ? _d : props.maxValue;
        var isNative = props.native;
        var isNotNative = !isNative;
        var type = isNative ? 'range' : 'number';
        var eventName = 'onClick';
        if (this.minMaxAssigned &&
            typeof props.callback == 'function' &&
            this.state.valueFrom !== undefined &&
            this.state.valueTo !== undefined) {
            props.callback(Math.min(state.valueFrom, state.valueTo), Math.max(state.valueFrom, state.valueTo), this.rangeUid);
        }
        return (preact_1.h("div", { id: this.rangeUid, className: "as-rangeFilter " + containerClassName },
            preact_1.h(Template_1["default"], { template: topTemplate, className: "as-rangeFilter__top " + topClassName, dictionary: this.props.dictionary }),
            preact_1.h("div", { className: "as-rangeFilter__wrapper " + wrapperClassName },
                preact_1.h("input", __assign({ type: type, "class": "as-rangeFilter__from " + props.classNames.input + " as-rangeFilter__" + this.uid + " as-rangeFilter__from__" + this.uid }, props.attributes.from, { value: this.state.valueFrom, min: minValue, max: maxValue, step: props.step, onClick: function (e) {
                        if (isNotNative)
                            return false;
                        that.handleSliderChange([parseInt(e.target.value), that.state.valueTo]);
                    }, onChange: function (e) {
                        var positions = [parseInt(e.target.value), that.state.valueTo];
                        if (isNative) {
                            that.handleSliderMove(positions);
                            return false;
                        }
                        that.handleSliderChange(positions);
                    }, autocomplete: "off" })),
                preact_1.h("input", __assign({ type: type, "class": "as-rangeFilter__to " + props.classNames.input + " as-rangeFilter__" + this.uid + " as-rangeFilter__to__" + this.uid }, props.attributes.to, { value: this.state.valueTo, min: minValue, max: maxValue, step: props.step, onClick: function (e) {
                        if (isNotNative)
                            return false;
                        that.handleSliderChange([that.state.valueFrom, parseInt(e.target.value)]);
                    }, onChange: function (e) {
                        var positions = [that.state.valueFrom, parseInt(e.target.value)];
                        if (isNative) {
                            that.handleSliderMove(positions);
                            return false;
                        }
                        that.handleSliderChange(positions);
                    }, autocomplete: "off" })),
                preact_1.h("div", { "class": "slider" },
                    preact_1.h(Template_1["default"], { template: sliderTemplate, dictionary: this.props.dictionary })))));
    };
    /**
     * Apply filter
     */
    RangeFilterComponent.prototype.applyFilter = function (valueFrom, valueTo) {
        var props = this.props;
        /**
         * Dispatch action
         */
        RangeFilterActions_1.onChangeSearchAction(props.environmentId, props.store.getCurrentQuery(), props.repository, props.filterName, props.filterField, valueFrom, valueTo, this.minMaxAssigned);
    };
    return RangeFilterComponent;
}(preact_1.Component));
RangeFilterComponent.defaultProps = {
    maxValueIncluded: true,
    step: 1,
    native: false,
    classNames: {
        container: '',
        top: '',
        wrapper: '',
        input: '',
        from: '',
        to: ''
    },
    attributes: {
        from: '',
        to: ''
    },
    template: {
        top: '',
        slider: ''
    }
};
exports["default"] = RangeFilterComponent;
