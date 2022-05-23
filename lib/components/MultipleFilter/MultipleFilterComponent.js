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
        _this.currentLevel = 0;
        _this.propsReceived = false;
        /**
         * @param selectedFilter
         * @param level
         */
        _this.handleClick = function (selectedFilter, level) {
            var _a;
            var props = _this.props;
            var environmentId = props.environmentId;
            var filterName = props.filterName;
            var filterField = props.filterField;
            var aggregationField = (_a = props.aggregationField) !== null && _a !== void 0 ? _a : filterField;
            var applicationType = props.applicationType;
            var sortBy = props.sortBy;
            var ranges = props.ranges;
            var labels = props.labels;
            var fetchLimit = props.fetchLimit;
            var repository = props.repository;
            var currentQuery = props.store.getCurrentQuery();
            // const aggregation = props.store.getCurrentResult().getAggregation(filterName);
            var selectedFilterAsString = String(selectedFilter);
            /*
            const currentActiveFilterValues =
                aggregation instanceof ResultAggregation &&
                (aggregation.getActiveElements() !== null)
                    ? Object.values(aggregation.getActiveElements())
                    : [];
    
             */
            var valuesAsString = (applicationType === 6)
                ? Helpers_1.getShadowFilterValuesFromQuery(currentQuery, filterName, true)
                : Helpers_1.getFilterValuesFromQuery(currentQuery, filterName);
            var wasSelected = Helpers_1.wasElementRecentlySelected(selectedFilterAsString, valuesAsString);
            var filterItems = Helpers_1.manageCurrentFilterItems(selectedFilterAsString, valuesAsString, wasSelected, (applicationType !== 6));
            var currentLevel = level;
            if (applicationType === 6) {
                currentLevel = wasSelected ? currentLevel : (currentLevel - 1);
            }
            var shadowLeveledFilters = [];
            var originalFilterField = filterField;
            if (applicationType === 6) {
                filterField = filterField + "_level_" + (currentLevel);
                aggregationField = aggregationField + "_level_" + (currentLevel + 1);
                filterItems = filterItems.slice(0, currentLevel);
                shadowLeveledFilters = filterItems.slice(0, -1);
                filterItems = filterItems.slice(-1);
            }
            _this.currentLevel = currentLevel;
            /**
             * Dispatch filter action
             */
            MultipleFilterActions_1.filterAction(environmentId, currentQuery, repository, filterName, filterField, aggregationField, filterItems, applicationType, sortBy, fetchLimit, ranges, labels, shadowLeveledFilters, originalFilterField);
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
            aggregations: [],
            viewLimit: 0
        };
        return _this;
    }
    /**
     * Components will mount
     */
    MultipleFilterComponent.prototype.componentWillMount = function () {
        var _a;
        var props = this.props;
        var aggregationField = (_a = props.aggregationField) !== null && _a !== void 0 ? _a : props.filterField;
        var applicationType = props.applicationType;
        var fetchLimit = props.fetchLimit;
        var viewLimit = props.viewLimit;
        /**
         * Set view items limit
         */
        var isViewLimitProperlySet = (viewLimit && viewLimit < fetchLimit);
        this.setState(function (_) {
            return {
                viewLimit: (isViewLimitProperlySet)
                    ? viewLimit
                    : fetchLimit
            };
        });
        if (applicationType === 6) {
            aggregationField = aggregationField + "_level_1";
        }
        /**
         * Dispatch action
         */
        MultipleFilterActions_1.aggregationSetup(props.environmentId, props.store.getCurrentQuery(), props.filterName, props.filterField, aggregationField, applicationType, props.sortBy, fetchLimit, props.ranges, props.promoted);
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
                    aggregations: [],
                    filters: []
                };
            });
            return;
        }
        var result = props.store.getCurrentResult();
        var aggregation = result.getAggregation(filterName);
        var aggregations = [];
        if (aggregation && typeof aggregation.getCounters === "function") {
            /**
             * Getting aggregation from aggregations
             */
            var counters = aggregation.getCounters();
            var countersAsArray = Object.values(counters);
            aggregations = props.activeFirst
                ? __spreadArrays(countersAsArray.filter(function (counter) {
                    return true === counter.isUsed();
                }), countersAsArray.filter(function (counter) {
                    return (false === counter.isUsed() ||
                        null === counter.isUsed());
                })) : countersAsArray;
        }
        this.setState(function (prevState) {
            return {
                aggregations: aggregations
            };
        });
        if (props.applicationType === 6 &&
            this.propsReceived === false) {
            var filter = props.store.getCurrentQuery().getFilter(filterName);
            this.currentLevel = (filter === undefined || filter === null)
                ? this.currentLevel
                : filter.values
                    ? (filter.values.length + 1)
                    : this.currentLevel;
            this.propsReceived = true;
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
        var currentQuery = props.store.getCurrentQuery();
        var formatData = props.formatData;
        var labels = Object.keys(props.ranges).length > 0
            ? props.ranges
            : props.labels;
        /**
         * Get aggregation items
         */
        var that = this;
        var itemsIds = {};
        var allItems = this.state.aggregations.map(function (item) {
            var uid = Math.floor(Math.random() * 10000000000);
            var values = item.getValues();
            values.name = labels[values.name] ? labels[values.name] : values.name;
            itemsIds[values.id] = true;
            return {
                isActive: item.isUsed(),
                n: item.getN(),
                uid: uid,
                values: values
            };
        });
        /**
         * Shadow filters. These filters are not part of the aggregation list but are applied. Should always be listed
         * first
         */
        var appliedFilters = (props.applicationType === 6)
            ? Helpers_1.getShadowFilterValuesFromQuery(currentQuery, props.filterName, true)
            : Helpers_1.getFilterValuesFromQuery(currentQuery, props.filterName);
        if (appliedFilters.length > 0) {
            var zeroItemsFilters_1 = [];
            appliedFilters.forEach(function (filter) {
                if (itemsIds[filter] === undefined) {
                    var uid = Math.floor(Math.random() * 10000000000);
                    zeroItemsFilters_1.push({
                        isActive: true,
                        n: 0,
                        uid: uid,
                        values: {
                            id: filter,
                            name: filter
                        }
                    });
                }
            });
            allItems = __spreadArrays(zeroItemsFilters_1, allItems);
        }
        /**
         * Get existing applied filters if they exist
         */
        if (allItems.length === 0) {
            return null;
        }
        var items = allItems.slice(0, this.state.viewLimit);
        var allItemsLength = allItems.length;
        var levelCounter = 1;
        /**
         * Check available view limit
         */
        var isViewLimitProperlySet = (viewLimit &&
            viewLimit < fetchLimit &&
            allItemsLength > viewLimit);
        return (preact_1.h("div", { className: "as-multipleFilter " + containerClassName },
            preact_1.h(Template_1["default"], { template: topTemplate, className: "as-multipleFilter__top " + topClassName, dictionary: this.props.dictionary }),
            preact_1.h("div", { className: "as-multipleFilter__itemsList " + itemsListClassName },
                preact_1.h("ul", null, items.map(function (item) {
                    var formattedTemplateData = formatData(item);
                    var level = Math.min(levelCounter, _this.currentLevel + 1);
                    levelCounter++;
                    return (preact_1.h("li", { className: "as-multipleFilter__item " +
                            (itemClassName + " ") +
                            ("" + ((item.isActive) ? activeClassName : "")), onClick: function (e) {
                            e.stopPropagation();
                            e.preventDefault();
                            that.handleClick(item.values.id, level);
                        } },
                        preact_1.h(Template_1["default"], { template: itemTemplate, data: formattedTemplateData, dictionary: _this.props.dictionary })));
                }))),
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
    activeFirst: true,
    promoted: []
};
exports["default"] = MultipleFilterComponent;
