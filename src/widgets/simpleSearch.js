/**
 * @jsx h
 */

import { h, render } from 'preact';
import SimpleSearchComponent from "../components/SimpleSearch/SimpleSearchComponent";

class SimpleSearch {
    constructor({
        target,
        placeholder,
        startSearchOn,
        autofocus,
        classNames,
        template
    }) {
        this.target = target;
        this.component = <SimpleSearchComponent
            target={target}
            placeholder={placeholder}
            autofocus={autofocus}
            startSearchOn={startSearchOn}
            classNames={{
                ...SimpleSearchComponent.defaultProps.classNames,
                ...classNames
            }}
            template={{
                ...SimpleSearchComponent.defaultProps.template,
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

export const simpleSearch = settings => new SimpleSearch(settings);