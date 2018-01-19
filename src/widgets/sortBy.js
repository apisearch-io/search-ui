/**
 * @jsx h
 */

import { h, render } from 'preact';
import SortByComponent from "../components/SortBy/SortByComponent";

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

export const sortBy = settings => new SortBy(settings);