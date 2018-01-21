/**
 * @jsx h
 */

import { h, render } from 'preact';
import SuggestedSearchComponent from "../components/SuggestedSearch/SuggestedSearchComponent";

/**
 * Suggested Search
 */
class SuggestedSearch {
    constructor({
        target,
        placeholder,
        autofocus,
        startSearchOn,
        clearSearch,
        classNames,
        template
    }) {
        this.target = target;
        this.component = <SuggestedSearchComponent
            target={target}
            placeholder={placeholder}
            autofocus={autofocus}
            startSearchOn={startSearchOn}
            clearSearch={clearSearch}
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
 * Suggested search widget
 *
 * @param settings
 */
export const suggestedSearch = settings => new SuggestedSearch(settings);