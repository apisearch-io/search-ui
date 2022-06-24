import {FILTER_MUST_ALL, FILTER_TYPE_FIELD, Repository} from "apisearch";
import {h, render} from "preact";
import {getShadowFilterValuesFromQuery, isFilterAvailable} from "../components/MultipleFilter/Helpers";
import {modifyQueryAggregationWithProperLevelValue} from "../components/MultipleFilter/MultipleFilterActions";
import MultipleFilterComponent from "../components/MultipleFilter/MultipleFilterComponent";
import Store from "../Store";
import Widget from "./Widget";

/**
 * Multiple Filter
 */
class MultipleFilter extends Widget {

    private filterField: string;
    private aggregationField: string;

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
     * @param promoted
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
        promoted,
    }) {
        super();
        this.target = target;
        this.filterField = filterField;
        this.aggregationField = aggregationField ?? filterField;
        this.component = <MultipleFilterComponent
            target={target}
            filterName={filterName}
            filterField={this.filterField}
            aggregationField={this.aggregationField}
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
            promoted={promoted}
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
            dictionary,
            environmentId,
            repository,
            store,
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
            const filter = query.filters[filterName];
            const filterValues = filter.values;
            if (filterValues.length > 0) {
                if (filter.application_type === 6) {

                    const levelsValues = getShadowFilterValuesFromQuery(query, filterName, false);
                    object[filterField] = {
                        l: levelsValues,
                        v: filter.values,
                    };

                } else {
                    object[filterField] = filterValues;
                }
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
        let fieldValues = object[filterField] ?? object[filterName];
        const rangesValues = Object.keys(this.component.props.ranges);
        const filterType = (rangesValues.length > 0) ? "range" : "field";

        if (
            aggregation !== undefined &&
            fieldValues !== undefined &&
            (
                Array.isArray(fieldValues) && (fieldValues.length > 0) ||
                (typeof fieldValues === "object") && (Object.keys(fieldValues).length > 0)
            )
        ) {
            if (query.filters === undefined) {
                query.filters = {};
            }

            const applicationType = this.component.props.applicationType;
            let fieldName = "indexed_metadata." + this.component.props.filterField;
            if (applicationType === 6) {
                const originalFieldValues = fieldValues;
                fieldValues = originalFieldValues["v"];
                const leveledValues = originalFieldValues["l"];

                for (let it = 0; it < leveledValues.length; it++) {
                    const level = it + 1;
                    const fieldNameWithoutPrefix = fieldName.substr(17);
                    const leveledFilterName = fieldNameWithoutPrefix + "_level_" + level;
                    const leveledFieldName = "indexed_metadata." + leveledFilterName;

                    query.filters[leveledFilterName] = {
                        application_type: applicationType,
                        field: leveledFieldName,
                        filter_type: FILTER_TYPE_FIELD,
                        values: [leveledValues[it]],
                    };
                }

                fieldName = fieldName + "_level_" + (leveledValues.length + 1);
            }

            query.filters[filterName] = {
                application_type: applicationType,
                field: fieldName,
                filter_type: filterType,
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

    /**
     * @param environmentId
     * @param query
     */
    public normalizeQuery(
        environmentId: string,
        query: any,
    ) {
        const filterName = this.component.props.filterName;
        if (isFilterAvailable(query, filterName, 6)) {
            modifyQueryAggregationWithProperLevelValue(
                environmentId,
                query,
                filterName,
                this.filterField,
                this.aggregationField,
            );
        }
    }
}

/**
 * Multiple filter widget
 *
 * @param settings
 */
export default (settings) => new MultipleFilter(settings);
