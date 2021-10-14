import { h, Component } from 'preact';

import { aggregationSetup, filterAction } from "./MultipleFilterActions";
import { manageCurrentFilterItems } from "./Helpers";

import Template from "../Template";
import ShowMoreComponent from "./ShowMoreComponent";
import {defaultItemTemplate} from "./defaultTemplates";
import {MultipleFilterProps} from "./MultipleFilterProps";
import {MultipleFilterState} from "./MultipleFilterState";
import {Counter} from 'apisearch';
import {ResultAggregation} from 'apisearch';

/**
 * Filter Component
 */
class MultipleFilterComponent extends Component<MultipleFilterProps, MultipleFilterState> {

    /**
     * Constructor
     */
    constructor() {
        super();
        this.state = {
            aggregations: [],
            filters: [],
            viewLimit: 0,
        };
    }

    /**
     * Components will mount
     */
    componentWillMount() {

        const props = this.props;
        const environmentId = props.environmentId;
        const filterName = props.filterName;
        const filterField = props.filterField;
        const aggregationField = props.aggregationField;
        const applicationType = props.applicationType;
        const sortBy = props.sortBy;
        const ranges = props.ranges;
        const fetchLimit = props.fetchLimit;
        const viewLimit = props.viewLimit;
        const currentQuery = props.store.getCurrentQuery();

        /**
         * Set view items limit
         */
        const isViewLimitProperlySet = (viewLimit && viewLimit < fetchLimit);
        this.setState((prevState) => {
            return {
               viewLimit: (isViewLimitProperlySet)
                   ? viewLimit
                   : fetchLimit,
           };
        });

        /**
         * Dispatch action
         */
        aggregationSetup(
            environmentId,
            currentQuery,
            filterName,
            (
                aggregationField
                    ? aggregationField
                    : filterField
            ),
            applicationType,
            sortBy,
            fetchLimit,
            ranges
        );
    }

    /**
     * Component will receive props
     *
     * @param props
     */
    componentWillReceiveProps(props) {

        const filterName = props.filterName;
        if (props.store.getCurrentResult() == null) {
            this.setState((prevState) => {
                return {
                    aggregations: [],
                    filters: [],
                };
            });

            return;
        }

        const result = props.store.getCurrentResult();
        const aggregation = result.getAggregation(filterName);
        const query = props.store.getCurrentQuery();
        const filter = query.getFilter(filterName);

        if (aggregation && typeof aggregation.getCounters === "function") {

            /**
             * Getting aggregation from aggregations
             */
            const counters = aggregation.getCounters();
            const countersAsArray: Counter[] = Object.values(counters);

            const aggregations = props.activeFirst
                ? [
                    ...countersAsArray.filter(
                        (counter) =>
                            true === counter.isUsed(),
                    ),
                    ...countersAsArray.filter(
                        (counter) =>
                            (
                                false === counter.isUsed() ||
                                null === counter.isUsed()
                            ),
                    ),
                ]
                : countersAsArray;

            this.setState((prevState) => {
                return {
                    aggregations: aggregations,
                    filters: filter ? filter.getValues() : [],
                };
            });
        }
    }

    /**
     * Handle click
     *
     * @param selectedFilter
     */
    handleClick = (selectedFilter) => {
        const props = this.props;
        const environmentId = props.environmentId;
        const filterName = props.filterName;
        const filterField = props.filterField;
        const aggregationField = props.aggregationField;
        const applicationType = props.applicationType;
        const sortBy = props.sortBy;
        const ranges = props.ranges;
        const labels = props.labels;
        const fetchLimit = props.fetchLimit;
        const repository = props.repository;
        const currentQuery = props.store.getCurrentQuery();
        const aggregation = props.store.getCurrentResult().getAggregation(filterName);
        const selectedFilterAsString = String(selectedFilter);
        const currentActiveFilterValues = aggregation instanceof ResultAggregation
            ? Object.values(aggregation.getActiveElements())
            : [];

        const valuesAsString = currentActiveFilterValues.map((element) => {
            return String(element);
        });

        /**
         * Dispatch filter action
         */
        filterAction(
            environmentId,
            currentQuery,
            repository,
            filterName,
            filterField,
            (
                aggregationField
                    ? aggregationField
                    : filterField
            ),
            manageCurrentFilterItems(
                selectedFilterAsString,
                valuesAsString,
            ),
            applicationType,
            sortBy,
            fetchLimit,
            ranges,
            labels,
        );
    };

    /**
     * Handle show more
     */
    handleShowMore = () => {

        const viewLimit = this.state.aggregations.length;

        this.setState((prevState) => {
            return {viewLimit};
        });
    };

    /**
     * Handle show less
     */
    handleShowLess = () => {
        const viewLimit = this.props.viewLimit;
        this.setState((prevState) => {
            return {viewLimit};
        });
    };

    /**
     * Render
     *
     * @return {any}
     */
    render() {
        const props = this.props;
        const state = this.state;
        const viewLimit = props.viewLimit;
        const fetchLimit = props.fetchLimit;

        const containerClassName = props.classNames.container;
        const topClassName = props.classNames.top;
        const itemsListClassName = props.classNames.itemsList;
        const itemClassName = props.classNames.item;
        const activeClassName = props.classNames.active;
        const showMoreContainerClassName = props.classNames.showMoreContainer;

        const topTemplate = props.template.top;
        const itemTemplate = props.template.item;
        const showMoreTemplate = props.template.showMore;
        const showLessTemplate = props.template.showLess;

        const formatData = props.formatData;
        const labels = Object.keys(props.ranges).length > 0
            ? props.ranges
            : props.labels;

        /**
         * Get aggregation items
         */
        const that = this;
        const itemsIds = {};
        const allItems = this.state.aggregations.map((item: Counter) => {
            const uid = Math.floor(Math.random() * 10000000000);
            const values = item.getValues();
            values.name = labels[values.name] ? labels[values.name] : values.name;
            itemsIds[values.id] = true;
            return {
                isActive: item.isUsed(),
                n: item.getN(),
                uid,
                values,
            };
        });

        /**
         * Shadow filters. These filters are not part of the aggregation list but are applied. Should always be listed
         * first
         */
        if (state.filters.length > 0) {
            state.filters.forEach((filter) => {
                if (itemsIds[filter] === undefined) {
                    const uid = Math.floor(Math.random() * 10000000000);
                    allItems.unshift({
                        isActive: true,
                        n: 0,
                        uid,
                        values: {
                            id: filter,
                            name: filter,
                        },
                    });
                }
            });
        }

        /**
         * Get existing applied filters if they exist
         */
        if (allItems.length === 0) {
            return null;
        }

        const items = allItems.slice(0, this.state.viewLimit);
        const allItemsLength = allItems.length;

        /**
         * Check available view limit
         */
        const isViewLimitProperlySet = (
            viewLimit &&
            viewLimit < fetchLimit &&
            allItemsLength > viewLimit
        );

        return (
            <div className={`as-multipleFilter ${containerClassName}`}>
                <Template
                    template={topTemplate}
                    className={`as-multipleFilter__top ${topClassName}`}
                    dictionary={this.props.dictionary}
                />

                <div className={`as-multipleFilter__itemsList ${itemsListClassName}`}>
                    <ul>
                        {items.map((item) => {
                            const formattedTemplateData = formatData(item);
                            return (
                                <li
                                    className={
                                        `as-multipleFilter__item ` +
                                        `${itemClassName} ` +
                                        `${(item.isActive) ? activeClassName : ""}`
                                    }
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        that.handleClick(item.values.id);
                                    }}
                                >
                                    <Template
                                        template={itemTemplate}
                                        data={formattedTemplateData}
                                        dictionary={this.props.dictionary}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {(isViewLimitProperlySet)
                    ? <ShowMoreComponent
                        allItemsLength={allItemsLength}
                        currentLimit={this.state.viewLimit}
                        handleShowMore={this.handleShowMore}
                        handleShowLess={this.handleShowLess}
                        showMoreContainerClassName={showMoreContainerClassName}
                        showMoreTemplate={showMoreTemplate}
                        showLessTemplate={showLessTemplate}
                        dictionary={this.props.dictionary}
                    /> : null
                }
            </div>
        );
    }
}

MultipleFilterComponent.defaultProps = {
    aggregationField: null,
    applicationType: 8, // FILTER_MUST_ALL
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
        item: defaultItemTemplate,
        showMore: '+ Show more',
        showLess: '- Show less'
    },
    formatData: data => data,
    activeFirst: true
};

export default MultipleFilterComponent;
