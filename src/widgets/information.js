/**
 * @jsx h
 */

import { h, render } from 'preact';
import InformationComponent from "../components/Information/InformationComponent";

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

export const information = settings => new Information(settings);