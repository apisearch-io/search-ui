import { h, render } from 'preact';
import PaginationComponent from "../components/Pagination/PaginationComponent";
import Widget from "./Widget";
import {Repository} from "apisearch";
import Store from "../Store";

/**
 * Pagination
 */
class Pagination extends Widget {

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
        this.component.attributes = {
            ...this.component.attributes,
            environmentId: environmentId,
            repository: repository,
            dirty: store.isDirty(),
            currentResult: store.getCurrentResult(),
            currentQuery: store.getCurrentQuery(),
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
 * Pagination widget
 *
 * @param settings
 */
export default settings => new Pagination(settings);