/**
 * @jsx h
 */

import { h, render } from 'preact';
import PaginationComponent from "../components/Pagination/PaginationComponent";

/**
 * Pagination
 */
class Pagination {
    constructor({
        target,
        padding,
        goFirstLast,
        classNames,
        template
    }) {
        this.target = target;
        this.component = <PaginationComponent
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
    }

    render({
        environmentId,
        store,
        client
    }) {
        this.component.attributes = {
            ...this.component.attributes,
            environmentId,
            client,
            dirty: store.dirty,
            data: store.data,
            currentQuery: store.currentQuery,
        };

        let targetNode = document.querySelector(this.target);

        render(
            this.component,
            targetNode,
            targetNode.lastChild
        )
    }
}

/**
 * Pagination widget
 *
 * @param settings
 */
export const pagination = settings => new Pagination(settings);