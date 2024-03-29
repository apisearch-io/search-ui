import {Query, Repository} from "apisearch";
import {h, render} from 'preact';
import CheckboxFilterComponent from "../components/CheckboxFilter/CheckboxFilterComponent";
import Store from "../Store";
import Widget from "./Widget";

/**
 * CheckboxFilter
 */
class CheckboxFilter extends Widget {

    constructor({
        target,
        filterName,
        filterField,
        label,
        filterValue,
        classNames,
        template,
    }) {
        super();
        this.target = target;
        this.component = <CheckboxFilterComponent
            target={target}
            filterName={filterName}
            filterField={filterField}
            label={label}
            filterValue={filterValue}
            classNames={{
                ...CheckboxFilterComponent.defaultProps.classNames,
                ...classNames,
            }}
            template={{
                ...CheckboxFilterComponent.defaultProps.template,
                ...template,
            }}
        />;
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
        dictionary: { [key: string]: string; },
    ) {
        this.component.props = {
            ...this.component.props,
            environmentId,
            repository,
            store,
            dictionary,
        };

        render(
            this.component,
            document.querySelector(this.target),
        );
    }

    /**
     * @param query
     * @param object
     */
    public toUrlObject(
        query: any,
        object: any,
    ) {
        const filterName = this.component.props.filterName;
        const aggregation = query.aggregations[filterName];
        const filterField = this.component.props.filterField;
        if (
            aggregation !== undefined &&
            query.filters !== undefined &&
            query.filters[filterName] !== undefined
        ) {
            const filterValues = query.filters[filterName].values;
            if (filterValues.length > 0) {
                object[filterField] = filterValues;
            }
        }
    }

    /**
     * @param object
     * @param query
     */
    public fromUrlObject(
        object: any,
        query: any,
    ) {
        const filterName = this.component.props.filterName;
        const aggregation = query.aggregations[filterName];
        const filterField = this.component.props.filterField;
        const fieldValues = object[filterField] ?? object[filterName];

        if (
            aggregation !== undefined &&
            fieldValues !== undefined &&
            Array.isArray(fieldValues) &&
            fieldValues.length > 0
        ) {
            if (query.filters === undefined) {
                query.filters = {};
            }

            query.filters[filterName] = {
                field: "indexed_metadata." + this.component.props.filterField,
                values: fieldValues,
            };
        }
    }

    /**
     * @param query
     */
    public reset(query: any) {
        const filterName = this.component.props.filterName;
        if (
            query.filters !== undefined &&
            typeof query.filters === "object" &&
            query.filters[filterName] !== undefined
        ) {
            delete query.filters[filterName];
        }
    }
}

/**
 * CheckboxFilter widget
 *
 * @param settings
 */
export default (settings) => new CheckboxFilter(settings);
