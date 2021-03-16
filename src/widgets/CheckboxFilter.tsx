import { h, render } from 'preact';
import CheckboxFilterComponent from "../components/CheckboxFilter/CheckboxFilterComponent";
import {Repository} from "apisearch";
import Widget from "./Widget";
import Store from "../Store";

/**
 * CheckboxFilter
 */
class CheckboxFilter extends Widget {

    constructor({
        target,
        filterName,
        filterField,
        label
    }) {
        super();
        this.target = target;
        this.component = <CheckboxFilterComponent
            target={target}
            filterName={filterName}
            filterField={filterField}
            label={label}
        />
    }

    /**
     * @param environmentId
     * @param store
     * @param repository
     * @param dictionary
     */
    public render(
        environmentId: string,
        store: Store,
        repository: Repository,
        dictionary: { [key: string]: string; }
    ) {
        this.component.props = {
            ...this.component.props,
            environmentId: environmentId,
            repository: repository,
            store: store,
        };

        let targetNode = document.querySelector(this.target);

        render(
            this.component,
            targetNode
        )
    }

    /**
     * @param query
     * @param object
     */
    public toUrlObject(
        query: any,
        object: any
    )
    {
        const filterName = this.component.props.filterName;
        const aggregation = query.aggregations[filterName];
        if (
            aggregation !== undefined &&
            query.filters[filterName] !== undefined
        ) {
            const filterValues = query.filters[filterName].values;
            if (filterValues.length > 0) {
                object[filterName] = filterValues;
            }
        }
    }

    /**
     * @param object
     * @param query
     */
    public fromUrlObject(
        object: any,
        query: any
    )
    {
        const filterName = this.component.props.filterName;
        const aggregation = query.aggregations[filterName];
        const fieldValues = object[filterName];

        if (
            aggregation !== undefined &&
            fieldValues !== undefined &&
            Array.isArray(fieldValues) &&
            fieldValues.length > 0
        ) {
            query.filters[filterName] = {
                field: 'indexed_metadata.' + this.component.props.filterField,
                values: fieldValues,
                application_type: this.component.props.application_type,
                filter_type: this.component.props.filterType
            };
        }
    }
}

/**
 * CheckboxFilter widget
 *
 * @param settings
 */
export default (settings) => new CheckboxFilter(settings);
