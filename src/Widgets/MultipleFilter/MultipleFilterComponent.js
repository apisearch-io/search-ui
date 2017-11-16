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
            limit: 0,
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
            limit,
            currentQuery
        } = this.props;

        this.setState({limit});

        /**
         * Dispatch action
         */
        aggregationSetup(
            {
                environmentId,
                filterName,
                filterField,
                applicationType,
                sortBy,
                aggregationField: aggregationField
                    ? aggregationField
                    : filterField
            },
            currentQuery
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
         * Dispatch action
         */
        filterAction(
            {
                environmentId,
                filterName,
                filterField,
                applicationType,
                sortBy,
                aggregationField: aggregationField
                    ? aggregationField
                    : filterField
                ,
                filterValues: manageCurrentFilterItems(
                    selectedFilter,
                    currentActiveFilterValues
                )
            },
            currentQuery,
            client
        );
    };

    handleShowMore = () => {
        const {activeAggregations, currentAggregations} = this.state;
        const limit = activeAggregations.length + currentAggregations.length;
        this.setState({limit})
    };

    handleShowLess = () => {
        const {limit} = this.props;
        this.setState({limit});
    };

    render() {
        const {
            showMoreActive,
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
            }
        } = this.props;

        /**
         * Get aggregation items
         */
        const allItems = [
            ...this.state.activeAggregations,
            ...this.state.currentAggregations
        ];
        const allItemsLength = allItems.length;
        const items = allItems.slice(0, this.state.limit);

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

                    return (
                        <div
                            className={`asui-multipleFilter--item ${itemClassName}`}
                            onClick={() => this.handleClick(item.values.id)}
                        >
                            <Template
                                template={itemTemplate}
                                data={reducedTemplateData}
                            />
                        </div>
                    )
                })}
                </div>

                {(showMoreActive)
                    ? <ShowMoreComponent
                        allItemsLength={allItemsLength}
                        currentLimit={this.state.limit}
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
    limit: 10,
    sortBy: ['_term', 'desc'],
    showMoreActive: true,
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
    }
};

export default MultipleFilterComponent;