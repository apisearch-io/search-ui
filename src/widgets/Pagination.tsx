import {Repository} from "apisearch";
import {h, render} from 'preact';
import PaginationComponent from "../components/Pagination/PaginationComponent";
import Store from "../Store";
import Widget from "./Widget";

/**
 * Pagination
 */
class Pagination extends Widget {

    /**
     * Constructor
     *
     * @param target
     * @param padding
     * @param goFirstLast
     * @param classNames
     * @param template
     */
    constructor({
        target,
        padding,
        goFirstLast,
        classNames,
        template
    }) {
        super();
        this.target = target;
        this.component = <PaginationComponent
            target={target}
            padding={padding}
            goFirstLast={goFirstLast}
            classNames={{
                ...PaginationComponent.defaultProps.classNames,
                ...classNames
            }}
            template={{
                ...PaginationComponent.defaultProps.template,
                ...template
            }}
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

    /**
     * @param query
     */
    public reset(query: any) {
        delete query.page;
    }
}

/**
 * Pagination widget
 *
 * @param settings
 */
export default (settings) => new Pagination(settings);
