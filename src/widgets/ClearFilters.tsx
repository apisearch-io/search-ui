import {Repository} from "apisearch";
import {h, render} from "preact";
import ClearFiltersComponent from "../components/ClearFilters/ClearFiltersComponent";
import Store from "../Store";
import Widget from "./Widget";

/**
 * Clear Filters
 */
class ClearFilters extends Widget {

    /**
     * @param target
     * @param classNames
     * @param template
     * @param showIndividualFilterClear
     * @param showGlobalFilterClear
     * @param showIndividualFilterValueClear
     */
    constructor({
        target,
        classNames,
        template,
        showIndividualFilterClear,
        showGlobalFilterClear,
        showIndividualFilterValueClear,
    }) {
        super();
        this.target = target;
        this.component = <ClearFiltersComponent
            target={target}
            classNames={{
                ...ClearFiltersComponent.defaultProps.classNames,
                ...classNames,
            }}
            showIndividualFilterClear={showIndividualFilterClear}
            showGlobalFilterClear={showGlobalFilterClear}
            showIndividualFilterValueClear={showIndividualFilterValueClear}
            template={{
                ...ClearFiltersComponent.defaultProps.template,
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
        dictionary: { [key: string]: string; },
    ) {
        this.component.props = {
            ...this.component.props,
            dictionary,
            environmentId,
            repository,
            store,
        };

        render(
            this.component,
            document.querySelector(this.target),
        );
    }
}

/**
 * Clear filters widget
 *
 * @param settings
 */
export default (settings) => new ClearFilters(settings);
