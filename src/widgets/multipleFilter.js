/**
 * @jsx h
 */

import { h, render } from 'preact';
import MultipleFilterComponent from "../components/MultipleFilter/MultipleFilterComponent";

/**
 * Multiple Filter
 */
class MultipleFilter {
    constructor({
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
    }) {
        this.target = target;
        this.component = <MultipleFilterComponent
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
 * Multiple filter widget
 *
 * @param settings
 */
export const multipleFilter = settings => new MultipleFilter(settings);