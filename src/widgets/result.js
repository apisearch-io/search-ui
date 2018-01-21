/**
 * @jsx h
 */

import { h, render } from 'preact';
import ResultComponent from "../components/Result/ResultComponent";

/**
 * Result
 */
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
 * Result widget
 *
 * @param settings
 */
export const result = settings => new Result(settings);