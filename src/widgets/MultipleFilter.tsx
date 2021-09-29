import {Repository} from "apisearch";
import {h, render} from 'preact';
import MultipleFilterComponent from "../components/MultipleFilter/MultipleFilterComponent";
import Store from "../Store";
import Widget from "./Widget";

/**
 * Multiple Filter
 */
class MultipleFilter extends Widget {

    /**
     * Filtername
     *
     * @param target
     * @param filterName
     * @param filterField
     * @param aggregationField
     * @param applicationType
     * @param fetchLimit
     * @param viewLimit
     * @param sortBy
     * @param ranges
     * @param labels
     * @param classNames
     * @param template
     * @param formatData
     * @param activeFirst
     */
    constructor({
        target,
        filterName,
        filterField,
        aggregationField,
        applicationType,
        fetchLimit,
        viewLimit,
        sortBy,
        ranges,
        labels,
        classNames,
        template,
        formatData,
        activeFirst,
    }) {
        super();
        this.target = target;
        this.component = <MultipleFilterComponent
            target={target}
            filterName={filterName}
            filterField={filterField}
            aggregationField={aggregationField}
            applicationType={applicationType}
            fetchLimit={fetchLimit}
            viewLimit={viewLimit}
            sortBy={sortBy}
            ranges={ranges}
            labels={labels}
            classNames={{
                ...MultipleFilterComponent.defaultProps.classNames,
                ...classNames,
            }}
            template={{
                ...MultipleFilterComponent.defaultProps.template,
                ...template,
            }}
            formatData={formatData}
            activeFirst={activeFirst}
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
        dictionary: { [key: string]: string; }
    ) {
        this.component.props = {
            ...this.component.props,
            environmentId: environmentId,
            repository: repository,
            store: store,
            dictionary: dictionary
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
            query.filters !== undefined &&
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
        const rangesValues = Object.keys(this.component.props.ranges);
        const filterType = (rangesValues.length > 0) ? 'range' : 'field';

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
                filter_type: filterType
            };
        }
    }

    /**
     * @param query
     */
    public reset(query: any) {
        const filterName = this.component.props.filterName;
        if (query.filters[filterName] !== undefined) {
            delete query.filters[filterName];
        }
    }
}

/**
 * Multiple filter widget
 *
 * @param settings
 */
export default settings => new MultipleFilter(settings);
