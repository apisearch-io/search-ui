import { h, render, Component } from 'preact';
import { useRef, useState, useEffect } from 'preact/compat';
import ResizeObserver from 'resize-observer-polyfill';
import {RangeFilterProps} from './RangeFilterProps';
import {RangeFilterState} from './RangeFilterState';
import Template from "../Template";
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
    private values;

    constructor() {
        super();
        this.uid = Math.random().toString(16).substr(2, 12);
        this.observerFrom = this.configureObserver('from');
        this.observerTo = this.configureObserver('to');
    }

    configureObserver(field) {
        const that = this;

        return new MutationObserver(function(mutationsList, observer) {
            // Use traditional 'for loops' for IE 11
            for(const mutation of mutationsList) {
                if (mutation.attributeName === 'value') {
                console.log(mutation);
                    const value = mutation.target["defaultValue"];
                    console.log(field);
                    console.log(value);
                    console.log(that.state);

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
                return {
                    valueFrom: props.minValue,
                    valueTo: props.maxValue
                };
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
        const initialFrom = Math.max(from.initialValue, minValue);
        const initialTo = Math.min(to.initialValue, maxValue);

        const currentFromValue = this.state.valueFrom
            ? this.state.valueFrom
            : initialFrom;
        const currentToValue = this.state.valueTo
            ? this.state.valueTo
            : initialTo;

        const ref = useRef(null);

        useEffect(() => {
            const self = this;
            if (!ref.current) { return; }

            /**
             * Alert if clicked on outside of element
             */
            function handleChange(event) {
                const target = event.target;
                const parentNode = target.parentNode;
                console.log(parentNode.getElementsByClassName('as-rangeFilter__from')[0].value);
                console.log(parentNode.getElementsByClassName('as-rangeFilter__to')[0].value);
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
            <div className={`as-rangeFilter`}>
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
