import { h, Component } from "preact";
import Template from "../Template";
import {
    defaultPriorityFilterItemTemplate,
    defaultPriorityFilterTopTemplate,
} from "./defaultTemplates";
import {priorityFilterAction, setupPriorityFilters} from "./PriorityFilterActions";

import {PriorityFilterProps} from "./PriorityFilterProps";
import {PriorityFilterState} from "./PriorityFilterState";

/**
 * PriorityFilterComponent
 */
class PriorityFilterComponent extends Component<PriorityFilterProps, PriorityFilterState> {

    /**
     * Constructor
     */
    constructor() {
        super();
        this.state = {
            filterName: "",
        };
    }

    /**
     * Components will mount
     */
    public componentWillMount() {

        const props = this.props;
        /**
         * Dispatch action
         */
        setupPriorityFilters(
            props.environmentId,
            props.store.getCurrentQuery(),
            props.filters,
        );
    }

    /**
     * Component will receive props
     *
     * @param props
     */
    public componentWillReceiveProps(props) {
        this.setState((_) => {
            return {
                filterName: props.store.getCurrentResult().getMetadataValue("priority_filter"),
            };
        });
    }

    public handleClick = (filterValue) => {
        const props = this.props;
        const environmentId = props.environmentId;
        const repository = props.repository;
        const currentQuery = props.store.getCurrentQuery();
        const priorityFilter = this.props.store.getCurrentResult().getMetadataValue("priority_filter");
        const priorityFilterName = priorityFilter.name;
        const priorityFilterObject = props.store.getCurrentQuery().getAggregation(priorityFilterName);

        priorityFilterAction(
            environmentId,
            currentQuery,
            repository,
            priorityFilterName,
            priorityFilterObject.getField().replace("indexed_metadata.", ""),
            filterValue,
            priorityFilterObject.getApplicationType(),
        );
    }

    /**
     * Render
     *
     * @return {any}
     */
    public render() {
        const priorityFilter = this.props.store.getCurrentResult().getMetadataValue("priority_filter");
        if (!priorityFilter) {
            return null;
        }

        const priorityFilterName = priorityFilter.name;
        const that = this;

        return (
            <div className={`as-priorityFilter`}>
                <Template
                    template={this.props.template.top}
                    className={`as-priorityFilter__top`}
                    dictionary={this.props.dictionary}
                    data={{
                        name: priorityFilterName,
                    }}
                />

                <div className={`as-priorityFilter__itemsList`}>
                    <ul>
                        {Object.keys(priorityFilter.values).map((key) => {
                            const data = priorityFilter.values[key];
                            return (
                                <li
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        that.handleClick(key);
                                    }}
                                >
                                    <Template
                                        template={this.props.template.item}
                                        data={{...data, ...{value: key}}}
                                        dictionary={this.props.dictionary}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

PriorityFilterComponent.defaultProps = {
    aggregationField: null,
    template: {
        item: defaultPriorityFilterItemTemplate,
        top: defaultPriorityFilterTopTemplate,
    },
};

export default PriorityFilterComponent;
