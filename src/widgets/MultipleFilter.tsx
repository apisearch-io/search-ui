import { h, render } from 'preact';
import MultipleFilterComponent from "../components/MultipleFilter/MultipleFilterComponent";
import Widget from "./Widget";
import {Repository} from "apisearch";
import Store from "../Store";

/**
 * Multiple Filter
 */
class MultipleFilter extends Widget {

    /**
     * Filtername
     *
     * @param target
     * @param filterName
     * @param filterField
     * @param aggregationField
     * @param applicationType
     * @param fetchLimit
     * @param viewLimit
     * @param sortBy
     * @param ranges
     * @param classNames
     * @param template
     * @param formatData
     */
    constructor({
        target,
        filterName,
        filterField,
        aggregationField,
        applicationType,
        fetchLimit,
        viewLimit,
        sortBy,
        ranges,
        classNames,
        template,
        formatData
    }) {
        super();
        this.target = target;
        this.component = <MultipleFilterComponent
            target={target}
            filterName={filterName}
            filterField={filterField}
            aggregationField={aggregationField}
            applicationType={applicationType}
            fetchLimit={fetchLimit}
            viewLimit={viewLimit}
            sortBy={sortBy}
            ranges={ranges}
            classNames={{
                ...MultipleFilterComponent.defaultProps.classNames,
                ...classNames
            }}
            template={{
                ...MultipleFilterComponent.defaultProps.template,
                ...template
            }}
            formatData={formatData}
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
 * Multiple filter widget
 *
 * @param settings
 */
export default settings => new MultipleFilter(settings);
