import { h, render } from 'preact';
import ResultComponent from "../components/Result/ResultComponent";
import Widget from "./Widget";
import {Repository} from "apisearch";
import Store from "../Store";

/**
 * Result
 */
class Result extends Widget {

    /**
     * Constructor
     *
     * @param target
     * @param fields
     * @param itemsPerPage
     * @param promote
     * @param exclude
     * @param filter
     * @param highlightsEnabled
     * @param classNames
     * @param template
     * @param formatData
     */
    constructor({
        target,
        fields,
        itemsPerPage,
        promote,
        exclude,
        filter,
        highlightsEnabled,
        classNames,
        template,
        formatData
    }) {
        super();
        this.target = target;
        this.component = <ResultComponent
            target={target}
            fields={fields}
            itemsPerPage={itemsPerPage}
            promote={promote}
            exclude={exclude}
            filter={filter}
            highlightsEnabled={highlightsEnabled}
            classNames={{
                ...ResultComponent.defaultProps.classNames,
                ...classNames
            }}
            template={{
                ...ResultComponent.defaultProps.template,
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
    ) {
        this.component.attributes = {
            ...this.component.attributes,
            environmentId: environmentId,
            repository: repository,
            dirty: store.isDirty(),
            currentResult: store.getCurrentResult(),
            currentQuery: store.getCurrentQuery(),
            currentVisibleResults: store.resultsAreVisible(),
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
 * Result widget
 *
 * @param settings
 */
export default settings => new Result(settings);
