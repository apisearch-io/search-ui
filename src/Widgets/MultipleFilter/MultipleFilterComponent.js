/**
 * @jsx h
 */
import { h, Component } from 'preact';
import {aggregationSetup, filterAction} from "./multipleFilterActions";
import Template from "../Template";
import {
    aggregationsObjectToArray, manageCurrentFilterItems,
    simpleObjectToArray
} from "./helpers";

/**
 * Filter Component
 */
class MultipleFilterComponent extends Component {
    constructor() {
        super();
        this.state = {
            activeAggregations: [],
            currentAggregations: []
        }
    }

    componentWillMount() {
        const {
            field: filterField,
            name: filterName,
            currentQuery
        } = this.props;

        /**
         * Dispatach action
         */
        aggregationSetup(
            {
                filterField,
                filterName
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
            let aggregation = aggregations[filterName];
            let counters = (aggregation.counters) ? aggregation.counters : {};
            let aggregationsArray = aggregationsObjectToArray(counters);

            this.setState({
                /**
                 * Current used aggregations
                 */
                activeAggregations: aggregationsArray.filter(
                    item => item.used
                ),
                /**
                 * Current inactive aggregations
                 */
                currentAggregations: aggregationsArray.filter(
                    item => null === item.used
                )
            })
        }
    }

    handleClick = (selectedFilter) => {
        const {
            name: filterName,
            field: filterField,
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
            ? simpleObjectToArray(activeElements)
            : []
        ;

        /**
         * Dispatch action
         */
        filterAction(
            {
                filterName,
                filterField,
                filterValues: manageCurrentFilterItems(
                    selectedFilter,
                    currentActiveFilterValues
                )
            },
            currentQuery,
            client
        );
    };

    render() {
        const {
            classNames: {
                container: containerClassName,
                top: topClassName,
                itemsList: itemsListClassName,
                item: itemClassName
            },
            template: {
                top: topTemplate,
                item: itemTemplate
            }
        } = this.props;

        /**
         * Get aggregation items
         */
        const items = [
            ...this.state.activeAggregations,
            ...this.state.currentAggregations
        ];

        return (
            <div className={`asui-multipleFilter ${containerClassName}`}>
                <Template
                    template={topTemplate}
                    className={`asui-multipleFilter--top ${topClassName}`}
                />

                <div className={itemsListClassName}>
                {items.map(item => {
                    const reducedTemplateData = {
                        n: parseInt(item.n).toLocaleString('de-DE'),
                        isActive: item.used,
                        values: item.values
                    };

                    return (
                        <div
                            className={`asui-multipleFilter--item ${itemClassName}`}
                            onClick={() => this.handleClick(item.__key)}
                        >
                            <Template
                                template={itemTemplate}
                                data={reducedTemplateData}
                            />
                        </div>
                    )
                })}
                </div>
            </div>
        )
    }
}

MultipleFilterComponent.defaultProps = {
    type: 'FILTER_MUST_ALL',
    limit: 10,
    classNames: {
        container: '',
        top: '',
        itemList: '',
        item: ''
    },
    template: {
        top: null,
        item: null
    }
};

export default MultipleFilterComponent;