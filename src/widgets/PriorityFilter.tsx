import {Repository} from "apisearch";
import {h, render} from "preact";
import PriorityFilterComponent from "../components/PriorityFilter/PriorityFilterComponent";
import Store from "../Store";
import Widget from "./Widget";

/**
 * PriorityFilter
 */
class PriorityFilter extends Widget {
    /**
     *
     * @param target
     * @param filters
     * @param template
     */
    constructor({
        target,
        filters,
        template,
    }) {
        super();
        this.target = target;
        this.component = <PriorityFilterComponent
            target={target}
            filters={filters}
            template={{
                ...PriorityFilterComponent.defaultProps.template,
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
 * Multiple filter widget
 *
 * @param settings
 */
export default (settings) => new PriorityFilter(settings);
