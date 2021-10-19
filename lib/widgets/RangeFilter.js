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
var RangeFilterComponent_1 = require("../components/RangeFilter/RangeFilterComponent");
var Widget_1 = require("./Widget");
/**
 * RangeFilter
 */
var RangeFilter = /** @class */ (function (_super) {
    __extends(RangeFilter, _super);
    function RangeFilter(_a) {
        var target = _a.target, filterName = _a.filterName, filterField = _a.filterField, minValue = _a.minValue, maxValue = _a.maxValue, minMaxCallback = _a.minMaxCallback, step = _a.step, callback = _a.callback, onSliderMove = _a.onSliderMove, template = _a.template, classNames = _a.classNames, attributes = _a.attributes, native = _a.native;
        var _this = _super.call(this) || this;
        _this.target = target;
        _this.component = preact_1.h(RangeFilterComponent_1["default"], { target: target, filterName: filterName, filterField: filterField, minValue: minValue, maxValue: maxValue, minMaxCallback: minMaxCallback, step: step, callback: callback, onSliderMove: onSliderMove, native: native, template: __assign(__assign({}, RangeFilterComponent_1["default"].defaultProps.template), template), classNames: __assign(__assign({}, RangeFilterComponent_1["default"].defaultProps.classNames), classNames), attributes: __assign(__assign({}, RangeFilterComponent_1["default"].defaultProps.attributes), attributes) });
        return _this;
    }
    /**
     * @param environmentId
     * @param store
     * @param repository
     * @param dictionary
     */
    RangeFilter.prototype.render = function (environmentId, store, repository, dictionary) {
        this.component.props = __assign(__assign({}, this.component.props), { environmentId: environmentId, repository: repository, store: store });
        var targetNode = document.querySelector(this.target);
        preact_1.render(this.component, targetNode);
    };
    /**
     * @param query
     * @param object
     */
    RangeFilter.prototype.toUrlObject = function (query, object) {
        var filterName = this.component.props.filterName;
        if (query.filters !== undefined && query.filters[filterName] !== undefined) {
            var filterValues = query.filters[filterName].values;
            if (filterValues.length > 0) {
                object[filterName] = filterValues;
            }
        }
    };
    /**
     * @param object
     * @param query
     */
    RangeFilter.prototype.fromUrlObject = function (object, query) {
        var filterName = this.component.props.filterName;
        var fieldValues = object[filterName];
        if (fieldValues !== undefined &&
            Array.isArray(fieldValues) &&
            fieldValues.length > 0) {
            if (query.filters === undefined) {
                query.filters = {};
            }
            query.filters[filterName] = {
                field: 'indexed_metadata.' + this.component.props.filterField,
                values: fieldValues,
                filter_type: 'range'
            };
        }
    };
    /**
     * @param query
     */
    RangeFilter.prototype.reset = function (query) {
        var filterName = this.component.props.filterName;
        if (query.filters !== undefined &&
            typeof query.filters === "object" &&
            query.filters[filterName] !== undefined) {
            delete query.filters[filterName];
        }
    };
    return RangeFilter;
}(Widget_1["default"]));
/**
 * CheckboxFilter widget
 *
 * @param settings
 */
exports["default"] = (function (settings) { return new RangeFilter(settings); });
