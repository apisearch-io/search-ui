/**
 * @jsx h
 */
import { h, Component } from 'preact';
import {aggregationSetup, filterAction} from "./multipleFilterActions";
import Template from "../Template";
import {aggregationsObjectToArray, simpleObjectToArray} from "./helpers";

/**
 * Filter Component
 */
class MultipleFilterComponent extends Component {
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

    handleClick = (e) => {
        const {
            field: filterField,
            name: filterName,
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
            ? simpleObjectToArray()
            : []
        ;

        filterAction(
            {
                filterName,
                filterField,
                filterValues: [
                    ...currentActiveFilterValues,
                    e
                ]
            },
            currentQuery,
            client
        )
    };

    render() {
        const {
            name: filterName,
            classNames: {
                container: containerClassName,
                top: topClassName,
                itemsList: itemsListClassName,
                item: itemClassName
            },
            template: {
                top: topTemplate,
                item: itemTemplate
            },
            data: {
                aggregations: {
                    aggregations
                }
            }
        } = this.props;

        if (typeof aggregations === 'undefined') return false;

        /**
         * Get aggregation items
         */
        let counters = aggregations[filterName].counters;
        const items = aggregationsObjectToArray(counters);

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