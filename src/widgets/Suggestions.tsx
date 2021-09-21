import {Repository} from "apisearch";
import {h, render} from 'preact';
import SuggestionsFilterComponent from "../components/Suggestions/SuggestionsFilterComponent";
import Store from "../Store";
import Widget from "./Widget";

/**
 * SuggestionsFilter
 */
class SuggestionsFilter extends Widget {

    constructor({
        target,
        numberOfSuggestions,
        classNames,
        template,
    }) {
        super();
        this.target = target;
        this.component = <SuggestionsFilterComponent
            target={target}
            numberOfSuggestions={numberOfSuggestions}
            classNames={{
                ...SuggestionsFilterComponent.defaultProps.classNames,
                ...classNames,
            }}
            template={{
                ...SuggestionsFilterComponent.defaultProps.template,
                ...template,
            }}
        />;
    }

    /**
     * @param environmentId
     * @param store
     * @param repository
     * @param dictionary
     */
    public render(
        environmentId: string,
        store: Store,
        repository: Repository,
        dictionary: { [key: string]: string; }
    ) {
        this.component.props = {
            ...this.component.props,
            environmentId: environmentId,
            repository: repository,
            store: store,
            dictionary: dictionary
        };

        let targetNode = document.querySelector(this.target);

        render(
            this.component,
            targetNode
        )
    }

    /**
     * @param query
     * @param object
     */
    public toUrlObject(
        query: any,
        object: any
    )
    {

    }

    /**
     * @param object
     * @param query
     */
    public fromUrlObject(
        object: any,
        query: any
    )
    {

    }
}

/**
 * CheckboxFilter widget
 *
 * @param settings
 */
export default (settings) => new SuggestionsFilter(settings);
