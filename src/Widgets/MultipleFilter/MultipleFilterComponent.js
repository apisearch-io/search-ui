/**
 * @jsx h
 */
import { h, Component } from 'preact';
import {aggregateAction} from "./multipleFilterActions";
import Template from "../Template";

/**
 * Filter Component
 */
class MultipleFilterComponent extends Component {
    componentWillMount() {
        const {
            field: filterField,
            name: filterName,
            type: filterType,
            currentQuery
        } = this.props;

        /**
         * Dispatach action
         */
        aggregateAction(
            {
                filterField,
                filterName
            },
            currentQuery
        )
    }

    render() {
        const {
            limit,
            field: filterField,
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
        let items = Object
            .keys(counters)
            .map(key => counters[key])
        ;

        return (
            <div className={`asui-multipleFilter ${containerClassName}`}>
                <Template
                    template={topTemplate}
                    className={`asui-multipleFilter--top ${topClassName}`}
                />

                <div className={itemsListClassName}>
                {items.map(item => {
                    const reducedTemplateData = {
                        n: item.n,
                        values: item.values
                    };

                    return <Template
                        template={itemTemplate}
                        data={reducedTemplateData}
                        className={`asui-multipleFilter ${itemClassName}`}
                    />
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