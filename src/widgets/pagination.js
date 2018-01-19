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
        this.component.attributes.environmentId = environmentId;
        this.component.attributes.dirty = store.dirty;
        this.component.attributes.data = store.data;
        this.component.attributes.currentQuery = store.currentQuery;
        this.component.attributes.client = client;

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