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
    public handleIndividualClick = (filterKey) => {

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
        const filterTemplate = props.template.filter;
        const appliedFiltersFormatted = this.state.appliedFilters;
        const individualFilterClear = props.showIndividualFilterClear
            ? <ul className={`as-clearFilters__filtersList ${filtersListClassName}`}>
                {appliedFiltersFormatted.map((filter) => {
                    return <li className={`as-clearFilters__filter ${filterClassName}`} onClick={() => this.handleIndividualClick(filter.filter)}>
                        <Template
                            template={filterTemplate}
                            dictionary={this.props.dictionary}
                            data={filter}
                        />
                    </li>;
                })}
            </ul>
            : "";

        return (this.state.showClearFilters)
            ? ( <div className={`as-clearFilters ${containerClassName}`}>
                    <div onClick={this.handleClick}>
                        <Template
                            template={containerTemplate}
                            dictionary={this.props.dictionary}
                        />
                    </div>
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
    showIndividualFilterClear: false,
    template: {
        container: "Clear filters",
        filter: "Clear {{filter}} ({{num}})",
    },
};

export default ClearFiltersComponent;
