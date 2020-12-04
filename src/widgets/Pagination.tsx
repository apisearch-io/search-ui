import { h, render } from 'preact';
import PaginationComponent from "../components/Pagination/PaginationComponent";
import Widget from "./Widget";
import {Repository} from "apisearch";
import Store from "../Store";

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
        this.component.props = {
            ...this.component.props,
            environmentId: environmentId,
            repository: repository,
            dirty: store.isDirty(),
            currentResult: store.getCurrentResult(),
            currentQuery: store.getCurrentQuery(),
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
        const page = query.page;
        if (page > 1) {
            object.page = page;
        }
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
        const page = object.page;
        if (
            page !== undefined &&
            page > 1
        ) {
            query.page = page;
        }
    }
}

/**
 * Pagination widget
 *
 * @param settings
 */
export default settings => new Pagination(settings);
