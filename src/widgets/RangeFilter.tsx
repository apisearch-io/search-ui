import { h, render } from 'preact';
import RangeFilterComponent from "../components/RangeFilter/RangeFilterComponent";
import {Repository} from "apisearch";
import Widget from "./Widget";
import Store from "../Store";

/**
 * RangeFilter
 */
class RangeFilter extends Widget {

    constructor({
        target,
        filterName,
        filterField,
        minValue,
        maxValue,
        from,
        to
    }) {
        super();
        this.target = target;
        this.component = <RangeFilterComponent
            target={target}
            filterName={filterName}
            filterField={filterField}
            minValue={minValue}
            maxValue={maxValue}
            from={{
                ...RangeFilterComponent.defaultProps.from,
                ...from
            }}
            to={{
                ...RangeFilterComponent.defaultProps.to,
                ...to
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
}

/**
 * CheckboxFilter widget
 *
 * @param settings
 */
export default settings => new RangeFilter(settings);
