import { h, Component } from 'preact';
import { useRef, useEffect } from 'preact/compat';
import {RangeFilterProps} from './RangeFilterProps';
import {RangeFilterState} from './RangeFilterState';
import {
    onChangeSearchAction
} from "./RangeFilterActions";

/**
 * Range Filter Component
 */
class RangeFilterComponent extends Component<RangeFilterProps, RangeFilterState> {

    private observerFrom;
    private observerTo;
    private uid;

    constructor() {
        super();
        this.uid = Math.random().toString(16).substr(2, 12);
        this.observerFrom = this.configureObserver('from');
        this.observerTo = this.configureObserver('to');

        this.state = {
            valueFrom: 0,
            valueTo: 0,
            visible: false
        }
    }

    configureObserver(field) {
        const that = this;

        return new MutationObserver(function(mutationsList, observer) {
            // Use traditional 'for loops' for IE 11
            for(const mutation of mutationsList) {
                if (mutation.attributeName === 'value') {
                    const value = mutation.target["defaultValue"];

                    if (
                        (
                            field === 'from' &&
                            value === that.state.valueFrom
                        ) ||
                        (
                            field === 'to' &&
                            value === that.state.valueTo
                        )
                    ) {
                        return;
                    }


                    field == 'from'
                        ? that.handleSliderChange([value, that.state.valueTo])
                        : that.handleSliderChange([that.state.valueFrom, value]);
                }
            }
        });
    }

    componentDidMount() {
        this.observerFrom.observe(
            document.getElementsByClassName('as-rangeFilter__from__' + this.uid)[0],
            { attributes: true }
        );

        this.observerTo.observe(
            document.getElementsByClassName('as-rangeFilter__to__' + this.uid)[0],
            { attributes: true }
        );
    }

    componentWillUnmount() {
        this.observerFrom.disconnect();
        this.observerTo.disconnect();
    }

    /**
     * Component will receive props
     *
     * @param props
     */
    componentWillReceiveProps(props) {

        const filterName = props.filterName;
        const filterIsNotFound = props.currentQuery.getFilter(filterName) == null;

        if (filterIsNotFound) {
            this.setState(prevState => {
                return (props.currentResult == null)
                    ? {
                        valueFrom: 0,
                        valueTo: 0,
                        visible: false
                    }
                    : {
                        valueFrom: props.minValue,
                        valueTo: props.maxValue,
                        visible: true
                    }
            });
        }
    }

    /**
     * Handle change
     *
     * @param e
     */
    handleChange(e) {
        this.applyFilter(
            e.target.parentNode.getElementsByClassName('as-rangeFilter__from')[0].value,
            e.target.parentNode.getElementsByClassName('as-rangeFilter__to')[0].value
        );
    };

    handleSliderChange(values) {
        this.setState(prevState => {
            return {
                valueFrom: values[0],
                valueTo: values[1]
            };
        });

        this.applyFilter(values[0], values[1]);
    };

    /**
     * Apply filter
     */
    private applyFilter(valueFrom, valueTo) {
        const props = this.props;
        const environmentId = props.environmentId;
        const currentQuery = props.currentQuery;
        const repository = props.repository;
        const filterName = props.filterName;
        const filterField = props.filterField;
        const minValue = props.minValue;
        const maxValue = props.maxValue;

        /**
         * Dispatch action
         */
        onChangeSearchAction(
            environmentId,
            currentQuery,
            repository,
            filterName,
            filterField,
            minValue,
            maxValue,
            valueFrom,
            valueTo
        );
    }

    /**
     * Render
     *
     * @return {any}
     */
    render(props, state) {

        const filterName = props.filterName;
        const from = props.from;
        const to = props.to;
        const minValue = props.minValue;
        const maxValue = props.maxValue;
        const ref = useRef(null);
        const visible = state.visible ? 'block' : 'none';

        useEffect(() => {
            const self = this;
            if (!ref.current) { return; }

            /**
             * Alert if clicked on outside of element
             */
            function handleChange(event) {
                const target = event.target;
                const parentNode = target.parentNode;
                self.applyFilter(
                    parentNode.getElementsByClassName('as-rangeFilter__from')[0].value,
                    parentNode.getElementsByClassName('as-rangeFilter__to')[0].value
                );
            }

            // Bind the event listener
            ref.current.addEventListener("change", handleChange);
            return () => {
                // Unbind the event listener on clean up
                ref.current.removeEventListener("change", handleChange);
            };

        }, [ref]);

        return (
            <div className={`as-rangeFilter`} style={`display: ${visible}`}>
                <label
                    class="as-rangeFilter__label"
                >
                    {filterName}
                </label>
                <input
                    type="number"
                    class={`as-rangeFilter__from ${from.class} as-rangeFilter__from__${this.uid}`}
                    {...from.attributes}
                    value={this.state.valueFrom}
                    min={minValue}
                    max={maxValue}
                    ref={ref}
                    autocomplete={`off`}
                />
                <input
                    type="number"
                    class={`as-rangeFilter__to ${to.class} as-rangeFilter__to__${this.uid}`}
                    {...to.attributes}
                    value={this.state.valueTo}
                    min={minValue}
                    max={maxValue}
                    autocomplete={`off`}
                />
            </div>
        );
    }
}

RangeFilterComponent.defaultProps = {
    minValue: 0,
    maxValue: 100,
    from: {
        class: "",
        attributes: {},
        initialValue: 0
    },
    to: {
        class: "",
        attributes: {},
        initialValue: 100
    }
};

export default RangeFilterComponent;
