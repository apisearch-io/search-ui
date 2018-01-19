/**
 * @jsx h
 */

import { h, render } from 'preact';
import SimpleSearchComponent from "../components/SimpleSearch/SimpleSearchComponent";

/**
 * Simple Search
 */
class SimpleSearch {
    constructor({
        target,
        placeholder,
        startSearchOn,
        clearSearch,
        withContainer,
        autofocus,
        classNames,
        template
    }) {
        this.target = target;
        this.isFirstRender = true;
        this.component = <SimpleSearchComponent
            target={target}
            placeholder={placeholder}
            autofocus={autofocus}
            startSearchOn={startSearchOn}
            clearSearch={clearSearch}
            withContainer={withContainer}
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
        this.component.attributes = {
            ...this.component.attributes,
            environmentId,
            client,
            dirty: store.dirty,
            data: store.data,
            currentQuery: store.currentQuery
        };

        let targetNode = document.querySelector(this.target);

        /**
         * Checking if the targeted element is an input
         * or is another container element.
         */
        let isInput = isInputElement(targetNode);

        if (!isInput) {
            render(
                this.component,
                targetNode,
                targetNode.lastChild
            )
        }

        if (isInput && this.isFirstRender) {
            this.component.attributes = {
                ...this.component.attributes,
                withContainer: false,
                htmlNodeInheritProps: getNodeAttributes(targetNode)
            };
            let parentNode = targetNode.parentNode;

            render(
                this.component,
                parentNode,
                parentNode.childNodes[0]
            );

            targetNode.remove();
        }

        this.isFirstRender = false;
    }
}

/**
 * Returns an object of an
 * html node attributes.
 *
 * @param htmlNode
 * @returns {{}}
 */
const getNodeAttributes = (htmlNode) => {
    let nodeAttributes = {};
    for (let i = 0; i < htmlNode.attributes.length; i++) {
        let attr = htmlNode.attributes[i];
        if (attr.specified) {
            nodeAttributes = {
                ...nodeAttributes,
                [attr.name]: attr.value
            }
        }
    }

    return nodeAttributes;
};

/**
 * Checks if an html node
 * is an input.
 *
 * @param targetNode
 * @returns {boolean}
 */
const isInputElement = (targetNode) => {
    return targetNode instanceof HTMLInputElement;
};

/**
 * Simple search widget
 *
 * @param settings
 */
export const simpleSearch = settings => new SimpleSearch(settings);