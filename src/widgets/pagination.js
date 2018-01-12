/**
 * @jsx h
 */

import { h, createElement } from 'preact';
import PaginationComponent from "../components/Pagination/PaginationComponent";

export const pagination = ({
    target,
    padding,
    goFirstLast,
    classNames,
    template
}) => {
    return <PaginationComponent
        Component
        target={target}
        padding={padding}
        goFirstLast={goFirstLast}
        classNames={{
            ...PaginationComponent.defaultProps.classNames,
            ...classNames
        }}
        template={{
            ...PaginationComponent.defaultProps.template,
            ...template
        }}
    />
};