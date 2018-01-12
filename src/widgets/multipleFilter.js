/**
 * @jsx h
 */

import { h, createElement } from 'preact';
import MultipleFilterComponent from "../components/MultipleFilter/MultipleFilterComponent";

/**
 * Multiple filter
 *
 * @param target
 * @param name
 * @param filterField
 * @param aggregationField
 * @param applicationType
 * @param fetchLimit
 * @param viewLimit
 * @param sortBy
 * @param classNames
 * @param template
 * @param formatData
 * @returns {XML}
 */
export const multipleFilter = ({
    target,
    name,
    filterField,
    aggregationField,
    applicationType,
    fetchLimit,
    viewLimit,
    sortBy,
    classNames,
    template,
    formatData
}) => {
    return <MultipleFilterComponent
        target={target}
        name={name}
        filterField={filterField}
        aggregationField={aggregationField}
        applicationType={applicationType}
        fetchLimit={fetchLimit}
        viewLimit={viewLimit}
        sortBy={sortBy}
        classNames={{
            ...MultipleFilterComponent.defaultProps.classNames,
            ...classNames
        }}
        template={{
            ...MultipleFilterComponent.defaultProps.template,
            ...template
        }}
        formatData={formatData}
    />
}