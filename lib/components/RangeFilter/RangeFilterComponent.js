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
var apisearch_1 = require("apisearch");
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
        _this.uid = Math.random().toString(16).substr(2, 12);
        _this.observerFrom = _this.configureFromObserver();
        _this.observerTo = _this.configureToObserver();
        _this.rangeUid = 'range-' + _this.uid;
        _this.setState(function (prevState) {
            return {
                from: null,
                to: null,
                min: null,
                max: null,
                visible: true
            };
        });
        return _this;
    }
    /**
     * Components will mount
     */
    RangeFilterComponent.prototype.componentWillMount = function () {
        var props = this.props;
        var environmentId = props.environmentId;
        var filterName = props.filterName;
        var filterField = props.filterField;
        var currentQuery = props.store.getCurrentQuery();
        (0, RangeFilterActions_1.aggregationSetup)(environmentId, currentQuery, filterName, filterField, props.minValue, props.maxValue);
    };
    RangeFilterComponent.prototype.configureFromObserver = function () {
        var that = this;
        return new MutationObserver(function (mutationsList, observer) {
            // Use traditional 'for loops' for IE 11
            for (var _i = 0, mutationsList_1 = mutationsList; _i < mutationsList_1.length; _i++) {
                var mutation = mutationsList_1[_i];
                if (mutation.attributeName === 'value') {
                    var value = parseInt(mutation.target["defaultValue"]);
                    if (value == that.state.from) {
                        return;
                    }
                    that.handleSliderChange([value, that.state.to]);
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
                    if (value == that.state.to) {
                        return;
                    }
                    that.handleSliderChange([that.state.from, value]);
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
        if (values[0] === this.state.from &&
            values[1] === this.state.to) {
            return false;
        }
        this.applyFilter(values[0], values[1]);
    };
    ;
    /**
     * @param values
     */
    RangeFilterComponent.prototype.handleSliderMove = function (values) {
        this.updateRangeLayer(this.props, this.state, values[0], values[1]);
    };
    ;
    /**
     * Component will receive props
     *
     * @param props
     */
    RangeFilterComponent.prototype.componentWillReceiveProps = function (props) {
        var currentResult = props
            .store
            .getCurrentResult();
        var aggregation = currentResult.getAggregation(props.filterName);
        if (!(aggregation instanceof apisearch_1.ResultAggregation)) {
            this.setState(function (prevState) {
                return {
                    from: prevState.from,
                    to: prevState.to,
                    min: prevState.min,
                    max: prevState.max,
                    currency_placeholder: prevState.currency_placeholder,
                    visible: false
                };
            });
            return;
        }
        var metadata = aggregation.getMetadata();
        var filter = props
            .store
            .getCurrentQuery()
            .getFilter(props.filterName);
        var min = typeof props.minValue === "number" && props.minValue > 0
            ? props.minValue
            : (typeof metadata['min'] === "number"
                ? Math.floor(metadata['min'])
                : undefined);
        var max = typeof props.maxValue === "number" && props.maxValue > 0
            ? props.maxValue
            : (typeof metadata['max'] === "number"
                ? Math.ceil(metadata['max'])
                : undefined);
        var currencyPlaceholder = null;
        var firstItem = currentResult.getFirstItem();
        if (firstItem) {
            var firstItemPrice = firstItem.get('price');
            var firstItemPriceWithCurrency = firstItem.get('price_with_currency');
            if (firstItemPrice && firstItemPriceWithCurrency) {
                currencyPlaceholder = this.getCurrencyPlaceholderFromPriceAndPriceWithCurrency(firstItemPrice, firstItemPriceWithCurrency);
            }
        }
        var fromTo = this.getFromToFromFilter(filter, min, max);
        this.setState(function (prevState) {
            return {
                from: fromTo[0],
                to: fromTo[1],
                min: min,
                max: max,
                currency_placeholder: currencyPlaceholder,
                visible: ((typeof min === "number") && (typeof max === "number"))
            };
        });
    };
    /**
     * @param filter
     * @param min
     * @param max
     */
    RangeFilterComponent.prototype.getFromToFromFilter = function (filter, min, max) {
        var realMin = Math.min(min, max);
        var realMax = Math.max(min, max);
        if (filter instanceof apisearch_1.Filter) {
            var filterValue = filter.getValues()[0];
            if (typeof filterValue === "string") {
                var parts = filterValue.split('..');
                var from = parts[0];
                var to = parts[1].slice(0, -1);
                return [
                    Math.max(realMin, parseInt(from)),
                    Math.min(realMax, parseInt(to)),
                ];
            }
        }
        return [realMin, realMax];
    };
    /**
     * @param previousProps
     * @param previousState
     */
    RangeFilterComponent.prototype.componentDidUpdate = function (previousProps, previousState) {
        this.updateRangeLayer(previousProps, previousState, previousState.from, previousState.to);
    };
    /**
     * @param props
     * @param state
     * @param from
     * @param to
     */
    RangeFilterComponent.prototype.updateRangeLayer = function (props, state, from, to) {
        var min = state.min;
        var max = state.max;
        if (typeof from === "number" &&
            typeof to === "number" &&
            typeof props.callback === "function") {
            props.callback(Math.min(from, to), Math.max(from, to), min, max, this.rangeUid, state.currency_placeholder);
        }
    };
    /**
     * @param props
     * @param state
     */
    RangeFilterComponent.prototype.render = function (props, state) {
        var _this = this;
        var filterName = props.filterName;
        var ref = (0, compat_1.useRef)(null);
        var topTemplate = props.template.top;
        var sliderTemplate = props.template.slider;
        var containerClassName = props.classNames.container;
        var topClassName = props.classNames.top;
        var wrapperClassName = props.classNames.wrapper;
        var that = this;
        (0, compat_1.useEffect)(function () {
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
        var isNative = props.native;
        var isNotNative = !isNative;
        var type = isNative ? 'range' : 'number';
        var eventName = 'onClick';
        var from = state.from;
        var to = state.to;
        var min = state.min;
        var max = state.max;
        var isVisible = state.visible && !(props.store.currentResult.getTotalHits() === 0 &&
            from === min &&
            to === max);
        var visibleStyle = isVisible ? '' : 'display:none!important;';
        return ((0, preact_1.h)("div", { id: this.rangeUid, className: "as-rangeFilter ".concat(containerClassName), style: visibleStyle },
            (0, preact_1.h)(Template_1["default"], { template: topTemplate, className: "as-rangeFilter__top ".concat(topClassName), dictionary: this.props.dictionary }),
            (0, preact_1.h)("div", { className: "as-rangeFilter__wrapper ".concat(wrapperClassName) },
                (0, preact_1.h)("input", __assign({ type: type, "class": "as-rangeFilter__from ".concat(props.classNames.input, " as-rangeFilter__").concat(this.uid, " as-rangeFilter__from__").concat(this.uid) }, props.attributes.from, { value: from, min: min, max: max, step: props.step, onClick: function (e) {
                        if (isNotNative)
                            return false;
                        that.handleSliderChange([parseInt(e.target.value), to]);
                    }, onTouchEnd: function (e) {
                        if (isNotNative)
                            return false;
                        that.handleSliderChange([parseInt(e.target.value), to]);
                    }, onChange: function (e) {
                        var positions = [parseInt(e.target.value), to];
                        if (isNative) {
                            that.handleSliderMove(positions);
                            return false;
                        }
                        that.handleSliderChange(positions);
                    }, autocomplete: "off" })),
                (0, preact_1.h)("input", __assign({ type: type, "class": "as-rangeFilter__to ".concat(props.classNames.input, " as-rangeFilter__").concat(this.uid, " as-rangeFilter__to__").concat(this.uid) }, props.attributes.to, { value: to, min: min, max: max, step: props.step, onClick: function (e) {
                        if (isNotNative)
                            return false;
                        that.handleSliderChange([from, parseInt(e.target.value)]);
                    }, onTouchEnd: function (e) {
                        if (isNotNative)
                            return false;
                        that.handleSliderChange([from, parseInt(e.target.value)]);
                    }, onChange: function (e) {
                        var positions = [from, parseInt(e.target.value)];
                        if (isNative) {
                            that.handleSliderMove(positions);
                            return false;
                        }
                        that.handleSliderChange(positions);
                    }, autocomplete: "off" })),
                (0, preact_1.h)("div", { "class": "slider" },
                    (0, preact_1.h)(Template_1["default"], { template: sliderTemplate, dictionary: this.props.dictionary })))));
    };
    /**
     * Apply filter
     */
    RangeFilterComponent.prototype.applyFilter = function (valueFrom, valueTo) {
        var props = this.props;
        /**
         * Dispatch action
         */
        (0, RangeFilterActions_1.filterAction)(props.environmentId, props.store.getCurrentQuery(), props.repository, props.filterName, props.filterField, valueFrom, valueTo);
    };
    /**
     * @param price
     * @param priceWithCurrency
     * @private
     */
    RangeFilterComponent.prototype.getCurrencyPlaceholderFromPriceAndPriceWithCurrency = function (price, priceWithCurrency) {
        price = (price + '').replace('.', '').replace(',', '');
        priceWithCurrency = (priceWithCurrency + '').replace('.', '').replace(',', '');
        var regex = new RegExp(price + '0*');
        var currencyPlaceholder = priceWithCurrency.replace(regex, "__price__");
        return currencyPlaceholder;
    };
    return RangeFilterComponent;
}(preact_1.Component));
RangeFilterComponent.defaultProps = {
    maxValueIncluded: true,
    step: 1,
    minValue: null,
    maxValue: null,
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
