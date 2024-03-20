import { h, Component } from "preact";

import {aggregationSetup, filterAction} from "./MultipleFilterActions";
import {
    getFilterValuesFromQuery,
    getShadowFilterValuesFromQuery,
    manageCurrentFilterItems,
    wasElementRecentlySelected,
} from "./Helpers";

import Template from "../Template";
import ShowMoreComponent from "./ShowMoreComponent";
import {defaultItemTemplate} from "./defaultTemplates";
import {MultipleFilterProps} from "./MultipleFilterProps";
import {MultipleFilterState} from "./MultipleFilterState";
import {Counter} from "apisearch";

/**
 * Filter Component
 */
class MultipleFilterComponent extends Component<MultipleFilterProps, MultipleFilterState> {

    private currentLevel: number = 0;
    private propsReceived: boolean = false;

    /**
     * Constructor
     */
    constructor() {
        super();
        this.state = {
            aggregations: [],
            viewLimit: 0,
        };
    }

    /**
     * Components will mount
     */
    public componentWillMount() {

        const props = this.props;
        let aggregationField = props.aggregationField ?? props.filterField;
        const applicationType = props.applicationType;
        const fetchLimit = props.fetchLimit;
        const viewLimit = props.viewLimit;

        /**
         * Set view items limit
         */
        const isViewLimitProperlySet = (viewLimit && viewLimit < fetchLimit);
        this.setState((_) => {
            return {
               viewLimit: (isViewLimitProperlySet)
                   ? viewLimit
                   : fetchLimit,
           };
        });

        if (applicationType === 6) {
            aggregationField = aggregationField + "_level_1";
        }

        /**
         * Dispatch action
         */
        aggregationSetup(
            props.environmentId,
            props.store.getCurrentQuery(),
            props.filterName,
            props.filterField,
            aggregationField,
            applicationType,
            props.sortBy,
            fetchLimit,
            props.ranges,
            props.promoted,
        );
    }

    /**
     * Component will receive props
     *
     * @param props
     */
    public componentWillReceiveProps(props) {

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
        let aggregations = [];

        if (aggregation && typeof aggregation.getCounters === "function") {

            /**
             * Getting aggregation from aggregations
             */
            const counters = aggregation.getCounters();
            const countersAsArray: Counter[] = Object.values(counters);

            aggregations = props.activeFirst
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

        }

        this.setState((prevState) => {
            return {
                aggregations,
            };
        });

        if (
            props.applicationType === 6 &&
            this.propsReceived === false
        ) {
            const filter = props.store.getCurrentQuery().getFilter(filterName);
            this.currentLevel = (filter === undefined || filter === null)
                ? this.currentLevel
                : filter.values
                    ? (filter.values.length + 1)
                    : this.currentLevel;

            this.propsReceived = true;
        }
    }

    /**
     * @param selectedFilter
     * @param level
     */
    public handleClick = (selectedFilter, level) => {
        const props = this.props;
        const environmentId = props.environmentId;
        const filterName = props.filterName;
        let filterField = props.filterField;
        let aggregationField = props.aggregationField ?? filterField;
        const applicationType = props.applicationType;
        const sortBy = props.sortBy;
        const ranges = props.ranges;
        const labels = props.labels;
        const fetchLimit = props.fetchLimit;
        const repository = props.repository;
        const currentQuery = props.store.getCurrentQuery();
        const selectedFilterAsString = String(selectedFilter);

        const valuesAsString = (applicationType === 6)
            ? getShadowFilterValuesFromQuery(currentQuery, filterName, true)
            : getFilterValuesFromQuery(currentQuery, filterName);

        const wasNotSelected = wasElementRecentlySelected(selectedFilterAsString, valuesAsString);
        let filterItems = manageCurrentFilterItems(
            selectedFilterAsString,
            valuesAsString,
            wasNotSelected,
            (applicationType !== 6),
        );

        let currentLevel = level;
        if (applicationType === 6) {
            currentLevel = wasNotSelected ? currentLevel : (currentLevel - 1);
        }

        let shadowLeveledFilters = [];
        const originalFilterField = filterField;
        if (applicationType === 6) {
            filterField = filterField + "_level_" + (currentLevel);
            aggregationField = aggregationField + "_level_" + (currentLevel + 1);
            filterItems = filterItems.slice(0, currentLevel);
            shadowLeveledFilters = filterItems.slice(0, -1);
            filterItems = filterItems.slice(-1);
        }

        this.currentLevel = currentLevel;

        /**
         * Dispatch filter action
         */
        filterAction(
            environmentId,
            currentQuery,
            repository,
            filterName,
            filterField,
            aggregationField,
            filterItems,
            applicationType,
            sortBy,
            fetchLimit,
            ranges,
            labels,
            shadowLeveledFilters,
            originalFilterField,
            props.promoted,
            wasNotSelected ? selectedFilterAsString : null,
        );
    }

    /**
     * Handle show more
     */
    public handleShowMore = () => {

        const viewLimit = this.state.aggregations.length;

        this.setState((prevState) => {
            return {viewLimit};
        });
    }

    /**
     * Handle show less
     */
    public handleShowLess = () => {
        const viewLimit = this.props.viewLimit;
        this.setState((prevState) => {
            return {viewLimit};
        });
    }

    /**
     * Render
     *
     * @return {any}
     */
    public render() {
        const props = this.props;
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
        const currentQuery = props.store.getCurrentQuery();

        const formatData = props.formatData;
        const labels = Object.keys(props.ranges).length > 0
            ? props.ranges
            : props.labels;

        /**
         * Get aggregation items
         */
        const that = this;
        const itemsIds = {};
        let allItems = this.state.aggregations.map((item: Counter) => {
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
        const appliedFilters = (props.applicationType === 6)
            ? getShadowFilterValuesFromQuery(currentQuery, props.filterName, true)
            : getFilterValuesFromQuery(currentQuery, props.filterName);

        if (appliedFilters.length > 0) {
            const zeroItemsFilters = [];
            appliedFilters.forEach((filter) => {
                if (itemsIds[filter] === undefined) {
                    const uid = Math.floor(Math.random() * 10000000000);
                    zeroItemsFilters.push({
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

            allItems = [...zeroItemsFilters, ...allItems];
        }

        /**
         * Get existing applied filters if they exist
         */
        if (allItems.length === 0) {
            return null;
        }

        const items = allItems.slice(0, this.state.viewLimit);
        const allItemsLength = allItems.length;
        let levelCounter = 1;
        const topData = {
            hasApplied: appliedFilters.length > 0,
            nApplied: appliedFilters.length,
        };

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
                    data={topData}
                />

                <div className={`as-multipleFilter__itemsList ${itemsListClassName}`}>
                    <ul>
                        {items.map((item) => {
                            const formattedTemplateData = formatData(item);
                            const level = Math.min(levelCounter, this.currentLevel + 1);
                            levelCounter++;
                            return (
                                <li
                                    className={
                                        `as-multipleFilter__item ` +
                                        `${itemClassName} ` +
                                        `${(item.isActive) ? activeClassName : ""}` +
                                        `${(props.promoted.includes(item.values.name) ? "as-multipleFilter__item_featured" : "")}`
                                    }
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        that.handleClick(
                                            item.values.id,
                                            level,
                                        );
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
        container: "",
        top: "",
        itemsList: "",
        item: "",
        active: "as-multipleFilter__item--active",
        showMoreContainer: "",
    },
    template: {
        top: null,
        item: defaultItemTemplate,
        showMore: "+ Show more",
        showLess: "- Show less",
    },
    formatData: (data) => data,
    activeFirst: true,
    promoted: [],
};

export default MultipleFilterComponent;
