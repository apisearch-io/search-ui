import {Filter} from "apisearch";
import { h, Component } from 'preact';
import Template from "../Template";
import {clearFiltersAction} from "./ClearFiltersActions";
import {ClearFiltersProps} from "./ClearFiltersProps";
import {ClearFiltersState} from "./ClearFiltersState";

/**
 * Result Information Component
 */
class ClearFiltersComponent extends Component<ClearFiltersProps, ClearFiltersState> {

    /**
     * Constructor
     */
    constructor() {
        super();
        this.state = {
            appliedFilters: [],
            showClearFilters: false,
        };
    }

    /**
     * Component receive props
     *
     * @param props
     */
    public componentWillReceiveProps(props) {
        const appliedFiltersFormatted = this.getFiltersToShow();

        this.setState((prevState) => {
            return {
                appliedFilters: appliedFiltersFormatted,
                showClearFilters: appliedFiltersFormatted.length > 0,
            };
        });
    }

    /**
     * Handle click
     */
    public handleClick = () => {

        const props = this.props;
        const environmentId = props.environmentId;
        const currentQuery = props.store.getCurrentQuery();
        const repository = props.repository;

        this.setState((prevState) => {
            return {
                appliedFilters: [],
                showClearFilters: false,
            };
        });

        /**
         * Dispatch a clear filter action
         */
        clearFiltersAction(
            environmentId,
            currentQuery,
            repository,
        );
    }

    /**
     * Handle individual click
     */
    public handleIndividualClick = (filterKey, filterValue) => {

        const props = this.props;
        const environmentId = props.environmentId;
        const currentQuery = props.store.getCurrentQuery();
        const repository = props.repository;

        /**
         * Dispatch a clear filter action
         */
        clearFiltersAction(
            environmentId,
            currentQuery,
            repository,
            filterKey,
            filterValue,
        );
    }

    /**
     * @param filterToAvoid
     */
    private getFiltersToShow(filterToAvoid = null) {
        const appliedFilters = this.props.store.getCurrentQuery().getFilters();
        const appliedFiltersFormatted = [];
        for (const [key, filter] of Object.entries(appliedFilters)) {
            if (filter instanceof Filter && (key !== "_query") && (key !== filterToAvoid)) {
                appliedFiltersFormatted.push({
                    filter: key,
                    num: filter.getValues().length,
                    values: filter.getValues(),
                });
            }
        }

        return appliedFiltersFormatted;
    }

    /**
     * Render
     *
     * @return {}
     */
    public render() {

        const props = this.props;
        const containerClassName = props.classNames.container;
        const filtersListClassName = props.classNames.filtersList;
        const filterClassName = props.classNames.filter;

        const containerTemplate = props.template.container;
        const appliedFiltersFormatted = this.state.appliedFilters;
        let individualFilterClear = null;
        const isEmptyClass = (this.state.appliedFilters.length === 0) ? "empty" : "";

        if (props.showIndividualFilterValueClear) {

            const values = [];
            this.state.appliedFilters.forEach((filter) => {
                filter.values.forEach((value) => values.push({
                    filter: filter.filter,
                    value,
                }));
            });

            individualFilterClear = <ul className={`as-clearFilters__filtersList ${filtersListClassName}`}>
                {values.map((filter) => {
                    const isFilterPrice =
                        filter &&
                        typeof filter.value === "string" &&
                        filter.value.indexOf("..") >= 0;

                    let template = isFilterPrice
                        ? this.props.template.filter_price
                        : this.props.template.filter;

                    if (isFilterPrice) {
                        filter.parts = filter.value.replace(/[\[\]]/, "").split("..");
                        if ((filter.parts[0] ?? "") === "0") {
                            template = this.props.template.filter_price_only_to;
                        } else if ((filter.parts[1] ?? "") === "") {
                            template = this.props.template.filter_price_only_from;
                        }
                    }

                    filter.valueForClick = filter.value;
                    if (typeof filter.value === "boolean") {
                        filter = JSON.parse(JSON.stringify(filter));
                        filter.value = filter.filter;
                    }

                    return <li className={`as-clearFilters__filter ${filterClassName}`}
                               onClick={() => this.handleIndividualClick(filter.filter, filter.valueForClick)}>
                        <Template
                            template={template}
                            dictionary={this.props.dictionary}
                            data={filter}
                        />
                    </li>;
                })}
            </ul>;

        } else if (props.showIndividualFilterClear) {

            individualFilterClear = <ul className={`as-clearFilters__filtersList ${filtersListClassName}`}>
                {appliedFiltersFormatted.map((filter) => {
                    return <li className={`as-clearFilters__filter ${filterClassName}`}
                               onClick={() => this.handleIndividualClick(filter.filter, null)}>
                        <Template
                            template={this.props.template.filter}
                            dictionary={this.props.dictionary}
                            data={filter}
                        />
                    </li>;
                })}
            </ul>;
        }

        return (this.state.showClearFilters)
            ? ( <div className={`as-clearFilters ${containerClassName} ${isEmptyClass}`}>
                    {props.showGlobalFilterClear
                        ? <div onClick={this.handleClick}>
                            <Template
                                template={containerTemplate}
                                dictionary={this.props.dictionary}
                            />
                        </div>
                        : ""
                    }
                    {individualFilterClear}
                </div>
            ) : null;
    }
}

ClearFiltersComponent.defaultProps = {
    classNames: {
        container: "",
        filter: "",
        filtersList: "",
    },
    showGlobalFilterClear: true,
    showIndividualFilterClear: false,
    showIndividualFilterValueClear: false,
    template: {
        container: "Clear filters",
        filter: "Clear {{filter}} ({{num}})",
    },
};

export default ClearFiltersComponent;
