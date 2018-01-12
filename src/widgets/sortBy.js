/**
 * @jsx h
 */

import { h, createElement } from 'preact';
import SortByComponent from "../components/SortBy/SortByComponent";

/**
 * Sort By
 *
 * @param target
 * @param classNames
 * @param options
 * @returns {XML}
 */
export const sortBy = ({
    target,
    classNames,
    options
}) => {
    return <SortByComponent
        target={target}
        classNames={{
            ...SortByComponent.defaultProps.classNames,
            ...classNames
        }}
        options={options}
    />
};