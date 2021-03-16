import { h, render } from 'preact';
import RangeFilterComponent from "../components/RangeFilter/RangeFilterComponent";
import {Repository} from "apisearch";
import Widget from "./Widget";
import Store from "../Store";

/**
 * RangeFilter
 */
class RangeFilter extends Widget {

    private currentFrom: number;
    private currentTo: number;

    constructor({
        target,
        filterName,
        filterField,
        minValue,
        maxValue,
        from,
        to,
        callback,
    }) {
        super();
        this.target = target;
        this.currentFrom = from.initialValue;
        this.currentTo = to.initialValue;
        this.component = <RangeFilterComponent
            target={target}
            filterName={filterName}
            filterField={filterField}
            minValue={minValue}
            maxValue={maxValue}
            callback={callback}
            from={{
                ...RangeFilterComponent.defaultProps.from,
                ...from
            }}
            to={{
                ...RangeFilterComponent.defaultProps.to,
                ...to
            }}
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
        if (query.filters[filterName] !== undefined) {
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
        const fieldValues = object[filterName];

        if (
            fieldValues !== undefined &&
            Array.isArray(fieldValues) &&
            fieldValues.length > 0
        ) {
            query.filters[filterName] = {
                field: 'indexed_metadata.' + this.component.props.filterField,
                values: fieldValues,
                filter_type: 'range'
            };
        }
    }
}

/**
 * CheckboxFilter widget
 *
 * @param settings
 */
export default settings => new RangeFilter(settings);
