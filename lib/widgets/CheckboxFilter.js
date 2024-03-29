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
var CheckboxFilterComponent_1 = require("../components/CheckboxFilter/CheckboxFilterComponent");
var Widget_1 = require("./Widget");
/**
 * CheckboxFilter
 */
var CheckboxFilter = /** @class */ (function (_super) {
    __extends(CheckboxFilter, _super);
    function CheckboxFilter(_a) {
        var target = _a.target, filterName = _a.filterName, filterField = _a.filterField, label = _a.label, filterValue = _a.filterValue, classNames = _a.classNames, template = _a.template;
        var _this = _super.call(this) || this;
        _this.target = target;
        _this.component = (0, preact_1.h)(CheckboxFilterComponent_1["default"], { target: target, filterName: filterName, filterField: filterField, label: label, filterValue: filterValue, classNames: __assign(__assign({}, CheckboxFilterComponent_1["default"].defaultProps.classNames), classNames), template: __assign(__assign({}, CheckboxFilterComponent_1["default"].defaultProps.template), template) });
        return _this;
    }
    /**
     * @param environmentId
     * @param store
     * @param repository
     * @param dictionary
     */
    CheckboxFilter.prototype.render = function (environmentId, store, repository, dictionary) {
        this.component.props = __assign(__assign({}, this.component.props), { environmentId: environmentId, repository: repository, store: store, dictionary: dictionary });
        (0, preact_1.render)(this.component, document.querySelector(this.target));
    };
    /**
     * @param query
     * @param object
     */
    CheckboxFilter.prototype.toUrlObject = function (query, object) {
        var filterName = this.component.props.filterName;
        var aggregation = query.aggregations[filterName];
        var filterField = this.component.props.filterField;
        if (aggregation !== undefined &&
            query.filters !== undefined &&
            query.filters[filterName] !== undefined) {
            var filterValues = query.filters[filterName].values;
            if (filterValues.length > 0) {
                object[filterField] = filterValues;
            }
        }
    };
    /**
     * @param object
     * @param query
     */
    CheckboxFilter.prototype.fromUrlObject = function (object, query) {
        var _a;
        var filterName = this.component.props.filterName;
        var aggregation = query.aggregations[filterName];
        var filterField = this.component.props.filterField;
        var fieldValues = (_a = object[filterField]) !== null && _a !== void 0 ? _a : object[filterName];
        if (aggregation !== undefined &&
            fieldValues !== undefined &&
            Array.isArray(fieldValues) &&
            fieldValues.length > 0) {
            if (query.filters === undefined) {
                query.filters = {};
            }
            query.filters[filterName] = {
                field: "indexed_metadata." + this.component.props.filterField,
                values: fieldValues
            };
        }
    };
    /**
     * @param query
     */
    CheckboxFilter.prototype.reset = function (query) {
        var filterName = this.component.props.filterName;
        if (query.filters !== undefined &&
            typeof query.filters === "object" &&
            query.filters[filterName] !== undefined) {
            delete query.filters[filterName];
        }
    };
    return CheckboxFilter;
}(Widget_1["default"]));
/**
 * CheckboxFilter widget
 *
 * @param settings
 */
exports["default"] = (function (settings) { return new CheckboxFilter(settings); });
