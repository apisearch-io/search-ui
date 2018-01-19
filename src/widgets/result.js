/**
 * @jsx h
 */

import { h, render } from 'preact';
import ResultComponent from "../components/Result/ResultComponent";

class Result {
    constructor({
        target,
        itemsPerPage,
        promote,
        exclude,
        highlightsEnabled,
        classNames,
        template,
        formatData
    }) {
        this.target = target;
        this.component = <ResultComponent
            target={target}
            itemsPerPage={itemsPerPage}
            promote={promote}
            exclude={exclude}
            highlightsEnabled={highlightsEnabled}
            classNames={{
                ...ResultComponent.defaultProps.classNames,
                ...classNames
            }}
            template={{
                ...ResultComponent.defaultProps.template,
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

export const result = settings => new Result(settings);