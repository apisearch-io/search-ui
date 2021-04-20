import { h, Component } from 'preact';
import { useRef, useEffect } from 'preact/compat';
import {RangeFilterProps} from './RangeFilterProps';
import {RangeFilterState} from './RangeFilterState';
import {
    addMinMaxAggregation, deleteMinMaxAggregation,
    onChangeSearchAction
} from "./RangeFilterActions";
import Template from "../Template";

/**
 * Range Filter Component
 */
class RangeFilterComponent extends Component<RangeFilterProps, RangeFilterState> {

    private minValue;
    private maxValue;
    private minMaxAssigned = false;
    private observerFrom;
    private observerTo;
    private uid = Math.random().toString(16).substr(2, 12);
    private rangeUid;

    constructor() {
        super();
        this.observerFrom = this.configureFromObserver();
        this.observerTo = this.configureToObserver();
        this.rangeUid = 'range-' + this.uid;
        this.setState(prevState => {
            return {
                valueFrom: undefined,
                valueTo: undefined,
                visible: false
            }
        });
    }

    /**
     *
     */
    shouldCheckMinMax() {
        return (
            this.props.minValue === undefined ||
            this.props.maxValue === undefined
        );
    }

    /**
     * Components will mount
     */
    componentWillMount() {

        const props = this.props;

        /**
         * Check min and max ONLY when both are defined
         */
        if (this.shouldCheckMinMax()) {
            addMinMaxAggregation(
                props.environmentId,
                props.store.getCurrentQuery(),
                props.filterName,
                props.filterField
            );
        }
    }

    configureFromObserver() {
        const that = this;

        return new MutationObserver(function(mutationsList, observer) {
            // Use traditional 'for loops' for IE 11
            for(const mutation of mutationsList) {
                if (mutation.attributeName === 'value') {
                    const value = parseInt(mutation.target["defaultValue"]);
                    if (value == that.state.valueFrom) {
                        return;
                    }
                    that.handleSliderChange([value, that.state.valueTo]);
                }
            }
        });
    }

    configureToObserver() {
        const that = this;

        return new MutationObserver(function(mutationsList, observer) {
            // Use traditional 'for loops' for IE 11
            for(const mutation of mutationsList) {
                if (mutation.attributeName === 'value') {
                    const value = parseInt(mutation.target["defaultValue"]);
                    if (value == that.state.valueTo) {
                        return;
                    }
                    that.handleSliderChange([that.state.valueFrom, value]);
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
     * Handle change
     *
     * @param e
     */
    handleChange(e) {
        const uid = this.uid;
        this.applyFilter(
            e.target.parentNode.getElementsByClassName('as-rangeFilter__from__' + uid)[0].value,
            e.target.parentNode.getElementsByClassName('as-rangeFilter__to__' + uid)[0].value
        );
    };

    handleSliderChange(values) {

        if (
            values[0] === this.state.valueFrom &&
            values[1] === this.state.valueTo
        ) {
            return false;
        }

        this.setState(prevState => {
            return {
                valueFrom: values[0],
                valueTo: values[1],
                visible: true
            };
        });

        this.applyFilter(values[0], values[1]);
    };

    /**
     * @param props
     */
    componentWillReceiveProps(props) {

        const filterName = props.filterName;
        const filter = props.store.getCurrentQuery().getFilter(filterName);
        const filterIsFound = filter !== null;

        if (filterIsFound) {
            const values = filter.getValues();
            if (values.length > 0) {
                const parts = values[0].split('..');
                this.setState(prevState => {
                    return {
                        valueFrom: parseInt(parts[0]),
                        valueTo: parseInt(parts[1]),
                        visible: true
                    }
                });
            }
        } else {
            this.setState(prevState => {
                return {
                    visible: true
                }
            });
        }
    }

    /**
     * @param props
     * @param state
     */
    render(props, state) {

        const filterName = props.filterName;
        const ref = useRef(null);
        const topTemplate = props.template.top;
        const sliderTemplate = props.template.slider;
        const containerClassName = props.classNames.container;
        const topClassName = props.classNames.top;
        const that = this;

        useEffect(() => {
            const self = this;
            if (!ref.current) { return; }
            const uid = this.uid;

            /**
             * Alert if clicked on outside of element
             */
            function handleChange(event) {
                const target = event.target;
                const parentNode = target.parentNode;
                self.applyFilter(
                    parentNode.getElementsByClassName('as-rangeFilter__from__' + uid)[0].value,
                    parentNode.getElementsByClassName('as-rangeFilter__to__' + uid)[0].value
                );
            }

            // Bind the event listener
            ref.current.addEventListener("change", handleChange);
            return () => {
                // Unbind the event listener on clean up
                ref.current.removeEventListener("change", handleChange);
            };

        }, [ref]);

        const aggregations = this.props.store.getCurrentResult().getAggregations();

        if (props.store.hasProperResult() && this.minMaxAssigned === false) {
            if (this.shouldCheckMinMax()) {
                let currentAggregation = aggregations.getAggregation(filterName);
                if (currentAggregation !== null) {
                    const currentAggregationMetadata = currentAggregation.getMetadata();
                    const currentAggregationMetadataMin = currentAggregationMetadata['min']
                        ? Math.floor(currentAggregationMetadata)
                        : undefined;

                    const currentAggregationMetadataMax = currentAggregationMetadata['max']
                        ? Math.ceil(currentAggregationMetadata['max'])
                        : undefined;

                    this.minValue = props.minValue ?? currentAggregationMetadataMin;
                    this.maxValue = props.maxValue ?? currentAggregationMetadataMax;
                    this.minMaxAssigned = true;
                    this.setState(prevState => {
                        return {
                            valueFrom: this.state.valueFrom ?? this.minValue,
                            valueTo: this.state.valueTo ?? this.maxValue,
                            visible: true
                        }
                    });

                    if (typeof props.minMaxCallback == 'function') {
                        props.minMaxCallback(this.minValue, this.maxValue, props.step, this.rangeUid);
                    }

                    /**
                     * Dispatch action
                     */
                    deleteMinMaxAggregation(
                        props.environmentId,
                        props.store.getCurrentQuery(),
                        filterName
                    );
                }
            } else {
                this.minMaxAssigned = true;
                this.setState(prevState => {
                    return {
                        valueFrom: this.state.valueFrom ?? props.minValue,
                        valueTo: this.state.valueTo ?? props.maxValue,
                        visible: true
                    }
                });

                if (typeof props.minMaxCallback == 'function') {
                    props.minMaxCallback(props.minValue, props.maxValue, props.step, this.rangeUid);
                }
            }
        }

        const minValue = this.minValue ?? props.minValue;
        const maxValue = this.maxValue ?? props.maxValue;
        const isNative = props.native;
        const isNotNative = !isNative;
        const type = isNative ? 'range' : 'number';
        const eventName = 'onClick';

        if (
            this.minMaxAssigned &&
            typeof props.callback == 'function' &&
            this.state.valueFrom !== undefined &&
            this.state.valueTo !== undefined
        ) {
            props.callback(
                Math.min(state.valueFrom, state.valueTo),
                Math.max(state.valueFrom, state.valueTo),
                this.rangeUid
            );
        }

        return (
            <div id={this.rangeUid} className={`as-rangeFilter ${containerClassName}`}>
                <Template
                    template={topTemplate}
                    className={`as-rangeFilter__top ${topClassName}`}
                    dictionary={this.props.dictionary}
                />

                <div class="slider">
                    <Template
                        template={sliderTemplate}
                        dictionary={this.props.dictionary}
                    />
                </div>

                <input
                    type={type}
                    class={`as-rangeFilter__from ${props.classNames.input} as-rangeFilter__${this.uid} as-rangeFilter__from__${this.uid}`}
                    {...props.attributes.from}
                    value={this.state.valueFrom}
                    min={minValue}
                    max={maxValue}
                    step={props.step}
                    onClick={function(e) {
                        if (isNotNative) return false;
                        that.handleSliderChange([parseInt((e.target as HTMLInputElement).value), that.state.valueTo])
                    }}
                    onChange={function(e) {
                        if (isNative) return false;
                        that.handleSliderChange([parseInt((e.target as HTMLInputElement).value), that.state.valueTo])
                    }}
                    autocomplete={`off`}
                />
                <input
                    type={type}
                    class={`as-rangeFilter__to ${props.classNames.input} as-rangeFilter__${this.uid} as-rangeFilter__to__${this.uid}`}
                    {...props.attributes.to}
                    value={this.state.valueTo}
                    min={minValue}
                    max={maxValue}
                    step={props.step}
                    onClick={function(e) {
                        if (isNotNative) return false;
                        that.handleSliderChange([that.state.valueFrom, parseInt((e.target as HTMLInputElement).value)])
                    }}
                    onChange={function(e) {
                        if (isNative) return false;
                        that.handleSliderChange([that.state.valueFrom, parseInt((e.target as HTMLInputElement).value)])
                    }}
                    autocomplete={`off`}
                />
            </div>
        );
    }

    /**
     * Apply filter
     */
    private applyFilter(valueFrom, valueTo) {
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
            valueFrom,
            valueTo,
            this.minMaxAssigned
        );
    }
}

RangeFilterComponent.defaultProps = {
    maxValueIncluded: true,
    step: 1,
    native: false,
    classNames: {
        container: '',
        top: '',
        input: '',
        from: '',
        to: ''
    },
    attributes: {
        from: '',
        to: ''
    },
    template: {
        top: '',
        slider: ''
    },
};

export default RangeFilterComponent;
