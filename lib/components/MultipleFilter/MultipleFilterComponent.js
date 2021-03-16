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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var preact_1 = require("preact");
var MultipleFilterActions_1 = require("./MultipleFilterActions");
var Helpers_1 = require("./Helpers");
var Template_1 = require("../Template");
var ShowMoreComponent_1 = require("./ShowMoreComponent");
var defaultTemplates_1 = require("./defaultTemplates");
var apisearch_1 = require("apisearch");
/**
 * Filter Component
 */
var MultipleFilterComponent = /** @class */ (function (_super) {
    __extends(MultipleFilterComponent, _super);
    /**
     * Constructor
     */
    function MultipleFilterComponent() {
        var _this = _super.call(this) || this;
        /**
         * Handle click
         *
         * @param selectedFilter
         */
        _this.handleClick = function (selectedFilter) {
            var props = _this.props;
            var environmentId = props.environmentId;
            var filterName = props.filterName;
            var filterField = props.filterField;
            var aggregationField = props.aggregationField;
            var applicationType = props.applicationType;
            var sortBy = props.sortBy;
            var ranges = props.ranges;
            var labels = props.labels;
            var fetchLimit = props.fetchLimit;
            var repository = props.repository;
            var currentQuery = props.store.getCurrentQuery();
            var aggregation = props.store.getCurrentResult().getAggregation(filterName);
            var selectedFilterAsString = String(selectedFilter);
            var currentActiveFilterValues = aggregation instanceof apisearch_1.ResultAggregation
                ? Object.values(aggregation.getActiveElements())
                : [];
            var valuesAsString = currentActiveFilterValues.map(function (element) {
                return String(element);
            });
            /**
             * Dispatch filter action
             */
            MultipleFilterActions_1.filterAction(environmentId, currentQuery, repository, filterName, filterField, (aggregationField
                ? aggregationField
                : filterField), Helpers_1.manageCurrentFilterItems(selectedFilterAsString, valuesAsString), applicationType, sortBy, fetchLimit, ranges, labels);
        };
        /**
         * Handle show more
         */
        _this.handleShowMore = function () {
            var viewLimit = _this.state.aggregations.length;
            _this.setState(function (prevState) {
                return { viewLimit: viewLimit };
            });
        };
        /**
         * Handle show less
         */
        _this.handleShowLess = function () {
            var viewLimit = _this.props.viewLimit;
            _this.setState(function (prevState) {
                return { viewLimit: viewLimit };
            });
        };
        _this.state = {
            viewLimit: 0,
            aggregations: []
        };
        return _this;
    }
    /**
     * Components will mount
     */
    MultipleFilterComponent.prototype.componentWillMount = function () {
        var props = this.props;
        var environmentId = props.environmentId;
        var filterName = props.filterName;
        var filterField = props.filterField;
        var aggregationField = props.aggregationField;
        var applicationType = props.applicationType;
        var sortBy = props.sortBy;
        var ranges = props.ranges;
        var fetchLimit = props.fetchLimit;
        var viewLimit = props.viewLimit;
        var currentQuery = props.store.getCurrentQuery();
        /**
         * Set view items limit
         */
        var isViewLimitProperlySet = (viewLimit && viewLimit < fetchLimit);
        this.setState(function (prevState) {
            return {
                viewLimit: (isViewLimitProperlySet)
                    ? viewLimit
                    : fetchLimit
            };
        });
        /**
         * Dispatch action
         */
        MultipleFilterActions_1.aggregationSetup(environmentId, currentQuery, filterName, (aggregationField
            ? aggregationField
            : filterField), applicationType, sortBy, fetchLimit, ranges);
    };
    /**
     * Component will receive props
     *
     * @param props
     */
    MultipleFilterComponent.prototype.componentWillReceiveProps = function (props) {
        var filterName = props.filterName;
        if (props.store.getCurrentResult() == null) {
            this.setState(function (prevState) {
                return {
                    aggregations: []
                };
            });
            return;
        }
        var aggregation = props.store.getCurrentResult().getAggregation(filterName);
        if (typeof aggregation.getCounters === "function") {
            /**
             * Getting aggregation from aggregations
             */
            var counters = aggregation.getCounters();
            var countersAsArray = Object.values(counters);
            var aggregations_1 = props.activeFirst
                ? __spreadArrays(countersAsArray.filter(function (counter) {
                    return true === counter.isUsed();
                }), countersAsArray.filter(function (counter) {
                    return (false === counter.isUsed() ||
                        null === counter.isUsed());
                })) : countersAsArray;
            this.setState(function (prevState) {
                return {
                    aggregations: aggregations_1
                };
            });
        }
    };
    /**
     * Render
     *
     * @return {any}
     */
    MultipleFilterComponent.prototype.render = function () {
        var _this = this;
        var props = this.props;
        var viewLimit = props.viewLimit;
        var fetchLimit = props.fetchLimit;
        var containerClassName = props.classNames.container;
        var topClassName = props.classNames.top;
        var itemsListClassName = props.classNames.itemsList;
        var itemClassName = props.classNames.item;
        var activeClassName = props.classNames.active;
        var showMoreContainerClassName = props.classNames.showMoreContainer;
        var topTemplate = props.template.top;
        var itemTemplate = props.template.item;
        var showMoreTemplate = props.template.showMore;
        var showLessTemplate = props.template.showLess;
        var formatData = props.formatData;
        var labels = Object.keys(props.ranges).length > 0
            ? props.ranges
            : props.labels;
        /**
         * Get aggregation items
         */
        var allItems = this.state.aggregations;
        var allItemsLength = allItems.length;
        var items = allItems.slice(0, this.state.viewLimit);
        var that = this;
        if (allItems.length == 0) {
            return null;
        }
        /**
         * Check available view limit
         */
        var isViewLimitProperlySet = (viewLimit &&
            viewLimit < fetchLimit &&
            allItemsLength > viewLimit);
        return (preact_1.h("div", { className: "as-multipleFilter " + containerClassName },
            preact_1.h(Template_1["default"], { template: topTemplate, className: "as-multipleFilter__top " + topClassName, dictionary: this.props.dictionary }),
            preact_1.h("div", { className: "as-multipleFilter__itemsList " + itemsListClassName }, items.map(function (item) {
                var values = item.getValues();
                values.name = labels[values.name] ? labels[values.name] : values.name;
                var uid = Math.floor(Math.random() * 10000000000);
                var reducedTemplateData = {
                    n: item.getN(),
                    isActive: item.isUsed(),
                    values: values,
                    uid: uid
                };
                var formattedTemplateData = formatData(reducedTemplateData);
                return (preact_1.h("div", { className: "as-multipleFilter__item " +
                        (itemClassName + " ") +
                        ("" + ((item.used) ? activeClassName : '')), onClick: function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        that.handleClick(item.values.id);
                    } },
                    preact_1.h(Template_1["default"], { template: itemTemplate, data: formattedTemplateData, dictionary: _this.props.dictionary })));
            })),
            (isViewLimitProperlySet)
                ? preact_1.h(ShowMoreComponent_1["default"], { allItemsLength: allItemsLength, currentLimit: this.state.viewLimit, handleShowMore: this.handleShowMore, handleShowLess: this.handleShowLess, showMoreContainerClassName: showMoreContainerClassName, showMoreTemplate: showMoreTemplate, showLessTemplate: showLessTemplate, dictionary: this.props.dictionary }) : null));
    };
    return MultipleFilterComponent;
}(preact_1.Component));
MultipleFilterComponent.defaultProps = {
    aggregationField: null,
    applicationType: 8,
    fetchLimit: 10,
    viewLimit: null,
    sortBy: ['_term', 'desc'],
    ranges: {},
    labels: {},
    classNames: {
        container: '',
        top: '',
        itemsList: '',
        item: '',
        active: 'as-multipleFilter__item--active',
        showMoreContainer: ''
    },
    template: {
        top: null,
        item: defaultTemplates_1.defaultItemTemplate,
        showMore: '+ Show more',
        showLess: '- Show less'
    },
    formatData: function (data) { return data; },
    activeFirst: true
};
exports["default"] = MultipleFilterComponent;
