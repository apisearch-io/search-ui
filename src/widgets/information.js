/**
 * @jsx h
 */

import { h, render } from 'preact';
import InformationComponent from "../components/Information/InformationComponent";

/**
 * Information
 */
class Information {
    constructor({
        target,
        classNames,
        template,
        formatData
    }) {
        this.target = target;
        this.component = <InformationComponent
            target={target}
            classNames={{
                ...InformationComponent.defaultProps.classNames,
                ...classNames
            }}
            template={template}
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
 * Information widget
 *
 * @param settings
 */
export const information = settings => new Information(settings);