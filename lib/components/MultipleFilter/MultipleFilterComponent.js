"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
            var currentQuery = props.currentQuery;
            var aggregation = props.currentResult.getAggregation(filterName);
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
            var activeAggregations = _this.state.activeAggregations;
            var currentAggregations = _this.state.currentAggregations;
            var viewLimit = activeAggregations.length + currentAggregations.length;
            _this.setState({ viewLimit: viewLimit });
        };
        /**
         * Handle show less
         */
        _this.handleShowLess = function () {
            var viewLimit = _this.props.viewLimit;
            _this.setState({ viewLimit: viewLimit });
        };
        _this.state = {
            viewLimit: 0,
            activeAggregations: [],
            currentAggregations: []
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
        var currentQuery = props.currentQuery;
        /**
         * Set view items limit
         */
        var isViewLimitProperlySet = (viewLimit && viewLimit < fetchLimit);
        this.setState({
            viewLimit: (isViewLimitProperlySet)
                ? viewLimit
                : fetchLimit
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
        if (props.currentResult == null) {
            return;
        }
        var aggregation = props.currentResult.getAggregation(filterName);
        if (typeof aggregation.getCounters === "function") {
            /**
             * Getting aggregation from aggregations
             */
            var counters = aggregation.getCounters();
            var countersAsArray = Object.values(counters);
            this.setState({
                /**
                 * Current used aggregations
                 */
                activeAggregations: countersAsArray.filter(function (counter) {
                    return true === counter.isUsed();
                }),
                /**
                 * Current inactive aggregations
                 */
                currentAggregations: countersAsArray.filter(function (counter) {
                    return (false === counter.isUsed() ||
                        null === counter.isUsed());
                })
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
        var allItems = this.state.activeAggregations.concat(this.state.currentAggregations);
        var allItemsLength = allItems.length;
        var items = allItems.slice(0, this.state.viewLimit);
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
            preact_1.h(Template_1["default"], { template: topTemplate, className: "as-multipleFilter__top " + topClassName }),
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
                        ("" + ((item.used) ? activeClassName : '')), onClick: function () { return _this.handleClick(item.values.id); } },
                    preact_1.h(Template_1["default"], { template: itemTemplate, data: formattedTemplateData })));
            })),
            (isViewLimitProperlySet)
                ? preact_1.h(ShowMoreComponent_1["default"], { allItemsLength: allItemsLength, currentLimit: this.state.viewLimit, handleShowMore: this.handleShowMore, handleShowLess: this.handleShowLess, showMoreContainerClassName: showMoreContainerClassName, showMoreTemplate: showMoreTemplate, showLessTemplate: showLessTemplate }) : null));
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
    formatData: function (data) { return data; }
};
exports["default"] = MultipleFilterComponent;
