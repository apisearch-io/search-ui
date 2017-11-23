/**
 * @jsx h
 */
import { h, Component } from 'preact';

import { aggregationSetup, filterAction } from "./multipleFilterActions";
import { manageCurrentFilterItems } from "./helpers";

import Template from "../Template";
import ShowMoreComponent from "./ShowMoreComponent";

/**
 * Filter Component
 */
class MultipleFilterComponent extends Component {
    constructor() {
        super();
        this.state = {
            viewLimit: 0,
            activeAggregations: [],
            currentAggregations: []
        }
    }

    componentWillMount() {
        const {
            environmentId,
            name: filterName,
            filterField,
            aggregationField,
            applicationType,
            sortBy,
            fetchLimit,
            viewLimit,
            currentQuery
        } = this.props;

        /**
         * Set view items limit
         */
        const isViewLimitProperlySet = (viewLimit && viewLimit < fetchLimit);
        this.setState({
            viewLimit: (isViewLimitProperlySet)
                ? viewLimit
                : fetchLimit
        });

        /**
         * Dispatch action
         */
        aggregationSetup(
            {
                filterName,
                applicationType,
                sortBy,
                fetchLimit,
                aggregationField: aggregationField
                    ? aggregationField
                    : filterField
            },
            {
                environmentId,
                currentQuery
            }
        )
    }

    componentWillReceiveProps(props) {
        const {
            name: filterName,
            data: {
                aggregations: {
                    aggregations
                }
            }
        } = props;

        if (typeof aggregations[filterName] !== 'undefined') {
            /**
             * Getting aggregation from aggregations
             */
            let aggregation = aggregations[filterName];
            let counters = (aggregation.counters) ? aggregation.counters : [];

            this.setState({
                /**
                 * Current used aggregations
                 */
                activeAggregations: counters.filter(
                    item => item.used
                ),
                /**
                 * Current inactive aggregations
                 */
                currentAggregations: counters.filter(
                    item => null === item.used
                )
            })
        }
    }

    handleClick = (selectedFilter) => {
        const {
            environmentId,
            name: filterName,
            filterField,
            aggregationField,
            applicationType,
            sortBy,
            fetchLimit,
            currentQuery,
            client,
            data: {
                aggregations: {
                    aggregations
                }
            }
        } = this.props;

        let activeElements = aggregations[filterName].active_elements;
        let currentActiveFilterValues = (typeof activeElements !== 'undefined')
            ? activeElements
            : []
        ;

        /**
         * Dispatch filter action
         */
        filterAction(
            {
                filterName,
                filterField,
                applicationType,
                sortBy,
                fetchLimit,
                aggregationField: aggregationField
                    ? aggregationField
                    : filterField
                ,
                filterValues: manageCurrentFilterItems(
                    selectedFilter,
                    currentActiveFilterValues
                )
            },
            {
                environmentId,
                currentQuery,
                client
            }
        );
    };

    handleShowMore = () => {
        const {
            activeAggregations,
            currentAggregations
        } = this.state;

        const viewLimit = activeAggregations.length + currentAggregations.length;
        this.setState({viewLimit});
    };

    handleShowLess = () => {
        const {viewLimit} = this.props;
        this.setState({viewLimit});
    };

    render() {
        const {
            viewLimit,
            fetchLimit,
            classNames: {
                container: containerClassName,
                top: topClassName,
                itemsList: itemsListClassName,
                item: itemClassName,
                showMoreContainer: showMoreContainerClassName
            },
            template: {
                top: topTemplate,
                item: itemTemplate,
                showMore: showMoreTemplate,
                showLess: showLessTemplate
            },
            formatData
        } = this.props;

        /**
         * Get aggregation items
         */
        const allItems = [
            ...this.state.activeAggregations,
            ...this.state.currentAggregations
        ];
        const allItemsLength = allItems.length;
        const items = allItems.slice(0, this.state.viewLimit);

        /**
         * Check available view limit
         */
        const isViewLimitProperlySet = (viewLimit && viewLimit < fetchLimit);

        return (
            <div className={`asui-multipleFilter ${containerClassName}`}>
                <Template
                    template={topTemplate}
                    className={`asui-multipleFilter--top ${topClassName}`}
                />

                <div className={`asui-multipleFilter--itemsList ${itemsListClassName}`}>
                {items.map(item => {
                    const reducedTemplateData = {
                        n: parseInt(item.n).toLocaleString('de-DE'),
                        isActive: item.used,
                        values: item.values
                    };
                    const formattedTemplateData = formatData(reducedTemplateData);

                    return (
                        <div
                            className={`asui-multipleFilter--item ${itemClassName}`}
                            onClick={() => this.handleClick(item.values.id)}
                        >
                            <Template
                                template={itemTemplate}
                                data={formattedTemplateData}
                            />
                        </div>
                    )
                })}
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
                    /> : null
                }
            </div>
        )
    }
}

MultipleFilterComponent.defaultProps = {
    aggregationField: null,
    applicationType: 8, // FILTER_MUST_ALL
    fetchLimit: 10,
    viewLimit: null,
    sortBy: ['_term', 'desc'],
    classNames: {
        container: '',
        top: '',
        itemsList: '',
        item: '',
        showMoreContainer: ''
    },
    template: {
        top: null,
        item: null,
        showMore: '+ Show more',
        showLess: '- Show less'
    },
    formatData: data => data
};

export default MultipleFilterComponent;