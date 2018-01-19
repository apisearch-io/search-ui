/**
 * @jsx h
 */

import { h, render } from 'preact';
import SuggestedSearchComponent from "../components/SuggestedSearch/SuggestedSearchComponent";

class SuggestedSearch {
    constructor({
        target,
        placeholder,
        autofocus,
        startSearchOn,
        classNames,
        template
    }) {
        this.target = target;
        this.component = <SuggestedSearchComponent
            target={target}
            placeholder={placeholder}
            autofocus={autofocus}
            startSearchOn={startSearchOn}
            classNames={{
                ...SuggestedSearchComponent.defaultProps.classNames,
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

export const suggestedSearch = settings => new SuggestedSearch(settings);