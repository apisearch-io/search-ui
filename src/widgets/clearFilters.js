/**
 * @jsx h
 */

import { h, createElement } from 'preact';
import ClearFiltersComponent from "../components/ClearFilters/ClearFiltersComponent";

/**
 * Clear filters
 *
 * @param target
 * @param classNames
 * @param template
 * @returns {XML}
 */
export const clearFilters = ({
    target,
    classNames,
    template
}) => {
    return <ClearFiltersComponent
        target={target}
        classNames={{
            ...ClearFiltersComponent.defaultProps.classNames,
            ...classNames
        }}
        template={template}
    />
};