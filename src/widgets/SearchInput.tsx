import { h, render } from 'preact';
import SearchInputComponent from "../components/SearchInput/SearchInputComponent";
import Widget from "./Widget";
import {Repository} from "apisearch";
import Store from "../Store";

/**
 * SearchInput
 */
class SearchInput extends Widget{

    private isFirstRender:boolean;

    /**
     * Constructor
     *
     * @param target
     * @param placeholder
     * @param startSearchOn
     * @param clearSearch
     * @param withContainer
     * @param autofocus
     * @param classNames
     * @param template
     */
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
        super();
        this.target = target;
        this.isFirstRender = true;
        this.component = <SearchInputComponent
            target={target}
            placeholder={placeholder}
            autofocus={autofocus}
            startSearchOn={startSearchOn}
            clearSearch={clearSearch}
            withContainer={withContainer}
            classNames={{
                ...SearchInputComponent.defaultProps.classNames,
                ...classNames
            }}
            template={{
                ...SearchInputComponent.defaultProps.template,
                ...template
            }}
        />
    }

    /**
     * Widget
     *
     * @param environmentId
     * @param store
     * @param repository
     */
    render(
        environmentId:string,
        store:Store,
        repository:Repository
    ){
        this.component.attributes = {
            ...this.component.attributes,
            environmentId: environmentId,
            repository: repository,
            dirty: store.isDirty(),
            currentResult: store.getCurrentResult(),
            currentQuery: store.getCurrentQuery(),
            htmlNodeInheritProps: {
                autocomplete: 'off',
                spellcheck: false
            }
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
                htmlNodeInheritProps: {
                    ...this.component.attributes.htmlNodeInheritedProps,
                    ...getNodeAttributes(targetNode)
                }
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
 * Search Input widget
 *
 * @param settings
 */
export default settings => new SearchInput(settings);