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
var apisearch_1 = require("apisearch");
var preact_1 = require("preact");
var Helpers_1 = require("../components/MultipleFilter/Helpers");
var MultipleFilterActions_1 = require("../components/MultipleFilter/MultipleFilterActions");
var MultipleFilterComponent_1 = require("../components/MultipleFilter/MultipleFilterComponent");
var Widget_1 = require("./Widget");
/**
 * Multiple Filter
 */
var MultipleFilter = /** @class */ (function (_super) {
    __extends(MultipleFilter, _super);
    /**
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
     * @param promoted
     * @param dynamicSearch
     * @param dynamicSearchPlaceholder
     */
    function MultipleFilter(_a) {
        var target = _a.target, filterName = _a.filterName, filterField = _a.filterField, aggregationField = _a.aggregationField, applicationType = _a.applicationType, fetchLimit = _a.fetchLimit, viewLimit = _a.viewLimit, sortBy = _a.sortBy, ranges = _a.ranges, labels = _a.labels, classNames = _a.classNames, template = _a.template, formatData = _a.formatData, activeFirst = _a.activeFirst, promoted = _a.promoted, dynamicSearch = _a.dynamicSearch, dynamicSearchPlaceholder = _a.dynamicSearchPlaceholder;
        var _this = _super.call(this) || this;
        _this.target = target;
        _this.filterField = filterField;
        _this.aggregationField = aggregationField !== null && aggregationField !== void 0 ? aggregationField : filterField;
        _this.component = preact_1.h(MultipleFilterComponent_1["default"], { target: target, filterName: filterName, filterField: _this.filterField, aggregationField: _this.aggregationField, applicationType: applicationType, fetchLimit: fetchLimit, viewLimit: viewLimit, sortBy: sortBy, ranges: ranges, labels: labels, classNames: __assign(__assign({}, MultipleFilterComponent_1["default"].defaultProps.classNames), classNames), template: __assign(__assign({}, MultipleFilterComponent_1["default"].defaultProps.template), template), formatData: formatData, activeFirst: activeFirst, promoted: promoted, dynamicSearch: dynamicSearch, dynamicSearchPlaceholder: dynamicSearchPlaceholder });
        return _this;
    }
    /**
     * @param environmentId
     * @param store
     * @param repository
     * @param dictionary
     */
    MultipleFilter.prototype.render = function (environmentId, store, repository, dictionary) {
        this.component.props = __assign(__assign({}, this.component.props), { dictionary: dictionary,
            environmentId: environmentId,
            repository: repository,
            store: store });
        preact_1.render(this.component, document.querySelector(this.target));
    };
    /**
     * @param query
     * @param object
     */
    MultipleFilter.prototype.toUrlObject = function (query, object) {
        var filterName = this.component.props.filterName;
        var aggregation = query.aggregations[filterName];
        var filterField = this.component.props.filterField;
        if (aggregation !== undefined &&
            query.filters !== undefined &&
            query.filters[filterName] !== undefined) {
            var filter = query.filters[filterName];
            var filterValues = filter.values;
            if (filterValues.length > 0) {
                if (filter.application_type === 6) {
                    var levelsValues = Helpers_1.getShadowFilterValuesFromQuery(query, filterName, false);
                    object[filterField] = {
                        l: levelsValues,
                        v: filter.values
                    };
                }
                else {
                    object[filterField] = filterValues;
                }
            }
        }
    };
    /**
     * @param object
     * @param query
     */
    MultipleFilter.prototype.fromUrlObject = function (object, query) {
        var _a;
        var filterName = this.component.props.filterName;
        var aggregation = query.aggregations[filterName];
        var filterField = this.component.props.filterField;
        var fieldValues = (_a = object[filterField]) !== null && _a !== void 0 ? _a : object[filterName];
        var rangesValues = Object.keys(this.component.props.ranges);
        var filterType = (rangesValues.length > 0) ? "range" : "field";
        if (aggregation !== undefined &&
            fieldValues !== undefined &&
            (Array.isArray(fieldValues) && (fieldValues.length > 0) ||
                (typeof fieldValues === "object") && (Object.keys(fieldValues).length > 0))) {
            if (query.filters === undefined) {
                query.filters = {};
            }
            var applicationType = this.component.props.applicationType;
            var fieldName = "indexed_metadata." + this.component.props.filterField;
            if (applicationType === 6) {
                var originalFieldValues = fieldValues;
                fieldValues = originalFieldValues.v;
                var leveledValues = originalFieldValues.l;
                for (var it_1 = 0; it_1 < leveledValues.length; it_1++) {
                    var level = it_1 + 1;
                    var fieldNameWithoutPrefix = fieldName.substr(17);
                    var leveledFilterName = fieldNameWithoutPrefix + "_level_" + level;
                    var leveledFieldName = "indexed_metadata." + leveledFilterName;
                    query.filters[leveledFilterName] = {
                        application_type: applicationType,
                        field: leveledFieldName,
                        filter_type: apisearch_1.FILTER_TYPE_FIELD,
                        values: [leveledValues[it_1]]
                    };
                }
                fieldName = fieldName + "_level_" + (leveledValues.length + 1);
            }
            query.filters[filterName] = {
                application_type: applicationType,
                field: fieldName,
                filter_type: filterType,
                values: fieldValues
            };
        }
    };
    /**
     * @param query
     */
    MultipleFilter.prototype.reset = function (query) {
        var filterName = this.component.props.filterName;
        if (query.filters !== undefined &&
            typeof query.filters === "object" &&
            query.filters[filterName] !== undefined) {
            delete query.filters[filterName];
        }
    };
    /**
     * @param environmentId
     * @param query
     */
    MultipleFilter.prototype.normalizeQuery = function (environmentId, query) {
        var filterName = this.component.props.filterName;
        if (Helpers_1.isFilterAvailable(query, filterName, 6)) {
            MultipleFilterActions_1.modifyQueryAggregationWithProperLevelValue(environmentId, query, filterName, this.filterField, this.aggregationField);
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
