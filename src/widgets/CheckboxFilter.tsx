import { h, render } from 'preact';
import CheckboxFilterComponent from "../components/CheckboxFilter/CheckboxFilterComponent";
import {Repository} from "apisearch";
import Widget from "./Widget";
import Store from "../Store";

/**
 * CheckboxFilter
 */
class CheckboxFilter extends Widget {

    constructor({
        target,
        filterName,
        filterField,
        label
    }) {
        super();
        this.target = target;
        this.component = <CheckboxFilterComponent
            target={target}
            filterName={filterName}
            filterField={filterField}
            label={label}
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
 * CheckboxFilter widget
 *
 * @param settings
 */
export default settings => new CheckboxFilter(settings);
