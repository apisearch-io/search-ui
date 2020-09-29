import { h, render } from 'preact';
import SortByComponent from "../components/SortBy/SortByComponent";
import {Repository} from "apisearch";
import Widget from "./Widget";
import Store from "../Store";

/**
 * SortBy
 */
class SortBy extends Widget {

    constructor({
        target,
        classNames,
        options
    }) {
        super();
        this.target = target;
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

        let targetNode = document.querySelector(this.target);

        render(
            this.component,
            targetNode
        )
    }
}

/**
 * SortBy widget
 *
 * @param settings
 */
export default settings => new SortBy(settings);
