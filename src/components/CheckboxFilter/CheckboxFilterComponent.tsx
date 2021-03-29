import { h, Component } from 'preact';
import {CheckboxFilterProps} from './CheckboxFilterProps';
import {CheckboxFilterState} from './CheckboxFilterState';
import {
    aggregationSetup,
    onChangeSearchAction
} from "./CheckboxFilterActions";
import Template from "../Template";
import {defaultItemTemplate} from "./defaultTemplates";

/**
 * Checkbox Filter Component
 */
class CheckboxFilterComponent extends Component<CheckboxFilterProps, CheckboxFilterState> {

    /**
     * Component will mount
     */
    componentWillMount() {

        const props = this.props;
        const environmentId = props.environmentId;
        const filterName = props.filterName;
        const aggregationField = props.filterField;
        const currentQuery = props.store.getCurrentQuery();

        /**
         * Dispatch action
         */
        aggregationSetup(
            environmentId,
            currentQuery,
            filterName,
            aggregationField
        );
    }

    /**
     * Component will receive props
     *
     * @param props
     */
    componentWillReceiveProps(props) {

        this.setState(prevState => {
            return {
                aggregation: props
                    .store
                    .getCurrentResult()
                    .getAggregation(props.filterName)
           };
        });
    }

    /**
     * @param activeElement
     */
    handleChange = (activeElement) => {

        const props = this.props;

        /**
         * Dispatch action
         */
        onChangeSearchAction(
            props.environmentId,
            props.store.getCurrentQuery(),
            props.repository,
            props.filterName,
            props.filterField,
            activeElement,
            props.filterValue,
        );
    };

    /**
     * Render
     *
     * @return {any}
     */
    render(props, state) {

        const containerClassName = props.classNames.container;
        const topClassName = props.classNames.top;
        const itemClassName = props.classNames.item;
        const activeClassName = props.classNames.active;

        const topTemplate = props.template.top;
        const itemTemplate = props.template.item;

        let n = 0;
        let isActive = false;
        const aggregation = state.aggregation;
        if (aggregation != null) {
            const counters = aggregation.getCounters();
            for (let i in counters) {
                let counter = counters[i];
                if (counter.values.name == props.filterValue) {
                    n = counter.getN();
                    isActive = counter.isUsed();
                    break;
                }
            }
        }

        let label = props.label
            ? props.label
            : props.filterName;

        const that = this;
        const uid = Math.floor(Math.random() * 10000000000);
        const templateData = {
            n: n,
            isActive: isActive,
            label: label,
            uid: uid
        };

        return (
            <div className={`as-checkboxFilter ${containerClassName}`}>
                <Template
                    template={topTemplate}
                    className={`as-multipleFilter__top ${topClassName}`}
                    dictionary={this.props.dictionary}
                />

                <div
                    className={
                        `as-multipleFilter__item ` +
                        `${itemClassName} ` +
                        `${(isActive) ? activeClassName : ''}`
                    }
                    onClick={function(e) {
                        e.stopPropagation();
                        e.preventDefault();
                        that.handleChange(!isActive);
                    }}
                >
                    <Template
                        template={itemTemplate}
                        data={templateData}
                        dictionary={this.props.dictionary}
                    />
                </div>
            </div>
        )
    }
}

CheckboxFilterComponent.defaultProps = {
    filterValue: 'true',
    classNames: {
        container: '',
        top: '',
        item: '',
        active: 'as-checkboxFilter__item--active',
    },
    template: {
        top: null,
        item: defaultItemTemplate,
    },
}

export default CheckboxFilterComponent;
