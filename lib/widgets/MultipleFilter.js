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
var MultipleFilterComponent_1 = require("../components/MultipleFilter/MultipleFilterComponent");
var Widget_1 = require("./Widget");
/**
 * Multiple Filter
 */
var MultipleFilter = /** @class */ (function (_super) {
    __extends(MultipleFilter, _super);
    /**
     * Filtername
     *
     * @param target
     * @param filterName
     * @param filterField
     * @param aggregationField
     * @param applicationType
     * @param fetchLimit
     * @param viewLimit
     * @param sortBy
     * @param ranges
     * @param labels
     * @param classNames
     * @param template
     * @param formatData
     * @param activeFirst
     */
    function MultipleFilter(_a) {
        var target = _a.target, filterName = _a.filterName, filterField = _a.filterField, aggregationField = _a.aggregationField, applicationType = _a.applicationType, fetchLimit = _a.fetchLimit, viewLimit = _a.viewLimit, sortBy = _a.sortBy, ranges = _a.ranges, labels = _a.labels, classNames = _a.classNames, template = _a.template, formatData = _a.formatData, activeFirst = _a.activeFirst;
        var _this = _super.call(this) || this;
        _this.target = target;
        _this.component = preact_1.h(MultipleFilterComponent_1["default"], { target: target, filterName: filterName, filterField: filterField, aggregationField: aggregationField, applicationType: applicationType, fetchLimit: fetchLimit, viewLimit: viewLimit, sortBy: sortBy, ranges: ranges, labels: labels, classNames: __assign(__assign({}, MultipleFilterComponent_1["default"].defaultProps.classNames), classNames), template: __assign(__assign({}, MultipleFilterComponent_1["default"].defaultProps.template), template), formatData: formatData, activeFirst: activeFirst });
        return _this;
    }
    /**
     * Widget
     *
     * @param environmentId
     * @param store
     * @param repository
     */
    MultipleFilter.prototype.render = function (environmentId, store, repository) {
        this.component.props = __assign(__assign({}, this.component.props), { environmentId: environmentId, repository: repository, dirty: store.isDirty(), currentResult: store.getCurrentResult(), currentQuery: store.getCurrentQuery() });
        var targetNode = document.querySelector(this.target);
        preact_1.render(this.component, targetNode);
    };
    /**
     * @param query
     * @param object
     */
    MultipleFilter.prototype.toUrlObject = function (query, object) {
        var filterName = this.component.props.filterName;
        var aggregation = query.aggregations[filterName];
        if (aggregation !== undefined &&
            query.filters[filterName] !== undefined) {
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
    MultipleFilter.prototype.fromUrlObject = function (object, query) {
        var filterName = this.component.props.filterName;
        var aggregation = query.aggregations[filterName];
        var fieldValues = object[filterName];
        var rangesValues = Object.keys(this.component.props.ranges);
        var filterType = (rangesValues.length > 0) ? 'range' : 'field';
        if (aggregation !== undefined &&
            fieldValues !== undefined &&
            Array.isArray(fieldValues) &&
            fieldValues.length > 0) {
            query.filters[filterName] = {
                field: 'indexed_metadata.' + this.component.props.filterField,
                values: fieldValues,
                application_type: this.component.props.application_type,
                filter_type: filterType
            };
        }
    };
    return MultipleFilter;
}(Widget_1["default"]));
/**
 * Multiple filter widget
 *
 * @param settings
 */
exports["default"] = (function (settings) { return new MultipleFilter(settings); });
