import { h, render } from 'preact';
import ClearFiltersComponent from "../components/ClearFilters/ClearFiltersComponent";
import Widget from "./Widget";
import {Repository} from "apisearch";
import Store from "../Store";

/**
 * Clear Filters
 */
class ClearFilters extends Widget {

    /**
     * Constructor
     *
     * @param target
     * @param classNames
     * @param template
     */
    constructor({
        target,
        classNames,
        template
    }) {
        super();
        this.target = target;
        this.component = <ClearFiltersComponent
            target={target}
            classNames={{
                ...ClearFiltersComponent.defaultProps.classNames,
                ...classNames
            }}
            template={template}
        />
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
            dictionary: dictionary,
        };

        let targetNode = document.querySelector(this.target);

        render(
            this.component,
            targetNode
        )
    }
}

/**
 * Clear filters widget
 *
 * @param settings
 */
export default settings => new ClearFilters(settings);
