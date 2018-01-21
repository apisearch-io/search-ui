/**
 * @jsx h
 */

import { h, render } from 'preact';
import SortByComponent from "../components/SortBy/SortByComponent";

/**
 * SortBy
 */
class SortBy {
    constructor({
        target,
        classNames,
        options
    }) {
        this.target = target;
        this.component = <SortByComponent
            target={target}
            classNames={{
                ...SortByComponent.defaultProps.classNames,
                ...classNames
            }}
            options={options}
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
 * SortBy widget
 *
 * @param settings
 */
export const sortBy = settings => new SortBy(settings);