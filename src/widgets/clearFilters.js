/**
 * @jsx h
 */

import { h, render } from 'preact';
import ClearFiltersComponent from "../components/ClearFilters/ClearFiltersComponent";

/**
 * Clear Filters
 */
class ClearFilters {
    constructor({
        target,
        classNames,
        template
    }) {
        this.target = target;
        this.component = <ClearFiltersComponent
            target={target}
            classNames={{
                ...ClearFiltersComponent.defaultProps.classNames,
                ...classNames
            }}
            template={template}
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
 * Clear filters widget
 *
 * @param settings
 */
export const clearFilters = settings => new ClearFilters(settings);