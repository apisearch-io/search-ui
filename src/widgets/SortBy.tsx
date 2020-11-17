import { h, render } from 'preact';
import SortByComponent from "../components/SortBy/SortByComponent";
import {Repository} from "apisearch";
import Widget from "./Widget";
import Store from "../Store";

/**
 * SortBy
 */
class SortBy extends Widget {

    private targetNode: any;

    constructor({
        target,
        classNames,
        options
    }) {
        super();
        this.target = target;
        this.targetNode = document.querySelector(this.target);
        this.component = <SortByComponent
            target={target}
            classNames={{
                ...SortByComponent.defaultProps.classNames,
                ...classNames
            }}
            options={options}
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

        render(
            this.component,
            this.targetNode
        )
    }
}

/**
 * SortBy widget
 *
 * @param settings
 */
export default settings => new SortBy(settings);
