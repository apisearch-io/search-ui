import {Filter, ResultAggregation} from "apisearch";
import {Component, h} from 'preact';
import {useEffect, useRef} from 'preact/compat';
import Template from "../Template";
import {RangeFilterProps} from './RangeFilterProps';
import {RangeFilterState} from './RangeFilterState';
import {aggregationSetup, filterAction} from './RangeFilterActions';

/**
 * Range Filter Component
 */
class RangeFilterComponent extends Component<RangeFilterProps, RangeFilterState> {

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
                from: null,
                to: null,
                min: null,
                max: null,
                visible: true,
            }
        });
    }

    /**
     * Components will mount
     */
    componentWillMount() {

        const props = this.props;
        const environmentId = props.environmentId;
        const filterName = props.filterName;
        const filterField = props.filterField;
        const currentQuery = props.store.getCurrentQuery();

        aggregationSetup(
            environmentId,
            currentQuery,
            filterName,
            filterField,
            props.minValue,
            props.maxValue
        );
    }

    configureFromObserver() {
        const that = this;

        return new MutationObserver(function(mutationsList, observer) {
            // Use traditional 'for loops' for IE 11
            for(const mutation of mutationsList) {
                if (mutation.attributeName === 'value') {
                    const value = parseInt(mutation.target["defaultValue"]);
                    if (value == that.state.from) {
                        return;
                    }
                    that.handleSliderChange([value, that.state.to]);
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
                    if (value == that.state.to) {
                        return;
                    }
                    that.handleSliderChange([that.state.from, value]);
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
            values[0] === this.state.from &&
            values[1] === this.state.to
        ) {
            return false;
        }

        this.applyFilter(values[0], values[1]);
    };

    /**
     * @param values
     */
    handleSliderMove(values) {

        this.updateRangeLayer(this.props, this.state, values[0], values[1]);
    };

    /**
     * Component will receive props
     *
     * @param props
     */
    componentWillReceiveProps(props) {
        const currentResult = props
            .store
            .getCurrentResult();
        const aggregation = currentResult.getAggregation(props.filterName);

        if (!(aggregation instanceof ResultAggregation)) {
            this.setState(prevState => {
                return {
                    from: prevState.from,
                    to: prevState.to,
                    min: prevState.min,
                    max: prevState.max,
                    currency_placeholder: prevState.currency_placeholder,
                    visible: false
                };
            });
            return;
        }

        const metadata = aggregation.getMetadata();
        const filter = props
            .store
            .getCurrentQuery()
            .getFilter(props.filterName);

        const min = typeof props.minValue === "number" && props.minValue > 0
            ? props.minValue
            : (typeof metadata['min'] === "number"
                ? Math.floor(metadata['min'])
                : undefined
            )


        const max = typeof props.maxValue === "number" && props.maxValue > 0
            ? props.maxValue
            : (typeof metadata['max'] === "number"
                    ? Math.ceil(metadata['max'])
                    : undefined
            )

        let currencyPlaceholder = null;
        const firstItem = currentResult.getFirstItem();
        if (firstItem) {
            const firstItemPrice = firstItem.get('price');
            const firstItemPriceWithCurrency = firstItem.get('price_with_currency');
            if (firstItemPrice && firstItemPriceWithCurrency) {
                currencyPlaceholder = this.getCurrencyPlaceholderFromPriceAndPriceWithCurrency(firstItemPrice, firstItemPriceWithCurrency);
            }
        }

        const fromTo = this.getFromToFromFilter(filter, min, max);
        this.setState(prevState => {
            return {
                from: fromTo[0],
                to: fromTo[1],
                min: min,
                max: max,
                currency_placeholder: currencyPlaceholder,
                visible: ((typeof min === "number") && (typeof max === "number"))
            };
        });
    }

    /**
     * @param filter
     * @param min
     * @param max
     */
    getFromToFromFilter(filter: Filter, min: number, max: number) {

        const realMin = Math.min(min, max);
        const realMax = Math.max(min, max);

        if (filter instanceof Filter) {
            const filterValue = filter.getValues()[0];
            if (typeof filterValue === "string") {
                const parts = filterValue.split('..');
                const from = parts[0];
                const to = parts[1].slice(0, -1);

                return [
                    Math.max(realMin, parseInt(from)),
                    Math.min(realMax, parseInt(to)),
                ];
            }
        }

        return [realMin, realMax];
    }

    /**
     * @param previousProps
     * @param previousState
     */
    componentDidUpdate(previousProps: Readonly<RangeFilterProps>, previousState: Readonly<RangeFilterState>)
    {
        this.updateRangeLayer(previousProps, previousState, previousState.from, previousState.to);
    }

    /**
     * @param props
     * @param state
     * @param from
     * @param to
     */
    updateRangeLayer(props: Readonly<RangeFilterProps>, state: Readonly<RangeFilterState>, from, to)
    {
        const min = state.min;
        const max = state.max;

        if (
            typeof from === "number" &&
            typeof to === "number" &&
            typeof props.callback === "function"
        ) {
            props.callback(
                Math.min(from, to),
                Math.max(from, to),
                min,
                max,
                this.rangeUid,
                state.currency_placeholder
            );
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
        const wrapperClassName = props.classNames.wrapper;
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

        const isNative = props.native;
        const isNotNative = !isNative;
        const type = isNative ? 'range' : 'number';
        const eventName = 'onClick';
        const from = state.from;
        const to = state.to;
        const min = state.min;
        const max = state.max;

        const isVisible = state.visible && !(
            props.store.currentResult.getTotalHits() === 0 &&
            from === min &&
            to === max
        );

        const visibleStyle = isVisible ? '' : 'display:none!important;';

        return (
            <div id={this.rangeUid} className={`as-rangeFilter ${containerClassName}`} style={visibleStyle}>
                <Template
                    template={topTemplate}
                    className={`as-rangeFilter__top ${topClassName}`}
                    dictionary={this.props.dictionary}
                />

                <div className={`as-rangeFilter__wrapper ${wrapperClassName}`}>
                    <input
                        type={type}
                        class={`as-rangeFilter__from ${props.classNames.input} as-rangeFilter__${this.uid} as-rangeFilter__from__${this.uid}`}
                        {...props.attributes.from}
                        value={from}
                        min={min}
                        max={max}
                        step={props.step}
                        onClick={function(e) {
                            if (isNotNative) return false;
                            that.handleSliderChange([parseInt((e.target as HTMLInputElement).value), to]);
                        }}
                        onTouchEnd={function(e) {
                            if (isNotNative) return false;
                            that.handleSliderChange([parseInt((e.target as HTMLInputElement).value), to]);
                        }}
                        onChange={function(e) {
                            const positions = [parseInt((e.target as HTMLInputElement).value), to];
                            if (isNative) {
                                that.handleSliderMove(positions);
                                return false;
                            }
                            that.handleSliderChange(positions);
                        }}
                        autocomplete={`off`}
                    />
                    <input
                        type={type}
                        class={`as-rangeFilter__to ${props.classNames.input} as-rangeFilter__${this.uid} as-rangeFilter__to__${this.uid}`}
                        {...props.attributes.to}
                        value={to}
                        min={min}
                        max={max}
                        step={props.step}
                        onClick={function(e) {
                            if (isNotNative) return false;
                            that.handleSliderChange([from, parseInt((e.target as HTMLInputElement).value)])
                        }}
                        onTouchEnd={function(e) {
                            if (isNotNative) return false;
                            that.handleSliderChange([from, parseInt((e.target as HTMLInputElement).value)])
                        }}
                        onChange={function(e) {
                            const positions = [from, parseInt((e.target as HTMLInputElement).value)];
                            if (isNative) {
                                that.handleSliderMove(positions);
                                return false;
                            }

                            that.handleSliderChange(positions)
                        }}
                        autocomplete={`off`}
                    />

                    <div class="slider">
                        <Template
                            template={sliderTemplate}
                            dictionary={this.props.dictionary}
                        />
                    </div>
                </div>
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
        filterAction(
            props.environmentId,
            props.store.getCurrentQuery(),
            props.repository,
            props.filterName,
            props.filterField,
            valueFrom,
            valueTo
        );
    }

    /**
     * @param price
     * @param priceWithCurrency
     * @private
     */
    private getCurrencyPlaceholderFromPriceAndPriceWithCurrency(
        price: number|string,
        priceWithCurrency: string
    )
    {
        price = (price + '').replace('.', '').replace(',', '');
        priceWithCurrency = (priceWithCurrency + '').replace('.', '').replace(',', '');
        const regex = new RegExp(price + '0*');
        const currencyPlaceholder = priceWithCurrency.replace(regex, "__price__");

        return currencyPlaceholder;
    }
}

RangeFilterComponent.defaultProps = {
    maxValueIncluded: true,
    step: 1,
    minValue: null,
    maxValue: null,
    native: false,
    classNames: {
        container: '',
        top: '',
        wrapper: '',
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
